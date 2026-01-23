import React, { useState, useEffect } from 'react';
import { 
  Camera, Code, Terminal, Layers, ArrowRight, 
  ExternalLink, Loader2, X, Activity, Globe, GitCommit, Clock, BarChart3, Mail, Github, Instagram
} from 'lucide-react';

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
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      const validPages = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
      setPage(validPages.includes(hash) ? hash : 'home');
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (path) => { window.location.hash = `#/${path}`; };

  // GITHUB FEED DATA
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
              return `${type}: [${repo}] - SYSTEM_SYNC`;
            }).slice(0, 8);
          setEvents(processed);
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

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-6 cursor-none">
        <div className="max-w-xl w-full space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Initial_Boot_Sequence_v16.0</p>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">ALX.<br/>CORE</h1>
          </div>
          <button 
            onClick={() => { setHasEntered(true); navigate('home'); }}
            className="group w-full border border-white p-6 hover:bg-white hover:text-black transition-all duration-500"
          >
            <div className="flex justify-between items-center font-black uppercase tracking-widest text-sm">
              <span>Initialize_System</span>
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

      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b border-white">
        <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => navigate(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>
              {item}
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-10">
                <div className="inline-block px-3 py-1 border border-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity size={12} className="animate-pulse text-green-500" /> SYSTEM_ACTIVE // TORONTO_CA
                </div>
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  ALEXANDER<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>WONDWOSSEN</span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic border-l-4 border-white pl-6">Digital systems built with architectural precision and high-performance optics.</p>
              </div>
              <div className="lg:col-span-4 relative group p-4 border-2 border-white">
                <Corners />
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale contrast-125 brightness-110" alt="Alex" />
              </div>
            </div>
          </div>
        )}

        {page === 'about' && (
          <div className="grid lg:grid-cols-12 gap-16 animate-in slide-in-from-left duration-700">
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter">Profile</h2>
              <div className="space-y-8 text-2xl md:text-3xl font-light italic leading-snug opacity-80 border-l-[10px] border-white pl-10">
                <p>I operate at the intersection of Structural Logic and Digital Optics.</p>
                <p>Based in Toronto, I use React to build interfaces that feel like physical machinery, and a Nikon D3200 to document the architecture that inspires them.</p>
              </div>
            </div>
          </div>
        )}

        {page === 'skills' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter">Capability</h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-white">
              {[
                { title: 'Code', items: ['React.js', 'Tailwind', 'Vite', 'Node.js'] },
                { title: 'Optics', items: ['Nikon D3200', '55mm Prime', 'Manual Controls'] },
                { title: 'Design', items: ['Brutalism', 'Figma', 'Geometry'] }
              ].map((s, i) => (
                <div key={i} className="p-16 border-r-2 last:border-r-0 border-white group hover:bg-white transition-all duration-300">
                  <h3 className="text-3xl font-black uppercase mb-10 italic group-hover:text-black">{s.title}</h3>
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

        {page === 'code' && (
          <div className="space-y-12">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter underline decoration-4">Terminal</h2>
            <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom duration-500">
              {loading ? <Loader2 className="animate-spin mx-auto text-white" size={48} /> : 
                repos.map((repo) => (
                  <button key={repo.id} onClick={() => setSelectedProject(repo)} 
                    className="group text-left p-12 border-2 border-white hover:bg-white hover:text-black transition-all duration-500 relative">
                    <Corners />
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{repo.name}</h3>
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

        {page === 'photography' && (
          <div className="space-y-12">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter">Optics</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-10 animate-in zoom-in duration-700">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
              ].map((url, i) => (
                <div key={i} className="relative group border-2 border-white overflow-hidden bg-black">
                  <img src={url} className="w-full grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Work" />
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-20 py-10 animate-in slide-in-from-bottom duration-500">
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none text-center underline decoration-8">Sync</h2>
            <div className="grid gap-6">
              <a href="mailto:alxgraphy@icloud.com" className="p-14 border-2 border-white flex justify-between items-center group hover:bg-white hover:text-black transition-all">
                <p className="text-4xl md:text-5xl font-black italic tracking-tighter">alxgraphy@icloud.com</p>
                <ArrowRight size={48} className="group-hover:rotate-45 transition-transform" />
              </a>
            </div>
          </div>
        )}

      </main>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative w-full max-w-2xl border-2 border-white bg-black p-8 md:p-12 animate-in zoom-in duration-300">
            <Corners />
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X size={24}/></button>
            <div className="space-y-8">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">{selectedProject.name}</h2>
              <p className="text-lg italic opacity-80">{selectedProject.description || "System data restricted."}</p>
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
