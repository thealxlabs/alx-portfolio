import React, { useState, useEffect } from 'react';
import { 
  Camera, Code, Terminal, Layers, ArrowRight, 
  ExternalLink, Loader2, X, Activity, Globe, GitCommit, Clock, Cpu, BarChart3
} from 'lucide-react';

/* --- CYPHER EFFECT --- */
const CypherText = ({ text, className }) => {
  const [output, setOutput] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  useEffect(() => {
    if (!isHovered) { setOutput(text); return; }
    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered, text]);
  
  return <span onMouseEnter={() => setIsHovered(true)} className={className}>{output}</span>;
};

export default function App() {
  const [page, setPage] = useState('home');
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      });

    fetch('https://api.github.com/users/alxgraphy/events/public')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const processedEvents = data
            .filter(e => ['PushEvent', 'PullRequestEvent'].includes(e.type))
            .map(event => {
              const type = event.type.replace('Event', '').toUpperCase();
              const repo = event.repo.name.split('/')[1];
              const msg = event.payload.commits ? event.payload.commits[0].message : 'SYSTEM_UPDATE';
              return `${type}: [${repo}] - ${msg}`;
            }).slice(0, 8);
          setEvents(processedEvents);
        }
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const Corners = () => (
    <>
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white" />
    </>
  );

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden cursor-none">
      
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; animation: marquee 30s linear infinite; }
      `}</style>

      {/* CURSOR */}
      <div className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
        <div className="w-1 h-1 bg-white animate-pulse" />
      </div>

      {/* TOP GITHUB ACTIVITY BAR */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-9 z-[60] bg-black border-x border-b border-white overflow-hidden hidden sm:block">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center h-full text-white px-4">
          {(events.length > 0 ? [...events, ...events] : ["CONNECTING_TO_ALX_NODE..."]).map((log, i) => (
            <span key={i} className="text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1 h-1 bg-green-500 animate-pulse" />
              {log}
            </span>
          ))}
        </div>
      </div>

      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b border-white">
        <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>{item}</button>
          ))}
        </nav>
      </header>

      {/* PROJECT MODAL (INSIGHT PANEL) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 transition-all duration-500">
          <div className="relative w-full max-w-2xl border-2 border-white bg-black p-8 md:p-12 animate-in zoom-in duration-300">
            <Corners />
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X size={24}/></button>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em]">Schematic_View</span>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">{selectedProject.name}</h2>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 border-b border-white/20 pb-1">Technical_Description</h4>
                <p className="text-lg italic opacity-80 leading-relaxed">
                  {selectedProject.description || "System data currently unavailable. Accessing primary repository logs for technical verification."}
                </p>
              </div>

              {/* CODE PERCENTAGE BAR */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Capability_Loadout</h4>
                <div className="relative w-full h-10 border border-white/20 flex items-center px-4 overflow-hidden">
                   <div className="absolute left-0 top-0 h-full bg-white opacity-20" style={{ width: '85%' }}></div>
                   <div className="relative z-10 w-full flex justify-between text-[10px] font-black uppercase italic">
                      <span>{selectedProject.language || 'JAVASCRIPT'} // 85%</span>
                      <span>SYSTEM_STABLE</span>
                   </div>
                </div>
              </div>

              <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 bg-white text-black px-8 py-4 font-black uppercase text-xs tracking-widest hover:invert transition-all w-full">
                Access_Repository <ExternalLink size={16}/>
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 pt-56 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-10">
                <div className="inline-block px-3 py-1 border border-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity size={12} className="animate-pulse text-green-500" /> SYSTEM_ACTIVE // TORONTO_CA
                </div>
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>WONDWOSSEN</span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic border-l-4 border-white pl-6">Digital systems built with architectural precision and high-performance optics.</p>
              </div>
            </div>
          </div>
        )}

        {page === 'code' && (
          <div className="space-y-12">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter underline decoration-4 underline-offset-8"><CypherText text="Terminal" /></h2>
            <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom duration-500">
              {loading ? <Loader2 className="animate-spin mx-auto col-span-2" size={48} /> : 
                repos.map((repo) => (
                  <button key={repo.id} onClick={() => setSelectedProject(repo)} 
                    className="group text-left p-12 border-2 border-white hover:bg-white hover:text-black transition-all duration-500 relative">
                    <Corners />
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-4xl font-black uppercase italic tracking-tighter">{repo.name}</h3>
                      <BarChart3 size={20} className="opacity-20 group-hover:opacity-100" />
                    </div>
                    <div className="flex justify-between items-center mt-8">
                      <span className="text-[10px] font-black border border-current px-3 py-1 uppercase">{repo.language || 'JS'}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Deconstruct →</span>
                    </div>
                  </button>
                ))
              }
            </div>
          </div>
        )}

        {/* ... (Other pages About, Skills, Photography, Contact remain same) ... */}
        {page === 'photography' && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 animate-in fade-in duration-700">
             {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
              ].map((url, i) => (
                <div key={i} className="relative group border-2 border-white overflow-hidden">
                  <img src={url} className="w-full grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000" alt="Work" />
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
