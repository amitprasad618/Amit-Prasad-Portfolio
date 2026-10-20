import React from 'react';

export default function HeroBanner() {
  return (
    <div id="profile" className="shrink-0 bg-gradient-to-r from-blue-50/60 via-slate-100/45 to-indigo-50/60 border-b border-gray-300/80 py-2 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        <div className="flex min-w-0 items-center space-x-4">
          <img
            src="/profile_pic.png"
            alt="Amit Prasad"
            className="h-20 w-20 shrink-0 rounded-full border-2 border-[#1b365d] object-cover shadow md:h-[5.5rem] md:w-[5.5rem]"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-black leading-tight text-[#1b365d] tracking-tight">
              AMIT PRASAD - SOFTWARE ENGINEER
            </h1>
            <p className="text-xs md:text-sm text-gray-700 font-medium">
              Full-Stack Development | Cloud Computing | UI/UX | Project Management
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-xs text-gray-600 hidden xl:block">
            Discover my journey, view my key projects and contact me for opportunities.
          </div>
          <a href="#projects" className="bg-[#d97736] hover:bg-orange-700 text-white text-xs md:text-sm font-bold px-4 py-2 rounded shadow transition whitespace-nowrap">
            Explore Portfolio
          </a>
        </div>

      </div>
    </div>
  );
}
