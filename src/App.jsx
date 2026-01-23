import React, { useState, useEffect } from 'react';
import { 
  Camera, Code, Terminal, Layers, ArrowRight, 
  ExternalLink, Loader2, X, Activity, Globe, GitCommit, Clock, BarChart3, Mail, Github, Instagram, Cpu, Database
} from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [page, setPage] = useState('home');
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good_Morning";
    if (hour < 18) return "Good_Afternoon";
    return "Good_Evening";
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setPage(['home', 'about', 'skills', 'code', 'photography', 'contact'].includes(hash) ? hash : 'home');
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
            .map(event => `${event.type.replace('Event', '').toUpperCase()}: [${event.repo.name.split('/')[1]}]`)
            .slice(0, 8);
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
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/40" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-white/40" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-white/40" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/40" />
    </>
  );

  const BackgroundGrid = () => (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
      style={{ 
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: `40px 40px, 200px 200px, 200px 200px`
      }} 
    />
  );

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center p-6 cursor-none overflow-hidden">
        <BackgroundGrid />
        <div className="max-w-xl w-full space-y-12 relative z-10 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-2 border-l border-white/20 pl-6">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">{getGreeting()}</p>
            <p className="text-3xl font-black italic tracking-tighter uppercase">{time.toLocaleTimeString()}</p>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Initial_Boot_Sequence_v17.0</p>
            <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">ALX.<br/><span className="text-outline text-transparent" style={{ WebkitTextStroke: '1px white' }}>CORE</span></h1>
          </div>
          <button 
            onClick={() => { setHasEntered(true); navigate('home'); }}
            className="group w-full border border-white/20 p-8 hover:border-white hover:bg-white hover:text-black transition-all duration-700 relative"
          >
            <div className="relative z-10 flex justify-between items-center font-black uppercase tracking-[0.3em] text-xs">
              <span>Initialize_Pattern_Library</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono overflow-x-hidden cursor-none selection:bg-white selection:text-black">
      <BackgroundGrid />
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; animation: marquee 30s linear infinite; }
        .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
      `}</style>

      {/* CURSOR */}
      <div className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-75"
        style={{ transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)` }}>
        <div className="w-1 h-1 bg-white" />
      </div>

      {/* TOP TICKER */}
      <div className="fixed top-0 left-0 w-full h-10 z-[60] bg-black/80 backdrop-blur-xl border-b border-white/10 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center h-full px-4 text-[9px] font-bold uppercase tracking-widest text-white/60">
          {(events.length > 0 ? [...events, ...events] : ["FETCHING_GLOBAL_VARIABLES..."]).map((log, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full" /> {log}
            </span>
          ))}
        </div>
      </div>

      <header className="fixed top-10 w-full z-50 flex justify-between items-end px-6 md:px-12 py-8 pointer-events-none">
        <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter pointer-events-auto">ALX.</button>
        <nav className="flex flex-col items-end gap-2 pointer-events-auto">
          {['about', 'skills', 'code', 'photography', 'contact'].map((item, idx) => (
            <button key={item} onClick={() => navigate(item)} className="group flex items-center gap-4">
              <span className={`text-[9px] font-bold uppercase tracking-widest transition-all ${page === item ? 'text-white' : 'text-white/30 group-hover:text-white'}`}>
                {idx.toString().padStart(2, '0')} // {item}
              </span>
              <div className={`h-[1px] transition-all duration-500 ${page === item ? 'w-12 bg-white' : 'w-4 bg-white/20 group-hover:w-8 group-hover:bg-white/60'}`} />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {page === 'home' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col items-center text-center">
            {/* PHOTO TOP CENTER WITH KINETIC HOVER */}
            <div className="relative w-64 h-64 border border-white/10 p-2 overflow-hidden group">
              <Corners />
              <img 
                src="https://avatars.githubusercontent.com/u/198081098?v=4" 
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 group-hover:rotate-1" 
                alt="Alex" 
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all pointer-events-none" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
                <Activity size={14} className="text-white" /> Status: System_Core_Online
              </div>
              <h1 className="text-6xl md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase italic">
                ALEXANDER<br/>
                <span className="text-outline text-transparent">WONDWOSSEN</span>
              </h1>
            </div>
            
            <div className="max-w-2xl border-t border-white/10 pt-8 space-y-8">
               <p className="text-xl md:text-2xl font-light italic text-white/70 leading-relaxed">
                  Structural Logic // Digital Optics. <br/> Building the future of modular interfaces.
                </p>
                <div className="flex justify-center gap-4">
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold tracking-widest uppercase">Variable-Based</div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold tracking-widest uppercase">Tokenized-UI</div>
                </div>
            </div>
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-4xl space-y-16 animate-in slide-in-from-left duration-700">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">Profile</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8 text-xl font-light italic opacity-80 leading-snug border-l-2 border-white/10 pl-10">
                <p>I operate at the intersection of structural logic and digital photography. My work is defined by a brutalist approach to code—prioritizing raw performance, modularity, and high-fidelity aesthetics.</p>
                <p>Based in Toronto, I document architectural geometry through a 55mm prime lens and translate those physical patterns into scalable design systems.</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/[0.02]">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 opacity-30">Current_Coordinates</h4>
                <ul className="space-y-4 text-xs uppercase tracking-widest font-bold">
                  <li className="flex justify-between"><span>Location</span><span className="text-white/40">Toronto, CA</span></li>
                  <li className="flex justify-between"><span>Focus</span><span className="text-white/40">Frontend Arch</span></li>
                  <li className="flex justify-between"><span>Lens</span><span className="text-white/40">Nikon D3200</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {page === 'skills' && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">Capability</h2>
            <div className="grid md:grid-cols-3 gap-0 border border-white/10">
              {[
                { title: 'Development', items: ['React / Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js / Express', 'Git Workflow'], icon: <Terminal /> },
                { title: 'Optical_Kit', items: ['Nikon D3200', '55mm f/1.8 Prime', 'Adobe Lightroom', 'Architectural Shot', 'Manual Exposure'], icon: <Camera /> },
                { title: 'Design_System', items: ['Figma Variables', 'Brutalist Theory', 'UI Component Arch', 'Prototyping', 'Tokenization'], icon: <Cpu /> }
              ].map((s, i) => (
                <div key={i} className="p-12 border-r border-white/10 last:border-r-0 group hover:bg-white transition-all duration-500">
                  <div className="mb-8 text-white/40 group-hover:text-black transition-colors">{s.icon}</div>
                  <h3 className="text-2xl font-black uppercase mb-8 italic group-hover:text-black">{s.title}</h3>
                  <div className="space-y-3">
                    {s.items.map(item => (
                      <div key={item} className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black/60">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ... CODE, PHOTOGRAPHY, CONTACT pages stay identical to previous version ... */}
        {page === 'code' && (
          <div className="space-y-16 animate-in slide-in-from-bottom duration-700">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">Library</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {loading ? <Loader2 className="animate-spin text-white/20" /> : repos.map((repo) => (
                <button key={repo.id} onClick={() => setSelectedProject(repo)} 
                  className="group relative p-12 border border-white/10 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500 text-left">
                  <Corners />
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 group-hover:text-black/40">Token_ID: {repo.id.toString().slice(-4)}</span>
                    <Database size={14} className="opacity-20 group-hover:opacity-100" />
                  </div>
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{repo.name}</h3>
                  <div className="text-[10px] font-bold uppercase tracking-widest group-hover:text-black/60">{repo.language || 'JSON'} // v1.0.0</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'photography' && (
          <div className="space-y-16 animate-in zoom-in-95 duration-700">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">Optics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
              ].map((url, i) => (
                <div key={i} className="group relative aspect-[4/5] border border-white/10 bg-black overflow-hidden">
                  <img src={url} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" alt="Capture" />
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-20 py-10 animate-in slide-in-from-bottom duration-500 text-center">
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none underline decoration-8 decoration-white/10">Sync</h2>
            <div className="grid gap-6">
              <a href="mailto:alxgraphy@icloud.com" className="p-14 border border-white/10 flex justify-between items-center group hover:bg-white hover:text-black transition-all">
                <p className="text-4xl md:text-5xl font-black italic tracking-tighter">alxgraphy@icloud.com</p>
                <ArrowRight size={48} className="group-hover:rotate-45 transition-transform" />
              </a>
            </div>
          </div>
        )}
      </main>

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="relative w-full max-w-2xl border border-white/10 bg-black p-12">
            <Corners />
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-all"><X size={20}/></button>
            <div className="space-y-8">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">{selectedProject.name}</h2>
              <p className="text-xl font-light italic text-white/60">{selectedProject.description || "Component metadata restricted."}</p>
              <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-between border border-white/20 px-8 py-5 hover:bg-white hover:text-black transition-all group">
                <span className="font-bold uppercase text-[10px] tracking-widest">Access_Module</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
