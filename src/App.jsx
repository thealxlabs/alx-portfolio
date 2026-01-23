import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  MapPin, ExternalLink, Loader2, Target, X,
  Instagram, Github, Mail, Activity, Globe, GitBranch, GitCommit, Clock, Focus, Cpu
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
  const [lastSync, setLastSync] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => setRepos(Array.isArray(data) ? data : []));

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
          setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
    ? { bg: 'bg-black', text: 'text-white', border: 'border-white', panel: 'bg-[#0a0a0a]' }
    : { bg: 'bg-white', text: 'text-black', border: 'border-black', panel: 'bg-[#f5f5f5]' };

  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden cursor-none`}>
      <style>{`
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-top { display: flex; animation: marquee-fast 30s linear infinite; }
      `}</style>

      {/* CURSOR */}
      <div className="fixed top-0 left-0 w-8 h-8 border border-current rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
        <div className="w-1 h-1 bg-current animate-pulse" />
      </div>

      {/* TOP LIVE GITHUB TICKER */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-10 z-[60] bg-black border-x-2 border-b-2 border-white overflow-hidden hidden sm:block shadow-2xl`}>
        <div className="animate-marquee-top whitespace-nowrap flex gap-12 items-center h-full text-white px-4">
          {events.length > 0 ? [...events, ...events].map((log, i) => (
            <span key={i} className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {log}
            </span>
          )) : (
            <span className="text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">ESTABLISHING_GITHUB_HANDSHAKE...</span>
          )}
        </div>
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b ${t.border}`}>
        <div className="flex flex-col">
          <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
          <div className="text-[8px] font-black opacity-40 uppercase tracking-widest mt-1 flex items-center gap-2">
             <Clock size={10} /> Sync: {lastSync || '--:--'}
          </div>
        </div>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through ${page === item ? 'underline decoration-2 underline-offset-4' : ''}`}>{item}</button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`ml-4 p-2 border ${t.border} hover:invert transition-all`}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-40 px-6 md:px-12 max-w-7xl mx-auto">
        {/* --- HOME PAGE --- */}
        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-10">
                <div className="inline-block px-3 py-1 border border-current text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Globe size={12} /> Toronto, ON // 43.6532° N
                </div>
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: `1px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic border-l-4 border-current pl-6">Building digital environments with architectural precision.</p>
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

        {/* --- ABOUT PAGE --- */}
        {page === 'about' && (
          <div className="grid lg:grid-cols-12 gap-16 animate-in slide-in-from-left duration-700">
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Manifesto" /></h2>
              <div className="space-y-8 text-2xl md:text-3xl font-light italic leading-snug opacity-80 border-l-[10px] border-current pl-10">
                <p>I operate at the intersection of <span className="font-black underline decoration-2">Structural Logic</span> and <span className="font-black underline decoration-2">Digital Optics</span>.</p>
                <p>Based in Toronto, I use React to build interfaces that feel like physical machinery, and a Nikon D3200 to document the architecture that inspires them.</p>
                <p>Every commit is a brick. Every frame is a blueprint.</p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className={`p-10 border-2 ${t.border} ${t.panel} relative space-y-8 shadow-2xl`}>
                <Corners />
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">System_Specs</h3>
                <div className="space-y-4 text-[10px] font-black uppercase">
                  <div className="flex items-center gap-3 border-b border-current/10 pb-2"><Focus size={14}/> Optics: Nikon D3200 // 55mm</div>
                  <div className="flex items-center gap-3 border-b border-current/10 pb-2"><Terminal size={14}/> Engine: React / Vite / Node</div>
                  <div className="flex items-center gap-3"><MapPin size={14}/> Node: Toronto (EST)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SKILLS PAGE --- */}
        {page === 'skills' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Capabilities" /></h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-current shadow-2xl">
              {[
                { title: 'Development', items: ['React.js (ES6+)', 'Tailwind CSS', 'Vite / Webpack', 'Node.js', 'REST APIs'], icon: <Cpu /> },
                { title: 'Photography', items: ['Digital Manual', '55mm Optics', 'Lightroom Pro', 'Architectural Composition', 'Visual Storytelling'], icon: <Camera /> },
                { title: 'Architecture', items: ['Industrial UI', 'Aero-Brutalist Design', 'Figma Prototyping', 'System Design', 'UX Logic'], icon: <Layers /> }
              ].map((s, i) => (
                <div key={i} className={`p-16 border-r-2 last:border-r-0 ${t.border} group hover:bg-current transition-all duration-300`}>
                  <div className="mb-10 opacity-30 group-hover:opacity-100 group-hover:text-black transition-all transform group-hover:scale-125 origin-left">{s.icon}</div>
                  <h3 className="text-3xl font-black uppercase mb-10 italic group-hover:text-black transition-colors">{s.title}</h3>
                  <div className="space-y-4">
                    {s.items.map(item => (
                      <div key={item} className="text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black flex items-center gap-3">
                        <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-white' : 'bg-black'} group-hover:bg-black`} /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ... (Keep Photography and Code pages from v9.0) ... */}
      </main>
    </div>
  );
}
