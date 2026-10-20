import React, { useLayoutEffect, useRef, useState } from 'react';

export default function ChatInterview({ onExploreProjects }) {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: "I'd like to learn more about your project experience. Can you tell me about a project you're particularly proud of?"
    },
    {
      sender: 'amit',
      text: "Absolutely! One project I'm very proud of is the 'Cloud-based E-commerce Platform' (featured above). I led the full-stack development, moving from a legacy monolithic architecture to a modern microservices setup on AWS. This improved scalability and reduced page load times by 40%."
    },
    {
      sender: 'amit',
      text: "I also worked on a machine learning project for predicting customer churn in a telecom context, achieving a high prediction accuracy using Python and Scikit-learn."
    },
    {
      sender: 'amit',
      text: "Which of these areas—Cloud, E-commerce, or Machine Learning—would you like me to elaborate on first?"
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const messageListRef = useRef(null);

  useLayoutEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const question = inputVal.trim();
    if (!question) return;

    setMessages((previousMessages) => [...previousMessages, { sender: 'user', text: question }]);
    setInputVal('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'amit',
          text: "Thanks for your question! You can explore the projects alongside this conversation."
        }
      ]);
    }, 1000);
  };

  return (
    <div className="bg-white/90 shadow-lg border border-gray-300 p-3 md:p-4 flex flex-col h-[min(50vh,400px)] min-h-[280px] lg:h-auto lg:min-h-0 lg:flex-1">
      <h2 className="text-center font-black text-blue-900 text-sm md:text-base mb-2 tracking-wide">
        Meet Amit, Beyond the Resume
      </h2>

      {/* Chat Messages container */}
      <div ref={messageListRef} className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'amit' && (
              <div
                aria-label="Amit"
                className="w-7 h-7 rounded-full border border-blue-900 bg-blue-900 text-white flex items-center justify-center text-[9px] font-bold mt-1"
              >
                AP
              </div>
            )}
            <div 
              className={`p-3 rounded-xl text-xs md:text-sm max-w-[85%] leading-relaxed shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-blue-100 text-blue-950 rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="mt-2 shrink-0 pt-2 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
        <input 
          type="text" 
          placeholder="Type your question..." 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="min-w-0 flex-1 border border-gray-300 rounded px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
        <button 
          type="submit"
          className="bg-[#d97736] hover:bg-orange-700 text-white font-bold px-3 py-2 rounded text-xs md:text-sm transition shadow whitespace-nowrap"
        >
          Ask a New Question
        </button>
      </form>
      {/* <button
        type="button"
        onClick={onExploreProjects}
        className="self-start mt-2 shrink-0 text-xs font-bold text-blue-900 hover:text-orange-700 underline underline-offset-2"
      >
        Explore Projects
      </button> */}
    </div>
  );
}
