import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Camera, Code, Terminal, Layers, ArrowRight, 
  Github, Instagram, Mail, Activity, Cpu, Target, 
  Shield, Box, Zap, User, MapPin, Calendar, Globe, ExternalLink 
} from 'lucide-react';

/**
 * 🛠️ ALEXANDER'S MONOCHROME SYSTEM INDEX:
 * ---------------------------------------
 * 01. CONFIG & THEME ....... Line 35
 * 02. UI COMPONENTS ........ Line 70
 * 03. GLOBAL HEADER ........ Line 110
 * 04. HOME PAGE ............ Line 155
 * 05. ABOUT PAGE ........... Line 200
 * 06. SKILLS PAGE .......... Line 260
 * 07. CODE PAGE ............ Line 310
 * 08. PHOTOGRAPHY PAGE ..... Line 380
 * 09. CONTACT PAGE ......... Line 430
 * 10. FOOTER & STYLES ...... Line 480
 */

export default function App() {
  /* --- 01. CONFIG & STATE --- */
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [showNav, setShowNav] = useState(true);
  const [time, setTime] = useState(new Date());
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY < lastScrollY.current || window.scrollY < 50);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIXED THEME LOGIC
  const t = theme === 'dark' 
    ? { bg: 'bg-[#000000]', text: 'text-white', border: 'border-white', panel: 'bg-[#0a0a0a]', grid: 'opacity-[0.12]' }
    : { bg: 'bg-[#FFFFFF]', text: 'text-black', border: 'border-black', panel: 'bg-[#f5f5f5]', grid: 'opacity-[0.08]' };

  /* --- 02. REUSABLE UI COMPONENTS --- */
  
  const Corners = () => (
    <>
      <div className={`absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 ${t.border}`} />
      <div className={`absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 ${t.border}`} />
      <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 ${t.border}`} />
    </>
  );

  const DataStream = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-[8px] font-black uppercase opacity-30 tracking-[0.3em]">{label}</span>
      <span className="text-[10px] font-black uppercase tracking-widest">{value}</span>
    </div>
  );

  /* --- 03. GLOBAL HEADER --- */
  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden relative selection:bg-white selection:text-black`}>
      
      {/* BACKGROUND GRID */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${t.grid}`}>
        <svg width="100%" height="100%">
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-10 backdrop-blur-md border-b ${t.border} transition-transform duration-700 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-12">
          <button onClick={() => setPage('home')} className="text-5xl font-black italic tracking-tighter hover:scale-105 transition-transform">ALX</button>
          <div className="hidden lg:flex gap-12 border-l border-current/20 pl-12">
            <DataStream label="OS" value="STARK_v10" />
            <DataStream label="LOC" value="TORONTO_CA" />
            <DataStream label="CLOCK" value={time.toLocaleTimeString()} />
          </div>
        </div>
        
        <nav className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:line-through transition-all ${page === item ? 'underline underline-offset-8' : ''}`}>
              {item}
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 border-2 ${t.border} hover:bg-white hover:text-black transition-all`}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-56 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        
        {/* --- 04. HOME PAGE --- */}
        {page === 'home' && (
          <div className="flex flex-col items-center space-y-24 animate-in fade-in zoom-in duration-1000">
            <div className="relative group">
              <div className={`border-2 ${t.border} p-6 transition-all duration-700 group-hover:-translate-y-4 shadow-2xl bg-transparent`}>
                <Corners />
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-80 h-80 object-cover grayscale brightness-110 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700" alt="Alex" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-scan shadow-[0_0_15px_white]" />
              </div>
            </div>
            <div className="text-center space-y-12">
              <h1 className="text-8xl md:text-[14vw] font-black leading-[0.7] tracking-tighter uppercase italic">
                ALEXANDER<br/>
                <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${theme === 'dark' ? 'white' : 'black'}` }}>WONDWOSSEN</span>
              </h1>
              <p className="text-xl md:text-3xl font-light opacity-50 max-w-3xl mx-auto leading-tight italic">
                Developing digital architecture through logic and visual composition. 
              </p>
            </div>
          </div>
        )}

        {/* --- 05. ABOUT PAGE --- */}
        {page === 'about' && (
          <div className="grid lg:grid-cols-12 gap-20 animate-in slide-in-from-left duration-700">
            <div className="lg:col-span-4 space-y-10">
              <div className={`p-10 border-2 ${t.border} ${t.panel} relative`}>
                <Corners />
                <h3 className="text-[10px] font-black uppercase tracking-[0.6em] mb-10 opacity-30 italic underline">Identity_Archive</h3>
                <div className="space-y-8 font-black uppercase text-sm tracking-widest">
                  <div className="flex items-center gap-5 border-b border-current/10 pb-4"><User size={20}/><p>Alex Wondwossen</p></div>
                  <div className="flex items-center gap-5 border-b border-current/10 pb-4"><MapPin size={20}/><p>Toronto, Canada</p></div>
                  <div className="flex items-center gap-5 border-b border-current/10 pb-4"><Calendar size={20}/><p>Grade 7 / Creator</p></div>
                  <div className="flex items-center gap-5"><Activity size={20} className="animate-pulse"/><p className="opacity-40 italic">System Active</p></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-16">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter">Manifesto</h2>
              <div className="space-y-10 text-3xl font-light leading-snug opacity-80 border-l-[12px] border-current pl-12 italic">
                <p>I build digital environments where raw code meets brutalist geometry.</p>
                <p>Specializing in the <span className="font-black underline decoration-2">React ecosystem</span>, I design interfaces that prioritize performance and industrial minimalism.</p>
                <p>Street photography allows me to document urban architecture and translate those structural patterns into high-end code.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- 06. SKILLS PAGE (FIXED HOVER) --- */}
        {page === 'skills' && (
          <div className="space-y-20 animate-in fade-in duration-700">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter">Specs</h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-current">
              {[
                { title: 'Frontend', items: ['React.js', 'Vite', 'JavaScript', 'Tailwind', 'State Logic'], icon: <Terminal /> },
                { title: 'Visuals', items: ['35mm Photo', 'Lightroom', 'Geometry', 'Composition', 'Glass'], icon: <Camera /> },
                { title: 'Design', items: ['Brutalism', 'Typography', 'Figma', 'System UX', 'Prototyping'], icon: <Layers /> }
              ].map((s, i) => (
                <div key={i} className={`p-16 border-r-2 last:border-r-0 ${t.border} group hover:bg-white transition-all duration-300`}>
                  <div className={`mb-10 scale-150 origin-left opacity-30 group-hover:opacity-100 group-hover:text-black transition-all`}>{s.icon}</div>
                  <h3 className={`text-3xl font-black uppercase mb-10 italic tracking-tight group-hover:text-black transition-colors`}>{s.title}</h3>
                  <div className="space-y-5">
                    {s.items.map(item => (
                      <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 group-hover:text-black transition-all">
                        <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-white' : 'bg-black'} group-hover:bg-black`} /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 07. CODE PAGE (FIXED HOVER) --- */}
        {page === 'code' && (
          <div className="space-y-16 animate-in slide-in-from-right duration-700">
            <div className="flex justify-between items-end border-b-2 border-current pb-10">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter">Code</h2>
              <DataStream label="GIT_STATUS" value="SYNCING_CORE" />
            </div>
            <div className="grid gap-8">
              {[
                { name: 'STARK_v10', tech: 'React / Tailwind', desc: 'Monochrome high-density system architecture.' },
                { name: 'MATRIX_OS', tech: 'JavaScript / CSS', desc: 'Industrial data visualization and monitoring.' },
                { name: 'ARCHIVE_SYNC', tech: 'Node / API', desc: 'Automated photography deployment pipeline.' }
              ].map((repo, idx) => (
                <div key={idx} className={`group p-12 border-2 ${t.border} relative hover:bg-white transition-all duration-300`}>
                  <Corners />
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                    <div className="space-y-3">
                      <div className={`flex items-center gap-4 group-hover:text-black transition-colors`}><Terminal size={24} /><h3 className="text-4xl font-black italic uppercase tracking-tighter">{repo.name}</h3></div>
                      <p className={`text-lg opacity-40 italic group-hover:text-black group-hover:opacity-60 transition-all`}>{repo.desc}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-xs font-black border-2 border-current px-5 py-2 uppercase tracking-widest group-hover:text-black group-hover:border-black transition-all`}>{repo.tech}</span>
                      <a href="https://github.com/alxgraphy" className={`p-2 border-2 border-current group-hover:text-black group-hover:border-black hover:scale-110 transition-all`}><ExternalLink size={24} /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 08. PHOTOGRAPHY PAGE (FULL COLOUR ON HOVER) --- */}
        {page === 'photography' && (
          <div className="space-y-16 animate-in zoom-in duration-700">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter underline decoration-4 underline-offset-8">Archive</h2>
            <div className="columns-1 md:columns-3 gap-8 space-y-8">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg"
              ].map((url, i) => (
                <div key={i} className="relative group border-2 border-current overflow-hidden bg-black cursor-crosshair">
                  {/* Image starts grayscale, becomes full color on hover */}
                  <img src={url} className="w-full grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 ease-in-out" alt="Gallery" />
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20" />
                  <div className="absolute bottom-4 right-4 text-[8px] font-black bg-white text-black px-3 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity">DATA_UNIT_0{i}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 09. CONTACT PAGE --- */}
        {page === 'contact' && (
          <div className="max-w-5xl mx-auto space-y-24 py-10 animate-in slide-in-from-bottom duration-700">
            <h2 className="text-[15vw] font-black italic uppercase tracking-tighter leading-none text-center">Sync</h2>
            <div className="grid gap-6">
              {[
                { platform: 'GitHub', handle: '@ALXGRAPHY', url: 'https://github.com/alxgraphy' },
                { platform: 'TikTok', handle: '@ALXGRAPHY', url: 'https://tiktok.com/@alxgraphy' },
                { platform: 'Instagram', handle: '@ALEXEDGRAPHY', url: 'https://instagram.com/alexedgraphy' },
                { platform: 'E-Mail', handle: 'ALXGRAPHY@ICLOUD.COM', url: 'mailto:alxgraphy@icloud.com' }
              ].map((item, idx) => (
                <a key={idx} href={item.url} className={`p-14 border-2 ${t.border} flex justify-between items-center group relative overflow-hidden hover:bg-white hover:text-black transition-all`}>
                  <div className="z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30 mb-3">{item.platform}</p>
                    <p className="text-5xl md:text-7xl font-black italic tracking-tighter group-hover:translate-x-6 transition-transform">{item.handle}</p>
                  </div>
                  <ArrowRight size={64} className="z-10 group-hover:rotate-45 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- 10. FOOTER --- */}
      <footer className="w-full py-24 px-12 border-t-2 border-current flex flex-col md:flex-row justify-between items-center gap-16 font-black uppercase text-[10px] tracking-[0.6em] opacity-30 relative z-10">
        <div className="flex flex-col gap-2"><span>ALX_SYSTEM / TORONTO</span><span>© 2026 EDITION</span></div>
        <a href="https://github.com/alxgraphy" className="text-2xl underline underline-offset-[12px] decoration-4">ALEXANDER WONDWOSSEN</a>
        <div className="flex gap-12 text-xs"><span>GH</span><span>TT</span><span>IG</span></div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { top: 0; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan 3s linear infinite; }
        .text-transparent { -webkit-text-fill-color: transparent; }
      `}} />
    </div>
  );
}
