from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat

app = FastAPI(
    title="Amit Prasad Portfolio API",
    version="1.0.0",
    description="FastAPI backend integrating Groq or xAI for conversational portfolio interactions."
)

# Configure CORS so your React frontend (running on localhost:5173 or deployed domain) can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update to specific frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(chat.router)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Welcome to Amit Prasad's Portfolio API powered by FastAPI and AI chat."}
