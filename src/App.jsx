import React, { useState, useEffect } from 'react';
import { 
  Camera, Code, Terminal, Layers, ArrowRight, 
  ExternalLink, Loader2, X, Activity, Globe, GitCommit, Clock, BarChart3, Mail, Github, Instagram, AlertTriangle
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

  // ROUTING & NAVIGATION
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      const valid = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
      setPage(valid.includes(hash) ? hash : '404');
    };
    window.addEventListener('hashchange', handleHash);
    handleHash(); // Run on mount
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (path) => { window.location.hash = `#/${path}`; };

  // DATA FETCHING
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => setRepos(Array.isArray(data) ? data : []));

    fetch('https://api.github.com/users/alxgraphy/events/public')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const processed = data
            .filter(e => ['PushEvent', 'PullRequestEvent'].includes(e.type))
            .map(event => {
              const type = event.type.replace('Event', '').toUpperCase();
              const repo = event.repo.name.split('/')[1];
              return `${type}: [${repo}] - UPDATE_PUSHED`;
            }).slice(0, 8);
          setEvents(processed);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const Corners = () => (
    <>
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white" />
    </>
  );

  // LANDING BOOT SCREEN
  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-6 cursor-none">
        <div className="max-w-xl w-full space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Initial_Boot_Sequence_v18.0</p>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">ALX.<br/>CORE</h1>
          </div>
          <button 
            onClick={() => setHasEntered(true)}
            className="group w-full border border-white p-6 hover:bg-white hover:text-black transition-all duration-500"
          >
            <div className="flex justify-between items-center font-black uppercase tracking-widest text-sm">
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

      {/* GITHUB TICKER */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-9 z-[60] bg-black border-x border-b border-white overflow-hidden hidden sm:block">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center h-full text-white px-4">
          {(events.length > 0 ? [...events, ...events] : ["ESTABLISHING_UPLINK..."]).map((log, i) => (
            <span key={i} className="text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1 h-1 bg-green-500 animate-pulse" /> {log}
            </span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b border-white">
        <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => navigate(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>
              <CypherText text={item} />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* 404 SCREEN */}
        {page === '404' && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6">
            <AlertTriangle size={64} className="text-red-500" />
            <h2 className="text-7xl font-black italic uppercase tracking-tighter"><CypherText text="Sector_Missing" /></h2>
            <p className="max-w-md opacity-60 italic text-sm border border-white/20 p-6">ERROR: The page you requested does not exist in this dimension. Please recalibrate your primitive human navigation.</p>
            <button onClick={() => navigate('home')} className="bg-white text-black px-8 py-3 font-black uppercase text-xs hover:invert transition-all">Reboot_Home</button>
          </div>
        )}

        {/* HOME */}
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
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic border-l-4 border-white pl-6">Digital systems built with architectural precision and high-performance optics.</p>
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

        {/* ABOUT */}
        {page === 'about' && (
          <div className="grid lg:grid-cols-12 gap-16 animate-in slide-in-from-left duration-700">
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Profile" /></h2>
              <div className="space-y-8 text-2xl md:text-3xl font-light italic leading-snug opacity-80 border-l-[10px] border-white pl-10">
                <p>I operate at the intersection of Structural Logic and Digital Optics.</p>
                <p>Based in Toronto, I use React to build interfaces that feel like physical machinery, and a Nikon D3200 to document the architecture that inspires them.</p>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS */}
        {page === 'skills' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Capability" /></h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-white">
              {[
                { title: 'Code', items: ['React.js', 'Tailwind', 'Vite', 'Node.js'], icon: <Terminal /> },
                { title: 'Optics', items: ['Nikon D3200', '55mm Prime', 'Manual Controls'], icon: <Camera /> },
                { title: 'Design', items: ['Brutalism', 'Figma', 'Geometry'], icon: <Layers /> }
              ].map((s, i) => (
                <div key={i} className="p-16 border-r-2 last:border-r-0 border-white group hover:bg-white transition-all duration-300">
                  <h3 className="text-3xl font-black uppercase mb-10 italic group-hover:text-black"><CypherText text={s.title} /></h3>
                  <div className="space-y-4">
                    {s.items.map(item => (
                      <div key={item} className="text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CODE */}
        {page === 'code' && (
          <div className="space-y-12">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter underline decoration-4"><CypherText text="Terminal" /></h2>
            <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom duration-500">
              {loading ? <Loader2 className="animate-spin mx-auto col-span-2 text-white" size={48} /> : 
                repos.map((repo) => (
                  <button key={repo.id} onClick={() => setSelectedProject(repo)} 
                    className="group text-left p-12 border-2 border-white hover:bg-white hover:text-black transition-all duration-500 relative">
                    <Corners />
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4"><CypherText text={repo.name} /></h3>
                    <div className="flex justify-between items-center mt-8 text-[10px] font-black uppercase italic">
                      <span>{repo.language || 'JS'} // STABLE</span>
                      <span className="opacity-0 group-hover:opacity-100">DECONSTRUCT →</span>
                    </div>
                  </button>
                ))
              }
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY */}
        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in duration-700">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Optics" /></h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-10">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
              ].map((url, i) => (
                <div key={i} className="relative group border-2 border-white overflow-hidden bg-black">
                  <img src={url} className="w-full grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000 ease-in-out" alt="Work" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-20 py-10 animate-in slide-in-from-bottom duration-500">
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none text-center underline decoration-8"><CypherText text="Sync" /></h2>
            <div className="grid gap-6">
              {[
                { platform: 'GitHub', handle: '@alxgraphy', url: 'https://github.com/alxgraphy', icon: <Github /> },
                { platform: 'Instagram', handle: '@alexedgraphy', url: 'https://instagram.com/alexedgraphy', icon: <Instagram /> },
                { platform: 'Email', handle: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com', icon: <Mail /> }
              ].map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer" className="p-14 border-2 border-white flex justify-between items-center group hover:bg-white hover:text-black transition-all">
                  <p className="text-4xl md:text-5xl font-black italic tracking-tighter"><CypherText text={item.handle} /></p>
                  <ArrowRight size={48} className="group-hover:rotate-45 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODAL / SCHEMATIC */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative w-full max-w-2xl border-2 border-white bg-black p-8 md:p-12 animate-in zoom-in duration-300">
            <Corners />
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X size={24}/></button>
            <div className="space-y-8">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter"><CypherText text={selectedProject.name} /></h2>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 border-b border-white/20 pb-1">Technical_Description</h4>
                <p className="text-lg italic opacity-80 leading-relaxed">{selectedProject.description || "System logs for this repository are restricted or empty."}</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Capability_Loadout</h4>
                <div className="relative w-full h-10 border border-white/20 flex items-center px-4 overflow-hidden">
                   <div className="absolute left-0 top-0 h-full bg-white opacity-20" style={{ width: '85%' }}></div>
                   <div className="relative z-10 w-full flex justify-between text-[10px] font-black uppercase italic">
                      <span>{selectedProject.language || 'JS'} // 85%</span>
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
    </div>
  );
}
