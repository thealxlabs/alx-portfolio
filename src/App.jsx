import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  MapPin, ExternalLink, Loader2, Target, X,
  Instagram, Github, Mail, Activity, Globe, GitBranch, GitCommit
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
  const [theme, setTheme] = useState('dark');
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // FETCH REPOS
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => setRepos(Array.isArray(data) ? data : []));

    // FETCH LIVE EVENTS (PUSH/PULL/COMMIT)
    fetch('https://api.github.com/users/alxgraphy/events/public')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const processedEvents = data.map(event => {
            const type = event.type.replace('Event', '').toUpperCase();
            const repo = event.repo.name.split('/')[1];
            let msg = "";
            if (event.payload.commits) msg = event.payload.commits[0].message;
            if (event.payload.pull_request) msg = event.payload.pull_request.title;
            return `${type}: [${repo}] - ${msg || 'SYSTEM_UPDATE'}`;
          }).slice(0, 10);
          setEvents(processedEvents);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const t = theme === 'dark' 
    ? { bg: 'bg-black', text: 'text-white', border: 'border-white', inverse: 'bg-white text-black' }
    : { bg: 'bg-white', text: 'text-black', border: 'border-black', inverse: 'bg-black text-white' };

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden cursor-none`}>
      
      <style>{`
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-top { display: flex; animation: marquee-fast 25s linear infinite; }
      `}</style>

      {/* CURSOR */}
      <div className="fixed top-0 left-0 w-8 h-8 border border-current rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
        <div className="w-1 h-1 bg-current animate-pulse" />
      </div>

      {/* TOP LIVE GITHUB TICKER (ACTUAL DATA) */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-10 z-[60] bg-black border-x-2 border-b-2 border-white overflow-hidden hidden sm:block shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
        <div className="animate-marquee-top whitespace-nowrap flex gap-12 items-center h-full text-white px-4">
          {events.length > 0 ? [...events, ...events].map((log, i) => (
            <span key={i} className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <GitCommit size={12} className="text-green-400" />
              {log}
            </span>
          )) : (
            <span className="text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">CONNECTING_TO_GITHUB_API...</span>
          )}
        </div>
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b ${t.border}`}>
        <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>{item}</button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`ml-4 p-2 border ${t.border} hover:invert transition-all`}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </nav>
      </header>

      {/* BOTTOM SYSTEM TICKER */}
      <div className={`fixed bottom-0 w-full ${t.inverse} py-3 z-50 overflow-hidden border-t-2 ${t.border}`}>
        <div className="animate-marquee-top whitespace-nowrap flex gap-20 items-center">
          {[1,2,3].map((_, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-6">
              <Activity size={12} /> TORONTO_NODE: ACTIVE
              <Globe size={12} /> 43.6532° N, 79.3832° W
              <Target size={12} /> KIT: NIKON_D3200 // 55MM
            </span>
          ))}
        </div>
      </div>

      <main className="relative z-10 pt-56 pb-40 px-6 md:px-12 max-w-7xl mx-auto">
        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-10">
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: `1px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic border-l-4 border-current pl-6">Building digital environments with architectural precision.</p>
              </div>
              <div className="lg:col-span-4 relative group">
                <div className={`p-4 border-2 ${t.border} transition-transform duration-500 group-hover:-translate-y-4`}>
                  <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale brightness-110 contrast-125" alt="Alex" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ... Rest of the pages from Checkpoint 3 (Skills, Code, etc.) ... */}
        {page === 'code' && (
          <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom duration-500">
             {loading ? <Loader2 className="animate-spin mx-auto col-span-2" size={48} /> : 
                repos.map((repo) => (
                  <button key={repo.id} onClick={() => setSelectedProject(repo)} 
                     className={`group text-left p-12 border-2 ${t.border} hover:bg-white hover:text-black transition-all duration-500`}>
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{repo.name}</h3>
                    <p className="opacity-50 line-clamp-2 italic mb-6">{repo.description || 'System data redacted.'}</p>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black border border-current px-3 py-1 uppercase">{repo.language || 'JS'}</span>
                       <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform"/>
                    </div>
                  </button>
                ))
              }
          </div>
        )}
      </main>
    </div>
  );
}
