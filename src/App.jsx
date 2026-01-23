import React, { useState, useEffect, useCallback } from 'react';
import { 
  Camera, Code, Terminal, Layers, ArrowRight, 
  ExternalLink, Loader2, X, Activity, Globe, GitCommit, Clock, BarChart3, Mail, Github, Instagram, AlertTriangle, RefreshCw
} from 'lucide-react';

/* --- STABLE RE-TRIGGERING CYPHER EFFECT --- */
const CypherText = ({ text, className }) => {
  const [output, setOutput] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
  
  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
  }, [text]);

  return (
    <span 
      onMouseEnter={scramble} 
      className={`${className} transition-all duration-200`}
    >
      {output}
    </span>
  );
};

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [page, setPage] = useState('home');
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      const valid = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
      setPage(valid.includes(hash) ? hash : '404');
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (path) => { window.location.hash = `#/${path}`; };

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
              return `${type}: [${repo}] - UPDATE`;
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

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-6 cursor-none">
        <div className="max-w-xl w-full space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase">
              <CypherText text="Initial_Boot_Sequence_v20.0" />
            </p>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
              <CypherText text="ALX.CORE" />
            </h1>
          </div>
          <button 
            onClick={() => { setHasEntered(true); navigate('home'); }}
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
      <div className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
        <div className="w-1 h-1 bg-white animate-pulse" />
      </div>

      {/* TICKER */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-9 z-[60] bg-black border-x border-b border-white overflow-hidden hidden sm:block">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center h-full text-white px-4">
          {(events.length > 0 ? [...events, ...events] : ["UPLINK_STABLE"]).map((log, i) => (
            <span key={i} className="text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1 h-1 bg-green-500 animate-pulse" /> {log}
            </span>
          ))}
        </div>
      </div>

      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b border-white">
        <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter">
          <CypherText text="ALX." />
        </button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => navigate(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>
              <CypherText text={item} />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {page === '404' && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in">
            <AlertTriangle size={64} className="text-red-500 animate-pulse" />
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Sector_Missing" /></h2>
            <div className="max-w-md border border-white/20 p-8 relative">
              <Corners />
              <p className="opacity-60 italic text-sm">
                <CypherText text="Error: The requested dimension is unreachable. Recalibrate navigation." />
              </p>
            </div>
            <button onClick={() => navigate('home')} className="bg-white text-black px-10 py-4 font-black uppercase text-xs hover:invert transition-all">
              <CypherText text="Reboot_Home" />
            </button>
          </div>
        )}

        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-10">
                <div className="inline-block px-3 py-1 border border-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity size={12} className="animate-pulse text-green-500" /> <CypherText text="SYSTEM_ACTIVE // TORONTO_CA" />
                </div>
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  <CypherText text="ALEXANDER" /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}><CypherText text="WONDWOSSEN" /></span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic border-l-4 border-white pl-6">
                  <CypherText text="Digital systems built with architectural precision." />
                </p>
              </div>
              <div className="lg:col-span-4 relative group p-4 border-2 border-white">
                <Corners />
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale contrast-125" alt="Alex" />
              </div>
            </div>
          </div>
        )}

        {page === 'about' && (
          <div className="space-y-12 animate-in slide-in-from-left">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Profile" /></h2>
            <div className="space-y-8 text-2xl md:text-3xl font-light italic opacity-80 border-l-[10px] border-white pl-10">
              <p><CypherText text="I operate at the intersection of Structural Logic and Digital Optics." /></p>
              <p><CypherText text="Based in Toronto, I build machinery for the web." /></p>
            </div>
          </div>
        )}

        {page === 'skills' && (
          <div className="space-y-12 animate-in fade-in">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Capability" /></h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-white">
              {['Code', 'Optics', 'Design'].map((title, i) => (
                <div key={i} className="p-16 border-r-2 last:border-r-0 border-white group hover:bg-white transition-all">
                  <h3 className="text-3xl font-black uppercase mb-10 italic group-hover:text-black">
                    <CypherText text={title} />
                  </h3>
                  <div className="text-[10px] font-black uppercase opacity-40 group-hover:text-black">
                    <CypherText text="STABLE_LOAD_ACTIVE" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'code' && (
          <div className="space-y-12 animate-in slide-in-from-bottom">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter underline decoration-4"><CypherText text="Terminal" /></h2>
            <div className="grid md:grid-cols-2 gap-8">
              {loading ? <Loader2 className="animate-spin mx-auto text-white" size={48} /> : 
                repos.map((repo) => (
                  <button key={repo.id} onClick={() => setSelectedProject(repo)} 
                    className="group text-left p-12 border-2 border-white hover:bg-white hover:text-black transition-all relative">
                    <Corners />
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4"><CypherText text={repo.name} /></h3>
                    <div className="text-[10px] font-black uppercase italic"><CypherText text={repo.language || 'JS'} /></div>
                  </button>
                ))
              }
            </div>
          </div>
        )}

        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in">
            <div className="flex justify-between items-end border-b border-white pb-6">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Optics" /></h2>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40"><CypherText text="System_Auto_Cycle: ACTIVE" /></div>
            </div>
            <div className="relative group h-[70vh] w-full border-2 border-white overflow-hidden bg-black">
              <Corners />
              <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
                   style={{ transform: `translateY(-${(Math.floor(Date.now() / 4000) % 6) * 100}%)` }}>
                {[
                  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
                ].map((url, i) => (
                  <div key={i} className="min-h-full w-full flex-shrink-0 relative">
                    <img src={url} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt={`img_${i}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-20 py-10 animate-in slide-in-from-bottom">
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none text-center underline decoration-8"><CypherText text="Sync" /></h2>
            <div className="grid gap-6 text-center">
              <a href="mailto:alxgraphy@icloud.com" className="p-14 border-2 border-white block group hover:bg-white hover:text-black transition-all">
                <p className="text-4xl md:text-5xl font-black italic tracking-tighter"><CypherText text="alxgraphy@icloud.com" /></p>
              </a>
            </div>
          </div>
        )}

      </main>

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6">
          <div className="relative w-full max-w-2xl border-2 border-white bg-black p-12 animate-in zoom-in">
            <Corners />
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X size={24}/></button>
            <h2 className="text-5xl font-black italic uppercase mb-4"><CypherText text={selectedProject.name} /></h2>
            <p className="text-lg italic opacity-80 mb-8"><CypherText text={selectedProject.description || "No metadata available."} /></p>
            <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="block text-center bg-white text-black py-4 font-black uppercase text-xs tracking-widest hover:invert transition-all">
              <CypherText text="Access_Repository" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
