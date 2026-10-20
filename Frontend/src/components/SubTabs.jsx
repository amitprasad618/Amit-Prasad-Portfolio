import React from 'react';
import { CheckSquare, BookOpen, Award, MessageCircle } from 'lucide-react';

export default function SubTabs({ activeSubTab, setActiveSubTab }) {
  const tabs = [
    { id: 'work', label: 'WORK HISTORY', icon: CheckSquare },
    { id: 'publications', label: 'PUBLICATIONS', icon: BookOpen },
    { id: 'awards', label: 'AWARDS', icon: Award },
    { id: 'testimonials', label: 'TESTIMONIALS', icon: MessageCircle },
  ];

  return (
    <div role="tablist" aria-label="Portfolio details" className="grid grid-cols-2 gap-1 bg-[#1b365d] p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeSubTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`flex items-center justify-center space-x-2 py-2.5 px-3 text-xs font-bold tracking-wider transition ${
              isActive 
                ? 'bg-blue-900 text-white border-b-2 border-orange-500 shadow-inner' 
                : 'text-gray-300 hover:bg-blue-800/60 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
