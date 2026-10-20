from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.grok_services import GrokService

router = APIRouter(prefix="/api", tags=["Chat"])

class Message(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str

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
    
    reply = GrokService.get_chat_response(msg_list)
    return ChatResponse(response=reply)
