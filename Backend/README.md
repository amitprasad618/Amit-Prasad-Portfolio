# Portfolio API (Backend)

## Setup

Use Python 3.12 or 3.13. From this directory, create and activate a virtual environment, then install the dependencies:

```bash
python3 -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirments.txt
```

Create a `.env` file in this directory with the key for your chat provider.
With a Groq key (`gsk_...`), the backend auto-selects Groq. To use xAI, set
`CHAT_PROVIDER=xai` and provide an xAI API key.

```dotenv
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=openai/gpt-oss-120b
# Or use xAI instead:
# CHAT_PROVIDER=xai
# XAI_API_KEY=your-xai-api-key
# GROK_MODEL=grok-4.7
# Optional: enables semantic resume retrieval; local keyword retrieval works without it.
JINA_API_KEY=your-jina-api-key
```

Keep `.env` private and do not commit it.

## Run

Start the development API server from this directory:

```bash
uvicorn app.main:app --reload
```

The API root is `/` and the chat endpoint is `POST /api/chat`.
