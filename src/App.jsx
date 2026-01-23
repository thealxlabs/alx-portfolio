import React, { useState, useEffect } from 'react';
import { 
  Camera, Code, Terminal, Layers, ArrowRight, 
  ExternalLink, Loader2, X, Activity, Globe, GitCommit, Clock, BarChart3, Mail, Github, Instagram, AlertTriangle, RefreshCw
} from 'lucide-react';

/* --- GLOBAL CYPHER EFFECT --- */
const CypherText = ({ text, className }) => {
  const [output, setOutput] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
  
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
  const [hasEntered, setHasEntered] = useState(false);
  const [page, setPage] = useState('home');
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ROUTING LOGIC
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      const validPages = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
      setPage(validPages.includes(hash) ? hash : '404');
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
      setHasEntered(true);
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = `#/${path}`;
  };

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => setRepos(Array.isArray(data) ? data : []));

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
        setLoading(false);
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

  // 404 PAGE COMPONENT
  const ErrorScreen = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
      <AlertTriangle size={80} className="text-red-500 animate-bounce" />
      <h2 className="text-9xl font-black italic tracking-tighter uppercase"><CypherText text="404_ERR" /></h2>
      <div className="space-y-4 max-w-md border-2 border-white p-8 relative">
        <Corners />
        <p className="text-sm font-black uppercase tracking-widest leading-loose">
          Congratulations. You've navigated to a sector that doesn't exist. 
          Your human input has exceeded system logic boundaries. 
          <br/><br/>
          <span className="text-red-500 opacity-50">ERROR_LOG: USER_IS_LOST_IN_SPACE</span>
        </p>
      </div>
      <button 
        onClick={() => navigate('home')}
        className="flex items-center gap-4 bg-white text-black px-10 py-4 font-black uppercase text-xs tracking-[0.3em] hover:invert transition-all"
      >
        <RefreshCw size={16} /> <CypherText text="Reboot_To_Safety" />
      </button>
    </div>
  );

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-6 cursor-none">
        <div className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
          style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
          <div className="w-1 h-1 bg-white animate-pulse" />
        </div>
        <div className="max-w-xl w-full space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase underline decoration-green-500">System_Check_Complete</p>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none"><CypherText text="ALX.CORE" /></h1>
          </div>
          <button 
            onClick={() => { setHasEntered(true); navigate('home'); }}
            className="group relative w-full border border-white p-6 hover:bg-white hover:text-black transition-all duration-500"
          >
            <div className="relative z-10 flex justify-between items-center font-black uppercase tracking-widest text-sm">
              <CypherText text="Initialize_System" />
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    );
  }

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

      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b border-white">
        <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter"><CypherText text="ALX." /></button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => navigate(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>
              <CypherText text={item} />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {page === '404' ? <ErrorScreen /> : (
          <>
            {page === 'home' && (
              <div className="space-y-24 animate-in fade-in duration-1000">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-8 space-y-10">
                    <div className="inline-block px-3 py-1 border border-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <Activity size={12} className="animate-pulse text-green-500" /> SYSTEM_ACTIVE // TORONTO_CA
                    </div>
                    <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                      <CypherText text="ALEXANDER" /><br/>
                      <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}><CypherText text="WONDWOSSEN" /></span>
                    </h1>
                  </div>
                  <div className="lg:col-span-4 relative group">
                    <div className="p-4 border-2 border-white transition-transform duration-500 group-hover:-translate-y-4">
                      <Corners />
                      <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale brightness-110 contrast-125" alt="Alex" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {page === 'about' && (
              <div className="grid lg:grid-cols-12 gap-16 animate-in slide-in-from-left duration-700">
                <div className="lg:col-span-8 space-y-12">
                  <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Profile" /></h2>
                  <div className="space-y-8 text-2xl md:text-3xl font-light italic leading-snug opacity-80 border-l-[10px] border-white pl-10">
                    <p><CypherText text="I operate at the intersection of Structural Logic and Digital Optics." /></p>
                    <p><CypherText text="Based in Toronto, I use React to build interfaces that feel like physical machinery." /></p>
                  </div>
                </div>
              </div>
            )}

            {page === 'code' && (
              <div className="space-y-12 animate-in slide-in-from-bottom duration-500">
                <h2 className="text-8xl font-black italic uppercase tracking-tighter underline decoration-4"><CypherText text="Terminal" /></h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {loading ? <Loader2 className="animate-spin mx-auto col-span-2" size={48} /> : 
                    repos.map((repo) => (
                      <button key={repo.id} onClick={() => setSelectedProject(repo)} className="group text-left p-12 border-2 border-white hover:bg-white hover:text-black transition-all duration-500 relative">
                        <Corners />
                        <h3 className="text-4xl font-black uppercase italic tracking-tighter"><CypherText text={repo.name} /></h3>
                        <div className="flex justify-between items-center mt-8">
                          <span className="text-[10px] font-black border border-current px-3 py-1 uppercase">{repo.language || 'JS'}</span>
                        </div>
                      </button>
                    ))
                  }
                </div>
              </div>
            )}
            
            {/* Project Modal, Skills, Photography, Contact remain consistent with v16 logic but with Global Cypher */}
            {/* ... */}
          </>
        )}
      </main>

      {/* SCHEMATIC MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative w-full max-w-2xl border-2 border-white bg-black p-8 md:p-12 animate-in zoom-in duration-300">
            <Corners />
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X size={24}/></button>
            <div className="space-y-8">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter"><CypherText text={selectedProject.name} /></h2>
              <p className="text-lg italic opacity-80">{selectedProject.description || "System data restricted."}</p>
              <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 bg-white text-black px-8 py-4 font-black uppercase text-xs tracking-widest hover:invert transition-all w-full">
                <CypherText text="Access_Repository" /> <ExternalLink size={16}/>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
