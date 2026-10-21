import React, { useLayoutEffect, useRef, useState } from 'react';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;

export default function ChatInterview() {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const messageListRef = useRef(null);

  useLayoutEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, error]);

  const handleSend = async (event) => {
    event.preventDefault();
    const question = inputVal.trim();
    if (!question || isSending) return;

    const conversation = [...messages, { sender: 'user', text: question }];
    const apiMessages = conversation.map((message) => ({
      role: message.sender === 'amit' ? 'assistant' : 'user',
      content: message.text,
    }));

    setMessages(conversation);
    setInputVal('');
    setIsSending(true);
    setError('');

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const payload = await response.json().catch(() => null);
      const data = payload && typeof payload === 'object' ? payload : {};
      if (!response.ok) {
        throw new Error(data.detail || `Chat request failed (${response.status}).`);
      }
      if (typeof data.response !== 'string' || !data.response.trim()) {
        throw new Error('The chat service returned an empty response.');
      }

      setMessages([...conversation, { sender: 'amit', text: data.response }]);
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'Could not connect to the backend. Make sure FastAPI is running and try again.'
          : requestError.message || 'The chat request failed. Please try again.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white/90 shadow-lg border border-gray-300 p-3 md:p-4 flex flex-col h-[min(50vh,400px)] min-h-[280px] lg:h-auto lg:min-h-0 lg:flex-1">
      <h2 className="text-center font-black text-blue-900 text-sm md:text-base mb-2 tracking-wide">
        Meet Amit, Beyond the Resume
      </h2>

      <div
        ref={messageListRef}
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin"
      >
        {messages.map((message, index) => (
          <div
            key={`${message.sender}-${index}`}
            className={`flex items-start gap-2.5 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'amit' && (
              <div
                aria-hidden="true"
                className="w-7 h-7 rounded-full border border-blue-900 bg-blue-900 text-white flex items-center justify-center text-[9px] font-bold mt-1"
              >
                AP
              </div>
            )}
            <div
              className={`p-3 rounded-xl text-xs md:text-sm max-w-[85%] leading-relaxed shadow-sm ${
                message.sender === 'user'
                  ? 'bg-blue-100 text-blue-950 rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isSending && (
          <p role="status" className="text-xs text-gray-500">Amit is typing…</p>
        )}
        {error && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-800">
            {error}
          </p>
        )}
      </div>

      <form onSubmit={handleSend} className="mt-2 shrink-0 pt-2 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor="chat-question">Your question</label>
        <input
          id="chat-question"
          type="text"
          placeholder="Type your question..."
          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
          disabled={isSending}
          className="min-w-0 flex-1 border border-gray-300 rounded px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={isSending || !inputVal.trim()}
          className="bg-[#d97736] hover:bg-orange-700 text-white font-bold px-3 py-2 rounded text-xs md:text-sm transition shadow whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? 'Sending…' : 'Ask a New Question'}
        </button>
      </form>
    </div>
  );
}
