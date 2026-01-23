import React, { useState, useEffect } from 'react';
import { 
  Camera, Code, Terminal, Layers, ArrowRight, 
  MapPin, ExternalLink, Loader2, Target, X,
  Instagram, Github, Mail, Activity, Globe, GitCommit, Clock
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // CONSTANT DARK THEME VALUES
  const t = { bg: 'bg-black', text: 'text-white', border: 'border-white', panel: 'bg-[#0a0a0a]' };

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
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono overflow-x-hidden cursor-none`}>
      
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

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b ${t.border}`}>
        <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>{item}</button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* HOME */}
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
              <div className="lg:col-span-4 relative group">
                <div className={`p-4 border-2 ${t.border} transition-transform duration-500 group-hover:-translate-y-4`}>
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
                  <h3 className="text-3xl font-black uppercase mb-10 italic group-hover:text-black">{s.title}</h3>
                  <div className="space-y-4">
                    {s.items.map(item => (
                      <div key={item} className="text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black flex items-center gap-3">
                         {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CODE */}
        {page === 'code' && (
          <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-right duration-500">
             {loading ? <Loader2 className="animate-spin mx-auto col-span-2 text-white" size={48} /> : 
                repos.map((repo) => (
                  <button key={repo.id} onClick={() => window.open(repo.html_url, '_blank')} 
                     className="group text-left p-12 border-2 border-white hover:bg-white hover:text-black transition-all duration-500 relative">
                    <Corners />
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 group-hover:line-through">{repo.name}</h3>
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
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none text-center underline decoration-8">Sync</h2>
            <div className="grid gap-6">
              {[
                { platform: 'GitHub', handle: '@alxgraphy', url: 'https://github.com/alxgraphy', icon: <Github /> },
                { platform: 'Instagram', handle: '@alexedgraphy', url: 'https://instagram.com/alexedgraphy', icon: <Instagram /> },
                { platform: 'Email', handle: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com', icon: <Mail /> }
              ].map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer" className="p-14 border-2 border-white flex justify-between items-center group hover:bg-white hover:text-black transition-all">
                  <p className="text-4xl md:text-5xl font-black italic tracking-tighter">{item.handle}</p>
                  <ArrowRight size={48} className="group-hover:rotate-45 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
