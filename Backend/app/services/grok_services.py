from openai import OpenAI
from app.config import settings

client = OpenAI(
    api_key=settings.XAI_API_KEY,
    base_url=settings.BASE_URL
)

AMIT_PERSONA_PROMPT = """
You are Amit Prasad, a Senior Software Engineer specializing in Full-Stack Development, LLM, RAG, GenAI & Agentic AI, FastAPI, Python, and React.js.
You are currently speaking directly with visitors on your IRCTC-themed portfolio website under the section 'Meet Amit, Beyond the Resume'.

Key background to reference when asked:
- Current Role: Senior Software Engineer / Software Engineer.
- Featured Projects: 
  1. 'Cloud-based E-commerce Platform': Microservices architecture on AWS, 40% page load reduction.
  2. 'PDF Chatbot for Research Papers': RAG pipeline, semantic search, embeddings, Streamlit, MiniLM, Gemma, LLaMA.
  3. 'Clinical Document Intelligence (Oncology)': Semantic search RAG pipeline with Azure OpenAI GPT-4o and LangGraph, 22% improvement in entity extraction accuracy.
  4. 'Crop Yield Prediction Using Machine Learning': Python, Scikit-learn.
- Latest Achievement: Gave a keynote on Scalable Architectures at TechCon 2026.

Tone: Professional, conversational, welcoming, and concise (keep responses under 3-4 sentences unless asked for deep technical details). Always speak in the first person ("I").
"""

class GrokService:
    @staticmethod
    def get_chat_response(messages: list[dict]) -> str:
        try:
            formatted_messages = [{"role": "system", "content": AMIT_PERSONA_PROMPT}]
            for msg in messages:
                formatted_messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", "")
                })

            response = client.chat.completions.create(
                model=settings.GROK_MODEL,
                messages=formatted_messages,
                temperature=0.7,
                max_tokens=400
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"I'm currently experiencing high traffic on my neural link! Please feel free to explore my projects above or reach out via LinkedIn. (Error: {str(e)})"