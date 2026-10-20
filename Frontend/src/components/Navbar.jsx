import React from 'react';
import { User, Briefcase, FolderGit2, Award, BookOpen, Mail } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'ABOUT ME', icon: User },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'projects', label: 'PROJECTS', icon: FolderGit2 },
    { id: 'skills', label: 'SKILLS', icon: Award },
    { id: 'blog', label: 'BLOG', icon: BookOpen },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ];

  return (
    <header className="shrink-0 bg-white/95 shadow-md border-b border-gray-200/80">
      <div className="max-w-[1400px] mx-auto px-4 flex flex-wrap justify-between items-center py-2 md:px-6">
        
        {/* Left Logo */}
        <div className="flex items-center space-x-3">
          <div className="border-2 border-[#1b365d] rounded-full p-1 text-center w-12 h-12 flex flex-col justify-center items-center shadow-inner">
            <span className="text-lg font-black text-[#1b365d] leading-none">AP</span>
            <span className="text-[9px] font-bold text-gray-600">AMIT PRASAD</span>
          </div>
        </div>

        {/* Center Main Nav */}
        <nav aria-label="Portfolio sections" className="order-3 flex w-full items-center gap-1 overflow-x-auto pt-2 lg:order-none lg:w-auto lg:pt-0 [scrollbar-width:none]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-pressed={isActive}
                className={`px-4 py-2 font-bold text-sm tracking-wide transition ${
                  isActive 
                    ? 'bg-[#1b365d] text-white shadow' 
                    : 'text-gray-800 hover:bg-blue-50 hover:text-[#1b365d]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right IRCTC Branding Badge */}
        <div className="flex items-center space-x-2 border-l pl-4 border-gray-300">
          <div className="flex flex-col items-center">
            <img
              src="/irctc_logo.jpg"
              alt="IRCTC"
              className="h-10 max-w-28 object-contain"
            />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Portfolio</span>
          </div>
        </div>
      </div>
    </header>
  );
}
