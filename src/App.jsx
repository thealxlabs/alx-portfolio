import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  MapPin, ExternalLink, Loader2, Target, X, Info,
  Instagram, Github, Mail, User, Activity, Globe, Clock
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
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [weather, setWeather] = useState("SYNCING...");

  // FETCH REPOS & WEATHER
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoadingRepos(false);
      });
    
    // Mocking Toronto Weather (Can be replaced with OpenWeather API)
    setTimeout(() => setWeather("-4°C // OVERCAST"), 2000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const t = theme === 'dark' 
    ? { bg: 'bg-black', text: 'text-white', border: 'border-white', panel: 'bg-[#0a0a0a]', inverse: 'bg-white text-black' }
    : { bg: 'bg-white', text: 'text-black', border: 'border-black', panel: 'bg-[#f5f5f5]', inverse: 'bg-black text-white' };

  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  // LOGS LOGIC
  const systemLogs = [
    `SYSTEM_START: TORONTO_NODE_ACTIVE`,
    `GEO_LOC: 43.6532° N, 79.3832° W`,
    `WEATHER: ${weather}`,
    `OPTICS: NIKON_D3200_LINKED`,
    `LENS: 55MM_PRIME_READY`,
    ...repos.slice(0, 3).map(r => `RECENT_PUSH: [${r.name.toUpperCase()}]`),
    `STATUS: ARCHIVE_ACCESSIBLE`
  ];

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden cursor-none`}>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* CURSOR */}
      <div className="fixed top-0 left-0 w-8 h-8 border border-current rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
        <div className="w-1 h-1 bg-current animate-pulse" />
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 backdrop-blur-md border-b ${t.border}`}>
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

      {/* SYSTEM LOG MARQUEE */}
      <div className={`fixed bottom-0 w-full ${t.inverse} py-2 z-50 overflow-hidden border-t-2 ${t.border}`}>
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {[...systemLogs, ...systemLogs].map((log, i) => (
            <span key={i} className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-4">
              <span className="opacity-40">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
              {log}
              <Activity size={10} className="text-green-500" />
            </span>
          ))}
        </div>
      </div>

      <main className="relative z-10 pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* --- PROJECT INSIGHT OVERLAY --- */}
        {selectedProject && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 animate-in fade-in zoom-in duration-300">
            <div className={`relative w-full max-w-4xl border-2 border-white bg-black text-white p-8 md:p-16`}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 hover:rotate-90 transition-transform"><X size={32}/></button>
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Insight_Mode</p>
                  <h2 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{selectedProject.name}</h2>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black border-b border-white/20 pb-2 uppercase tracking-widest">Project_Brief</h4>
                    <p className="text-xl opacity-70 italic leading-relaxed">{selectedProject.description || "Building digital solutions with a focus on performance and industrial UI design principles."}</p>
                  </div>
                  <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 bg-white text-black px-8 py-4 font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform w-full md:w-auto">
                    Access_Source <ExternalLink size={16}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- HOME PAGE --- */}
        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-8">
                <div className="inline-block px-3 py-1 border border-current text-[10px] font-bold uppercase tracking-widest">Nikon D3200 // 55mm Optics</div>
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: `1px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic">Toronto Developer. Photographer. Documenting the city through sharp optics and optimized code.</p>
              </div>
              <div className="lg:col-span-4">
                <div className={`p-4 border-2 ${t.border} transition-transform duration-500 hover:-translate-y-2 relative`}>
                  <Corners />
                  <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale brightness-110 contrast-125" alt="Alex" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ABOUT --- */}
        {page === 'about' && (
          <div className="grid lg:grid-cols-12 gap-16 animate-in slide-in-from-left duration-700">
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Profile" /></h2>
              <div className="space-y-8 text-3xl font-light italic leading-snug opacity-80 border-l-[10px] border-current pl-10">
                <p>I am a developer and creator based in Toronto.</p>
                <p>Equipped with a <span className="font-black underline decoration-2">Nikon D3200</span> and a <span className="font-black underline decoration-2">55mm lens</span>, I approach photography with the same precision I use when writing code.</p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className={`p-10 border-2 ${t.border} ${t.panel} relative space-y-8`}>
                <Corners />
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Kit_Details</h3>
                <div className="space-y-4 text-xs font-black uppercase">
                  <div className="flex items-center gap-3 border-b border-current/10 pb-2"><Target size={14}/> Body: Nikon D3200</div>
                  <div className="flex items-center gap-3 border-b border-current/10 pb-2"><Target size={14}/> Lens: 55mm Prime</div>
                  <div className="flex items-center gap-3"><MapPin size={14}/> Base: Toronto, ON</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- CODE PAGE --- */}
        {page === 'code' && (
          <div className="space-y-12 animate-in slide-in-from-right duration-500">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter underline decoration-4 underline-offset-8"><CypherText text="Development" /></h2>
            <div className="grid md:grid-cols-2 gap-6">
              {loadingRepos ? <Loader2 className="animate-spin mx-auto" size={48} /> : 
                repos.map((repo) => (
                  <button key={repo.id} onClick={() => setSelectedProject(repo)} 
                     className={`group text-left p-10 border-2 ${t.border} hover:bg-white hover:text-black transition-all duration-300 relative`}>
                    <Corners />
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter group-hover:line-through">{repo.name}</h3>
                      <p className="text-sm opacity-50 italic group-hover:opacity-100 line-clamp-2">{repo.description || 'System data redacted.'}</p>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-[10px] font-black border border-current px-2 py-0.5 uppercase">{repo.language || 'JS'}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Insight →</span>
                      </div>
                    </div>
                  </button>
                ))
              }
            </div>
          </div>
        )}

        {/* --- SKILLS --- */}
        {page === 'skills' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Skillset" /></h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-current">
              {[
                { title: 'Code', items: ['React.js', 'Tailwind', 'Vite', 'JavaScript', 'Node.js'], icon: <Terminal /> },
                { title: 'Optics', items: ['Nikon D3200', '55mm Prime', 'Lightroom', 'Manual Controls', 'Arch'], icon: <Camera /> },
                { title: 'Theory', items: ['Industrial UI', 'Brutalism', 'Figma', 'Geometry', 'Logic'], icon: <Layers /> }
              ].map((s, i) => (
                <div key={i} className={`p-16 border-r-2 last:border-r-0 ${t.border} group hover:bg-current transition-all duration-300`}>
                  <div className="mb-10 opacity-30 group-hover:opacity-100 group-hover:text-black transition-all transform group-hover:scale-125 origin-left">{s.icon}</div>
                  <h3 className="text-3xl font-black uppercase mb-10 italic group-hover:text-black transition-colors">{s.title}</h3>
                  <div className="space-y-4">
                    {s.items.map(item => (
                      <div key={item} className="text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'} group-hover:bg-black`} /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PHOTOGRAPHY --- */}
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
                <div key={i} className="relative group border-2 border-current overflow-hidden bg-black">
                  <img src={url} className="w-full grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000 ease-in-out" alt="Work" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- CONTACT --- */}
        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-20 py-10 animate-in slide-in-from-bottom duration-500">
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none text-center underline decoration-8">Sync</h2>
            <div className="grid gap-6">
              {[
                { platform: 'GitHub', handle: '@alxgraphy', url: 'https://github.com/alxgraphy', icon: <Github /> },
                { platform: 'Instagram', handle: '@alexedgraphy', url: 'https://instagram.com/alexedgraphy', icon: <Instagram /> },
                { platform: 'Email', handle: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com', icon: <Mail /> }
              ].map((item, i) => (
                <a key={i} href={item.url} className={`p-14 border-2 ${t.border} flex justify-between items-center group hover:bg-white hover:text-black transition-all`}>
                  <div className="flex items-center gap-8">
                    <span className="opacity-30 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                    <p className="text-4xl md:text-5xl font-black italic tracking-tighter group-hover:translate-x-6 transition-transform">{item.handle}</p>
                  </div>
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
