import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    XAI_API_KEY: str = os.getenv("XAI_API_KEY", "")
    GROK_MODEL: str = os.getenv("GROK_MODEL", "grok-4-1-fast-non-reasoning")
    BASE_URL: str = "https://api.x.ai/v1"

settings = Settings()