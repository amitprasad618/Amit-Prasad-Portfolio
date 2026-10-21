import logging
import math
import re
import threading
import time
from collections import Counter
from pathlib import Path

import requests
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings import JinaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from app.config import settings

logger = logging.getLogger(__name__)

RESUME_PATH = Path(__file__).resolve().parents[2] / "data" / "my_resume.txt"


class _TimeoutSession(requests.Session):
    def request(self, method, url, **kwargs):
        kwargs.setdefault("timeout", (5, 20))
        return super().request(method, url, **kwargs)


class ResumeRetriever:
    """Retrieve resume excerpts using Jina/FAISS with a local lexical fallback."""

    def __init__(self, resume_path: Path = RESUME_PATH):
        self.resume_path = resume_path
        self._lock = threading.Lock()
        self._chunks = None
        self._vector_store = None
        self._embedding_retry_after = 0.0

    def retrieve(self, query: str, limit: int = 3) -> list[str]:
        chunks = self._load_chunks()
        if not chunks:
            return []

        if settings.JINA_API_KEY and time.monotonic() >= self._embedding_retry_after:
            try:
                with self._lock:
                    if self._vector_store is None:
                        self._vector_store = self._create_vector_store(chunks)
                    vector_store = self._vector_store
                matches = vector_store.similarity_search(query, k=limit)
                return [doc.page_content for doc in matches]
            except Exception as error:
                # Jina is an optional enhancement; do not make the portfolio chat fail
                # when the embedding service is unreachable or its key is unavailable.
                self._embedding_retry_after = time.monotonic() + 30
                logger.warning(
                    "Resume semantic search unavailable (%s); using local search",
                    type(error).__name__,
                )

        return self._lexical_search(query, chunks, limit)

    def _load_chunks(self) -> list[str]:
        if self._chunks is not None:
            return self._chunks

        with self._lock:
            if self._chunks is None:
                if not self.resume_path.is_file():
                    logger.warning("Resume source file is missing: %s", self.resume_path)
                    self._chunks = []
                else:
                    documents = TextLoader(str(self.resume_path), encoding="utf-8").load()
                    splitter = RecursiveCharacterTextSplitter(
                        chunk_size=1000,
                        chunk_overlap=200,
                    )
                    self._chunks = [
                        doc.page_content for doc in splitter.split_documents(documents)
                    ]
        return self._chunks

    @staticmethod
    def _create_vector_store(chunks: list[str]) -> FAISS:
        retry_policy = Retry(
            total=2,
            connect=2,
            read=2,
            status=2,
            backoff_factor=0.5,
            status_forcelist=(429, 500, 502, 503, 504),
            allowed_methods=frozenset({"POST"}),
        )
        session = _TimeoutSession()
        session.mount("https://", HTTPAdapter(max_retries=retry_policy))
        embeddings = JinaEmbeddings(
            model_name="jina-embeddings-v2-base-en",
            jina_api_key=settings.JINA_API_KEY,
            session=session,
        )
        return FAISS.from_texts(chunks, embeddings)

    @staticmethod
    def _lexical_search(query: str, chunks: list[str], limit: int) -> list[str]:
        terms = Counter(re.findall(r"[a-z0-9+#.]+", query.lower()))
        if not terms:
            return []

        tokenized = [re.findall(r"[a-z0-9+#.]+", chunk.lower()) for chunk in chunks]
        document_frequency = Counter(
            term for tokens in tokenized for term in set(tokens) if term in terms
        )
        average_length = max(sum(map(len, tokenized)) / len(tokenized), 1)
        total_chunks = len(tokenized)
        scored = []

        for index, tokens in enumerate(tokenized):
            frequencies = Counter(tokens)
            score = 0.0
            for term, query_frequency in terms.items():
                frequency = frequencies[term]
                if not frequency:
                    continue
                inverse_frequency = math.log(
                    1 + (total_chunks - document_frequency[term] + 0.5)
                    / (document_frequency[term] + 0.5)
                )
                length_norm = 1 - 0.75 + 0.75 * len(tokens) / average_length
                score += (
                    query_frequency
                    * inverse_frequency
                    * frequency
                    * 2.2
                    / (frequency + 1.2 * length_norm)
                )
            if score:
                scored.append((score, index))

        scored.sort(reverse=True)
        return [chunks[index] for _, index in scored[:limit]]


resume_retriever = ResumeRetriever()


def retrieve_resume_context(query: str) -> str:
    excerpts = resume_retriever.retrieve(query)
    return "\n\n---\n\n".join(excerpts)
