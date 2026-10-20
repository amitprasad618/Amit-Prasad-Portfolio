import React from 'react';
import { Bot, FileSearch, FileText, Sprout } from 'lucide-react';

const projects = [
  {
    title: 'PDF Chatbot for Research Papers',
    description:
      'An interactive document Q&A application that lets users upload research papers and ask questions in natural language. Uses a RAG pipeline, semantic search, embeddings, and LLMs to generate context-aware responses.',
    technologies: ['Streamlit', 'RAG', 'MiniLM', 'GritLM', 'Gemma', 'LLaMA'],
    icon: FileText,
    category: 'GENERATIVE AI · DOCUMENT SEARCH',
    artwork: 'from-violet-950 via-blue-900 to-indigo-700',
    featured: true,
  },
  {
    title: 'Clinical Document Intelligence (Oncology)',
    companyLabel: 'HCLTech | Enterprise Client Project',
    category: 'Enterprise AI | Healthcare | RAG Pipeline',
    description:
      'Built a semantic-search RAG pipeline for oncology clinical documents, enabling intelligent retrieval and structured patient data extraction with Azure OpenAI GPT-4o and LangGraph.',
    highlight: '22% improvement in entity extraction accuracy',
    technologies: ['LangGraph', 'Azure OpenAI', 'GPT-4o', 'RAG', 'FastAPI', 'Docker'],
    icon: FileSearch,
    artwork: 'from-violet-950 via-blue-900 to-indigo-700',
  },
  {
    title: 'Crop Yield Prediction Using Machine Learning',
    description:
      'A machine learning project that predicts crop yield using six input variables. Evaluates MLP, KNN, and Random Forest algorithms to compare prediction accuracy.',
    technologies: ['Python', 'Machine Learning', 'MLP', 'KNN', 'Random Forest'],
    icon: Sprout,
    category: 'MACHINE LEARNING',
    artwork: 'from-emerald-950 via-teal-800 to-cyan-700',
  },
  {
    title: 'Enterprise AI Assistant',
    description:
      'A full-stack AI-powered employee support assistant built using FastAPI and React.js, with open-source LLM integration, session-aware conversations, secure authentication, and optimized query handling.',
    technologies: ['FastAPI', 'React.js', 'LLaMA-2', 'Mistral', 'REST APIs', 'JWT'],
    icon: Bot,
    category: 'HCLTECH · PROFESSIONAL PROJECT',
    artwork: 'from-sky-950 via-blue-900 to-indigo-700',
  },
];

function ProjectCard({ project }) {
  const Icon = project.icon;

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
      <div
        className={`relative flex min-h-[52px] items-center gap-3 overflow-hidden bg-gradient-to-r ${project.artwork} px-3 py-2.5 text-white ${project.featured ? 'min-h-[72px] px-4' : ''}`}
      >
        <div aria-hidden="true" className="absolute -right-4 -top-8 h-24 w-24 rounded-full border border-white/15" />
        <div aria-hidden="true" className="absolute -right-1 -top-5 h-16 w-16 rounded-full border border-white/10" />
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm">
          <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </span>
        <div className="relative min-w-0">
          <p className="text-[9px] font-bold tracking-[0.08em] text-blue-100/90">{project.companyLabel || project.category}</p>
          <h3 className="mt-0.5 text-xs font-bold leading-snug text-white md:text-[13px]">{project.title}</h3>
        </div>
      </div>

      <div className="p-3">
        <p className="text-[11px] leading-relaxed text-slate-600">{project.description}</p>
        {project.highlight && (
          <p className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold leading-snug text-emerald-900">
            {project.highlight}
          </p>
        )}
        {project.companyLabel && (
          <p className="mt-2 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
            {project.category}
          </p>
        )}
        <ul aria-label={`${project.title} technologies`} className="mt-2 flex list-none flex-wrap gap-1.5 p-0">
          {project.technologies.map((technology) => (
            <li key={technology} className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-semibold leading-4 text-blue-900">
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function RightSidebar() {
  return (
    <section aria-labelledby="projects-heading" className="overflow-hidden rounded-lg border border-slate-300 bg-white/95 shadow-xl">
      <header className="flex items-center justify-between gap-3 bg-[#1b365d] px-4 py-2.5 text-white">
        <div>
          <h2 id="projects-heading" className="text-xs font-black tracking-[0.16em] md:text-sm">PROJECTS</h2>
          <p className="mt-0.5 text-[10px] text-blue-100">Selected work and experiments</p>
        </div>
        <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-blue-50">
          {projects.length} projects
        </span>
      </header>

      <div className="space-y-2.5 p-2.5 md:p-3">
        {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
      </div>
    </section>
  );
}
