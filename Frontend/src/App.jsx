import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import SubTabs from './components/SubTabs';
import ChatInterview from './components/ChatInterview';
import RightSidebar from './components/RightSidebar';
import PortfolioLinks from './components/PortfolioLinks';

export default function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [activeSubTab, setActiveSubTab] = useState('work');

  return (
    <div className="app-shell train-bg flex flex-col">
      <Header />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <HeroBanner />

      {/* Main Content Grid */}
      <main className="dashboard-content max-w-[1400px] mx-auto w-full flex-1 min-h-0 px-4 py-2 md:px-6">
        <div className="dashboard-grid grid grid-cols-1 gap-4 lg:h-full lg:min-h-0 lg:grid-cols-12 lg:gap-5">
            
            {/* Left Column: Subtabs + Conversational Chat */}
            <div id="experience" className="flex flex-col shadow-xl rounded-lg overflow-hidden lg:col-span-7 lg:h-full lg:min-h-0">
              <SubTabs activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />
              <ChatInterview onExploreProjects={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />
              <PortfolioLinks />
            </div>

            {/* Right Column: Widgets */}
            <div id="projects" className="lg:col-span-5 lg:h-full lg:min-h-0 lg:overflow-y-auto">
              <RightSidebar />
            </div>

        </div>
      </main>

    </div>
  );
}
