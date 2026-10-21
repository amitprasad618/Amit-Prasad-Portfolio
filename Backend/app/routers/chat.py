import logging
from fastapi import APIRouter, HTTPException
from openai import APIConnectionError, APIStatusError, AuthenticationError, RateLimitError
from pydantic import BaseModel, Field
from starlette.concurrency import run_in_threadpool
from typing import List, Literal
from app.services.grok_services import ChatServiceConfigurationError, GrokService

router = APIRouter(prefix="/api", tags=["Chat"])
logger = logging.getLogger(__name__)

class Message(BaseModel):
    role: Literal['user', 'assistant']
    content: str = Field(min_length=1, max_length=8000)

class ChatRequest(BaseModel):
    messages: List[Message]

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat_with_amit(payload: ChatRequest):
    if not payload.messages:
        raise HTTPException(status_code=400, detail="Message history cannot be empty.")
    
    # Convert Pydantic models to dicts for the service
    msg_list = [{"role": m.role, "content": m.content} for m in payload.messages]
    
    try:
        reply = await run_in_threadpool(GrokService.get_chat_response, msg_list)
    except ChatServiceConfigurationError as error:
        raise HTTPException(
            status_code=503,
            detail="The chat service is not configured.",
        ) from error
    except AuthenticationError as error:
        provider = GrokService._provider_config()[0]
        raise HTTPException(
            status_code=502,
            detail=f"{provider} rejected the configured API key. Check the backend provider key.",
        ) from error
    except RateLimitError as error:
        raise HTTPException(
            status_code=503,
            detail="The chat provider account rate limit or usage quota has been reached.",
        ) from error
    except APIConnectionError as error:
        provider = GrokService._provider_config()[0]
        raise HTTPException(
            status_code=503,
            detail=f"The backend could not connect to {provider}. Check the backend network.",
        ) from error
    except APIStatusError as error:
        provider = GrokService._provider_config()[0]
        logger.warning(
            "%s rejected the chat request (HTTP %s, code=%s): %s",
            provider,
            error.status_code,
            error.code,
            error.message,
        )
        raise HTTPException(
            status_code=502,
            detail=(
                f"{provider} rejected the chat request (HTTP {error.status_code}). "
                "Check the backend provider key and model settings."
            ),
        ) from error
    except Exception as error:
        logger.exception("Chat provider request failed")
        raise HTTPException(
            status_code=502,
            detail="The chat service is temporarily unavailable. Please try again.",
        ) from error

    return ChatResponse(response=reply)
