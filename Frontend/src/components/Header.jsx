import React, { useState, useEffect } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).replace(/ /g, '-');
      const timeStr = now.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'Asia/Kolkata' });
      setCurrentTime(`${dateStr} [${timeStr}]`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shrink-0 bg-[#1b365d] text-white text-[11px] py-1 px-3 flex justify-center items-center border-b border-blue-900 min-h-8">
      <div aria-label="Portfolio status" className="flex flex-wrap items-center justify-center gap-x-2 text-center">
        <span className="font-bold whitespace-nowrap">A. Prasad</span>
        <span aria-hidden="true">|</span>
        <span className="whitespace-nowrap">Portfolio Dashboard</span>
        <span aria-hidden="true">|</span>
        <time className="whitespace-nowrap">{currentTime}</time>
      </div>
    </div>
  );
}
