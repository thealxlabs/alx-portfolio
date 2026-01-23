import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  Activity, User, MapPin, Calendar, ExternalLink, Loader2 
} from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [showNav, setShowNav] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const lastScrollY = useRef(0);

  // FETCH LIVE GITHUB DATA
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoadingRepos(false);
      })
      .catch(() => setLoadingRepos(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY < lastScrollY.current || window.scrollY < 50);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = theme === 'dark' 
    ? { bg: 'bg-black', text: 'text-white', border: 'border-white', panel: 'bg-[#0a0a0a]', grid: 'opacity-10' }
    : { bg: 'bg-white', text: 'text-black', border: 'border-black', panel: 'bg-[#f5f5f5]', grid: 'opacity-5' };

  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 selection:bg-white selection:text-black`}>
      {/* GRID */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${t.grid}`}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 backdrop-blur-md border-b ${t.border} transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter transition-transform hover:scale-110">ALX</button>
        <nav className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through ${page === item ? 'underline underline-offset-4' : ''}`}>{item}</button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 border-2 ${t.border} hover:bg-white hover:text-black transition-all`}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* HOME */}
        {page === 'home' && (
          <div className="flex flex-col items-center space-y-20 animate-in fade-in zoom-in duration-700">
            <div className="relative group">
              <div className={`border-2 ${t.border} p-4 transition-transform duration-500 group-hover:-translate-y-2`}>
                <Corners />
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-64 h-64 md:w-80 md:h-80 object-cover grayscale brightness-110 contrast-125 group-hover:grayscale-0 transition-all duration-700" alt="Avatar" />
              </div>
            </div>
            <h1 className="text-6xl md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase italic text-center">
              ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: `1px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
            </h1>
          </div>
        )}

        {/* ABOUT */}
        {page === 'about' && (
          <div className="grid md:grid-cols-2 gap-16 animate-in slide-in-from-left duration-500">
            <div className={`p-10 border-2 ${t.border} ${t.panel} relative h-fit`}>
              <Corners />
              <div className="space-y-6 uppercase font-black text-sm tracking-widest">
                <div className="flex items-center gap-4 border-b border-current/10 pb-4"><User size={18}/><p>Alex Wondwossen</p></div>
                <div className="flex items-center gap-4 border-b border-current/10 pb-4"><MapPin size={18}/><p>Toronto, CA</p></div>
                <div className="flex items-center gap-4"><Activity size={18}/><p className="opacity-50 italic">System: Active</p></div>
              </div>
            </div>
            <div className="space-y-8 text-3xl font-light italic leading-tight">
              <p>I build digital architectures where <span className="font-black underline">raw code</span> meets industrial design.</p>
              <p>Specializing in <span className="font-black">React</span>, I design systems that prioritize performance and minimalist aesthetics.</p>
            </div>
          </div>
        )}

        {/* SKILLS (FIXED HOVER) */}
        {page === 'skills' && (
          <div className="grid md:grid-cols-3 gap-0 border-2 border-current animate-in fade-in duration-500">
            {[
              { title: 'Frontend', items: ['React.js', 'Vite', 'JavaScript', 'Tailwind'], icon: <Terminal /> },
              { title: 'Visuals', items: ['35mm Photo', 'Composition', 'Industrial UX', 'Figma'], icon: <Camera /> },
              { title: 'Systems', items: ['Logic State', 'API Sync', 'Performance', 'Node'], icon: <Layers /> }
            ].map((s, i) => (
              <div key={i} className={`p-12 border-r-2 last:border-r-0 ${t.border} group hover:bg-white transition-all duration-300`}>
                <div className="mb-8 opacity-30 group-hover:opacity-100 group-hover:text-black transition-all">{s.icon}</div>
                <h3 className="text-2xl font-black uppercase mb-8 italic group-hover:text-black transition-colors">{s.title}</h3>
                <div className="space-y-4">
                  {s.items.map(item => (
                    <div key={item} className="text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'} group-hover:bg-black`} /> {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CODE (LIVE GITHUB SYNC) */}
        {page === 'code' && (
          <div className="space-y-12 animate-in slide-in-from-right duration-500">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">Live_Repos</h2>
            {loadingRepos ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin" size={48} /></div>
            ) : (
              <div className="grid gap-4">
                {repos.map((repo) => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" 
                     className={`group p-8 border-2 ${t.border} flex justify-between items-center hover:bg-white hover:text-black transition-all duration-300 relative`}>
                    <Corners />
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter">{repo.name}</h3>
                      <p className="text-sm opacity-50 italic group-hover:text-black">{repo.description || 'No description provided.'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black border-2 border-current px-3 py-1 uppercase">{repo.language || 'Code'}</span>
                      <ExternalLink size={20} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PHOTOGRAPHY (COLOUR ON HOVER) */}
        {page === 'photography' && (
          <div className="columns-1 md:columns-3 gap-6 space-y-6 animate-in zoom-in duration-700">
            {[
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
              "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
            ].map((url, i) => (
              <div key={i} className="border-2 border-current overflow-hidden group bg-black cursor-none">
                <img src={url} className="w-full grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100" alt="Work" />
              </div>
            ))}
          </div>
        )}

        {/* CONTACT */}
        {page === 'contact' && (
          <div className="grid gap-4 animate-in slide-in-from-bottom duration-500">
            {[
              { label: 'GitHub', value: '@ALXGRAPHY', url: 'https://github.com/alxgraphy' },
              { label: 'Instagram', value: '@ALEXEDGRAPHY', url: 'https://instagram.com/alexedgraphy' },
              { label: 'Email', value: 'ALXGRAPHY@ICLOUD.COM', url: 'mailto:alxgraphy@icloud.com' }
            ].map((item, i) => (
              <a key={i} href={item.url} className={`p-12 border-2 ${t.border} flex justify-between items-center group hover:bg-white hover:text-black transition-all`}>
                <div>
                  <p className="text-[10px] font-black opacity-30 mb-2 uppercase tracking-widest">{item.label}</p>
                  <p className="text-5xl font-black italic tracking-tighter group-hover:translate-x-4 transition-transform">{item.value}</p>
                </div>
                <ArrowRight size={48} className="group-hover:rotate-45 transition-transform" />
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="py-20 px-12 border-t-2 border-current flex justify-between items-center opacity-20 text-[10px] font-black uppercase tracking-widest">
        <p>ALX_CORE_v11.0</p>
        <p>© 2026 EDITION</p>
      </footer>
    </div>
  );
}
