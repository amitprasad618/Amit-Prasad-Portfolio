# Portfolio API (Backend)

## Setup

Use Python 3.12 or 3.13. From this directory, create and activate a virtual environment, then install the dependencies:

```bash
python3 -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirments.txt
```

Create a `.env` file in this directory with your xAI API key:

```dotenv
XAI_API_KEY=your-xai-api-key
GROK_MODEL=grok-4-1-fast-non-reasoning
```

Keep `.env` private and do not commit it.

## Run

Start the development API server from this directory:

```bash
uvicorn app.main:app --reload
```

The API root is `/` and the chat endpoint is `POST /api/chat`.
