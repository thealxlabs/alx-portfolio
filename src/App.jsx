import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Camera, Code, Terminal, Frame, Layers, ArrowRight, Github, Instagram, Mail, Activity, Cpu, Target, Hash, Shield, Box, Zap } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [showNav, setShowNav] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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

  const t = theme === 'light' 
    ? { bg: 'bg-[#F4F4F5]', text: 'text-black', border: 'border-black', accent: 'text-blue-600', panel: 'bg-white', grid: 'opacity-[0.05]' }
    : { bg: 'bg-[#000000]', text: 'text-white', border: 'border-[#27272A]', accent: 'text-blue-500', panel: 'bg-[#09090B]', grid: 'opacity-[0.15]' };

  const CornerBrackets = () => (
    <>
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-current" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-current" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-current" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-current" />
    </>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-colors duration-500 overflow-x-hidden relative selection:bg-blue-600 selection:text-white`}>
      
      {/* BACKGROUND ARCHITECTURE */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${t.grid}`}>
        <svg width="100%" height="100%">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* COMMAND HEADER */}
      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-8 backdrop-blur-xl border-b ${t.border} transition-transform duration-700 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-10">
          <button onClick={() => setPage('home')} className="text-4xl font-black italic tracking-tighter hover:skew-x-12 transition-transform">ALX.</button>
          <div className="hidden lg:flex gap-10 border-l border-white/10 pl-10 items-center">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase opacity-40 font-bold tracking-[0.3em]">System Core</span>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest animate-pulse">Online</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] uppercase opacity-40 font-bold tracking-[0.3em]">Coordinates</span>
              <span className="text-[10px] font-black uppercase tracking-widest font-mono">43.6N / 79.3W</span>
            </div>
          </div>
        </div>
        
        <nav className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em]">
          {['about', 'skills', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => setPage(item)} className={`hover:text-blue-500 transition-all ${page === item ? 'text-blue-500 border-b border-blue-500' : ''}`}>
              {item}
            </button>
          ))}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 border ${t.border} hover:bg-white hover:text-black transition-all`}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-20 px-8 md:px-12 max-w-[1400px] mx-auto">
        
        {/* HOME SECTION: TACTICAL INTERFACE */}
        {page === 'home' && (
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-1 border border-blue-500/30 bg-blue-500/5 text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em]">
                <Activity size={12} className="animate-pulse" /> Verified Developer Build v9.0.4
              </div>
              <h1 className="text-7xl md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase italic">
                ALEXANDER<br/><span className="text-transparent border-text-white" style={{ WebkitTextStroke: '1px currentColor' }}>WONDWOSSEN</span>
              </h1>
              <p className="text-xl md:text-3xl font-light opacity-60 max-w-2xl leading-tight">
                Engineering digital architecture through <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-4">Logic</span> and <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-4">Composition</span>. Grade 7 student based in Toronto.
              </p>
              <div className="flex gap-6">
                <button onClick={() => setPage('skills')} className="px-10 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(37,99,235,0.3)]">View Matrix</button>
                <button onClick={() => setPage('photography')} className={`px-10 py-4 border ${t.border} text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all`}>Open Archives</button>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="absolute -top-10 -right-10 opacity-20 rotate-12"><Target size={120}/></div>
              <div className={`relative z-10 border-2 ${t.border} p-5 ${t.panel} transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4`}>
                <CornerBrackets />
                <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400 opacity-0 group-hover:opacity-100 group-hover:animate-scan shadow-[0_0_10px_#60a5fa]" />
              </div>
              {/* Offset shadow border */}
              <div className={`absolute top-0 left-0 w-full h-full border-2 border-blue-600/30 translate-x-4 translate-y-4 -z-0`} />
            </div>
          </div>
        )}

        {/* SKILLS SECTION: TECH SPEC GRID */}
        {page === 'skills' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10">
            <div className="flex justify-between items-end border-b border-white/10 pb-8">
              <h2 className="text-6xl font-black italic uppercase tracking-tighter">System Specs</h2>
              <div className="flex gap-4 opacity-20"><Shield size={20} /><Box size={20} /><Zap size={20} /></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Frontend Logic', 
                  desc: 'High-performance UI engineering.',
                  list: ['React.js / Hooks', 'Vite 5.0', 'JavaScript ES6+', 'Tailwind CSS', 'Component Architecture'], 
                  icon: <Terminal className="text-blue-500" /> 
                },
                { 
                  title: 'Visual Assets', 
                  desc: 'Geometric urban documentation.',
                  list: ['35mm Film Simulation', 'Manual Exposure', 'Adobe Lightroom', 'Street Photometry', 'Spatial Geometry'], 
                  icon: <Camera className="text-orange-500" /> 
                },
                { 
                  title: 'Interface Design', 
                  desc: 'Industrial UX Patterns.',
                  list: ['Future Patterns UI', 'Typography Hierarchy', 'Technical Prototyping', 'Figma Mastery', 'Aero-Brutalist UX'], 
                  icon: <Layers className="text-white" /> 
                }
              ].map((s, i) => (
                <div key={i} className={`p-10 border-2 ${t.border} ${t.panel} relative group overflow-hidden transition-all hover:border-blue-500`}>
                  <CornerBrackets />
                  <div className="mb-8 p-3 bg-white/5 inline-block">{s.icon}</div>
                  <h3 className="text-2xl font-black uppercase mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-8 italic">{s.desc}</p>
                  <div className="space-y-4">
                    {s.list.map(item => (
                      <div key={item} className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all">
                        <div className="w-1.5 h-1.5 bg-blue-500 rotate-45" /> {item}
                      </div>
                    ))}
                  </div>
                  {/* Decorative number */}
                  <div className="absolute -bottom-6 -right-6 text-9xl font-black opacity-[0.03] group-hover:opacity-[0.08] transition-all">0{i+1}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY: TACTICAL ARCHIVE */}
        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in duration-700">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-white/10 pb-8">
              <div>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter">Capture_Index</h2>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.5em] mt-2">Visual Archiving Process // Active</p>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-10 border border-white/20 flex items-center justify-center text-[10px] font-black italic">RAW</div>
                <div className="h-10 w-10 border border-white/20 flex items-center justify-center text-[10px] font-black italic">JPG</div>
                <div className="h-10 border border-orange-500 px-4 flex items-center justify-center text-[10px] font-black italic text-orange-500 uppercase tracking-widest">Selected</div>
              </div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00047_hhe8vi.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00042_ej8fps.jpg"
              ].map((url, i) => (
                <div key={i} className={`relative border border-white/10 group overflow-hidden bg-black`}>
                  <img src={url} className="w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-orange-500 opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20" />
                  <div className="absolute bottom-4 left-4 text-[8px] font-black bg-orange-600 text-white px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">FILE: TOR_ARCHIVE_{i+100}</div>
                  {/* Decorative brackets on hover */}
                  <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT SECTION: DATA SYNC */}
        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-24 py-10 animate-in slide-in-from-bottom duration-700">
            <div className="text-center space-y-6">
              <h2 className="text-[14vw] font-black italic uppercase tracking-tighter leading-none">Inquiry</h2>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.8em] animate-pulse">Syncing Communication Channels</p>
            </div>
            <div className="grid gap-6">
              {[
                { label: 'Source', handle: '@alxgraphy', platform: 'GitHub', url: 'https://github.com/alxgraphy' },
                { label: 'Media', handle: '@alxgraphy', platform: 'TikTok', url: 'https://tiktok.com/@alxgraphy' },
                { label: 'Studio', handle: '@alexedgraphy', platform: 'Instagram', url: 'https://instagram.com/alexedgraphy' },
                { label: 'Direct', handle: 'alxgraphy@icloud.com', platform: 'E-Mail', url: 'mailto:alxgraphy@icloud.com' }
              ].map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" className={`p-12 border-2 ${t.border} flex justify-between items-center group relative overflow-hidden transition-all hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black`}>
                  <div className="relative z-10 flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40">{item.platform} // {item.label}</span>
                    <span className="text-4xl md:text-5xl font-black italic tracking-tighter group-hover:translate-x-4 transition-transform">{item.handle}</span>
                  </div>
                  <ArrowRight size={40} className="relative z-10 group-hover:rotate-45 transition-transform" />
                  {/* Glitch bar effect */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 group-hover:w-full group-hover:opacity-5 transition-all duration-500" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* TACTICAL FOOTER */}
      <footer className={`w-full py-20 px-8 md:px-12 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-16 font-black uppercase text-[10px] tracking-[0.5em] relative z-10`}>
        <div className="flex flex-col gap-2">
          <span>ALX_ARCHIVE / TORONTO</span>
          <span className="opacity-40 text-[8px]">Protocol: Grade 7 Developer // 2026 Edition</span>
        </div>
        <div className="flex flex-col items-center group">
          <div className="flex gap-3 mb-4">
            <div className="w-12 h-1 bg-blue-600/30" /><div className="w-12 h-1 bg-orange-600/30" /><div className="w-12 h-1 bg-white/30" />
          </div>
          <a href="https://github.com/alxgraphy" target="_blank" className="text-xl underline decoration-blue-600 underline-offset-8 hover:skew-x-12 transition-transform">Alexander Wondwossen</a>
        </div>
        <div className="flex gap-10 opacity-60">
          {['GH', 'TT', 'IG'].map(s => <span key={s} className="hover:text-blue-500 cursor-pointer">{s}</span>)}
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2.5s linear infinite;
        }
        .border-text-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
      `}} />
    </div>
  );
}
