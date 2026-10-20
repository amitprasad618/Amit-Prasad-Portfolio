import React from 'react';
import { CodeXml, ExternalLink, FileText } from 'lucide-react';

const linkStyle = 'flex min-w-0 items-center justify-center gap-2 rounded-md bg-[#10264b]/75 px-2 py-2 text-center text-xs font-semibold text-white shadow-md transition hover:bg-[#10264b]/90 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 lg:whitespace-nowrap';

export default function PortfolioLinks() {
  return (
    <nav aria-label="Profile links" className="grid w-full grid-cols-1 gap-2 px-2 py-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
      <a href="#cv" className={linkStyle}>
        <FileText aria-hidden="true" className="h-4 w-4 text-orange-300" />
        Print Ticket (Resume PDF)
      </a>
      <a href="https://github.com/amitprasad618" target="_blank" rel="noopener noreferrer" className={linkStyle}>
        <CodeXml aria-hidden="true" className="h-4 w-4 text-orange-300" />
        Visit My GitHub
      </a>
      <a href="https://www.linkedin.com/in/amitprasad618/" target="_blank" rel="noopener noreferrer" className={linkStyle}>
        <ExternalLink aria-hidden="true" className="h-4 w-4 text-orange-300" />
        Follow on LinkedIn
      </a>
    </nav>
  );
}
