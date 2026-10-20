import React from 'react';

export default function RightSidebar() {
  return (
    <div className="space-y-4">
      {/* Featured Project */}
      <div className="bg-white/90 rounded-lg shadow-lg border border-gray-300 overflow-hidden">
        <div className="bg-[#1b365d] text-white py-2 px-4 font-black text-xs md:text-sm tracking-wider flex items-center justify-between">
          <span>PROJECTS</span>
        </div>
        <div className="p-3 md:p-4">
          <div className="bg-gray-100 rounded border border-gray-200 p-2 mb-3">
            <div className="h-28 bg-gradient-to-r from-blue-900 to-indigo-800 rounded flex items-center justify-center text-white text-xs font-semibold p-2 text-center">
              Cloud-based E-commerce Platform Architecture
            </div>
          </div>
          <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
            Cloud-based E-commerce Platform
          </h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Full-stack commerce platform migrated to AWS microservices, with a reported 40% improvement in page load time.
          </p>
        </div>
      </div>
    </div>
  );
}
