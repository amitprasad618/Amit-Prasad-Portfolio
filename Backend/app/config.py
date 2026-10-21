import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    XAI_API_KEY: str = os.getenv("XAI_API_KEY", "")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    JINA_API_KEY: str = os.getenv("JINA_API_KEY", "")
    CHAT_PROVIDER: str = os.getenv("CHAT_PROVIDER", "auto").strip().lower()
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
    GROK_MODEL: str = os.getenv("GROK_MODEL", "grok-4.7")
    BASE_URL: str = "https://api.x.ai/v1"

settings = Settings()
