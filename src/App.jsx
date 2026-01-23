import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  MapPin, ExternalLink, Loader2, Target, X, Info, Box
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

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoadingRepos(false);
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

      <main className="relative z-10 pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* --- CASE STUDY OVERLAY --- */}
        {selectedProject && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 animate-in fade-in zoom-in duration-300">
            <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto border-2 border-white bg-black text-white p-8 md:p-16`}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 hover:rotate-90 transition-transform"><X size={32}/></button>
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.5em] opacity-40">Project_Case_Study</p>
                  <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">{selectedProject.name}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black border-b border-white/20 pb-2 uppercase tracking-widest">Brief</h4>
                      <p className="text-lg opacity-70 italic">{selectedProject.description || "A custom developed solution focused on performance and industrial UI design principles."}</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-black border-b border-white/20 pb-2 uppercase tracking-widest">Tech_Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Tailwind', 'Vite', 'Node.js', 'Framer Motion'].map(tag => (
                          <span key={tag} className="px-3 py-1 border border-white text-[10px] font-bold uppercase">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8 bg-white/5 p-8 border border-white/10 italic">
                    <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><Info size={14}/> Critical_Focus</h4>
                    <p className="text-sm opacity-60 leading-relaxed">The main challenge of this project was optimizing the rendering pipeline for high-density data visualizations while maintaining a minimalist aesthetic inspired by Toronto's urban grid.</p>
                    <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 bg-white text-black px-6 py-3 font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                      Open_Repository <ExternalLink size={14}/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- HOME --- */}
        {page === 'home' && (
          <div className="space-y-24 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-8">
                <div className="inline-block px-3 py-1 border border-current text-[10px] font-bold uppercase tracking-widest">Nikon D3200 // 55mm Optics</div>
                <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                  ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: `1px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
                </h1>
                <p className="text-xl md:text-3xl font-light max-w-2xl opacity-70 italic">Toronto Developer. Photographer. Building digital tools with structural logic.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- CODE (WITH CASE STUDY TRIGGER) --- */}
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
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter">{repo.name}</h3>
                      <p className="text-sm opacity-50 italic group-hover:opacity-100 line-clamp-2">{repo.description || 'System metadata restricted.'}</p>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-[10px] font-black border border-current px-2 py-0.5 uppercase">{repo.language || 'JS'}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View_Case_Study →</span>
                      </div>
                    </div>
                  </button>
                ))
              }
            </div>
          </div>
        )}

        {/* --- PHOTOGRAPHY --- */}
        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in duration-700">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter"><CypherText text="Optics" /></h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
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

      </main>
    </div>
  );
}
