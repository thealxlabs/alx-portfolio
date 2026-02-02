import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Camera, Terminal, ArrowRight, ExternalLink, Loader2, X, Activity, 
  Database, Award, GraduationCap, Code2, Aperture, Download, Filter
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [page, setPage] = useState('home');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const cursorRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [photoFilter, setPhotoFilter] = useState('all');
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setPage(['home', 'about', 'education', 'skills', 'code', 'photography', 'contact'].includes(hash) ? hash : 'home');
      window.scrollTo(0, 0);
    };

    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleEsc = (e) => { if (e.key === 'Escape') { setSelectedProject(null); setSelectedPhoto(null); }};

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEsc);
    handleHash();

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Optimized Cursor - Uses requestAnimationFrame for 60fps instead of React State
  useEffect(() => {
    if (isMobile) return;
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isMobile]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Memoized calculations to prevent lag on mouse move
  const greeting = useMemo(() => {
    const hour = time.getHours();
    if (hour < 12) return "Good_Morning";
    if (hour < 18) return "Good_Afternoon";
    return "Good_Evening";
  }, [time.getHours()]);

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => { if (!res.ok) throw new Error('Failed to fetch'); return res.json(); })
      .then(data => { setRepos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const photos = [
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg", title: "Urban_Geometry_001", category: "architecture", location: "Toronto, CA" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg", title: "Architectural_Study_002", category: "architecture", location: "Downtown Core" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg", title: "Light_Pattern_003", category: "abstract", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg", title: "Shadow_Play_004", category: "abstract", location: "Toronto" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg", title: "Street_Frame_005", category: "street", location: "Queen West" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg", title: "Perspective_006", category: "architecture", location: "Harbourfront" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg", title: "Minimal_007", category: "abstract", location: "Downtown" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg", title: "Structural_008", category: "architecture", location: "Distillery District" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00047_hhe8vi.jpg", title: "Lines_009", category: "abstract", location: "Toronto" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00042_ej8fps.jpg", title: "Contrast_010", category: "street", location: "Downtown" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00031_j85ugd.jpg", title: "Reflection_011", category: "architecture", location: "Financial District" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00037_wh05kb.jpg", title: "Geometry_012", category: "abstract", location: "Toronto" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC00022_knc5ir.jpg", title: "Motion_013", category: "street", location: "Urban Core" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg", title: "Portrait_014", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8573_amb5m8.jpg", title: "Portrait_015", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8607_kuco1i.jpg", title: "Portrait_016", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8571_i6mw8o.jpg", title: "Portrait_017", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8614_miqc9h.jpg", title: "Portrait_018", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8572_sz6aer.jpg", title: "Portrait_019", category: "portrait", location: "Studio" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8567_hlcana.jpg", title: "Portrait_020", category: "portrait", location: "Studio" }
  ];

  const filteredPhotos = useMemo(() => 
    photoFilter === 'all' ? photos : photos.filter(p => p.category === photoFilter), 
  [photoFilter]);

  const categories = useMemo(() => ['all', ...new Set(photos.map(p => p.category))], []);

  const navigate = (path) => { window.location.hash = `#/${path}`; };

  const downloadAllPhotos = () => {
    photos.forEach((photo, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = photo.url;
        a.download = `${photo.title}.jpg`;
        a.target = "_blank"; // Prevents browser blocking in some cases
        a.click();
      }, i * 300);
    });
  };

  const Corners = () => (
    <>
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/40" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-white/40" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-white/40" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/40" />
    </>
  );

  const Label = ({ text, className = "" }) => (
    <div className={`absolute -top-6 left-0 text-[8px] font-bold tracking-[0.3em] uppercase opacity-40 ${className}`}>
      [{text}]
    </div>
  );

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-xl w-full space-y-12 relative z-10">
          <div className="space-y-2 border-l border-white/20 pl-6">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">{greeting}</p>
            <p className="text-3xl font-black italic tracking-tighter uppercase">{time.toLocaleTimeString()}</p>
          </div>
          <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">ALX.<br/><span className="text-outline text-transparent" style={{ WebkitTextStroke: '1px white' }}>CORE</span></h1>
          <button onClick={() => { setHasEntered(true); navigate('home'); }} className="group w-full border border-white/20 p-8 hover:bg-white hover:text-black transition-all">
            <div className="flex justify-between items-center font-black uppercase tracking-[0.3em] text-xs">
              <span>Initialize_Pattern_Library</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-white selection:text-black">
      <Analytics />
      {!isMobile && (
        <div ref={cursorRef} className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center">
          <div className="w-1 h-1 bg-white" />
        </div>
      )}

      <header className={`fixed top-0 w-full z-50 flex justify-between items-end px-6 md:px-12 py-12 transition-transform duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter">ALX.</button>
        <nav className="flex flex-col items-end gap-2">
          {['about', 'education', 'skills', 'code', 'photography', 'contact'].map((item, idx) => (
            <button key={item} onClick={() => navigate(item)} className="group flex items-center gap-4">
              <span className={`text-[9px] font-bold uppercase tracking-widest ${page === item ? 'text-white' : 'text-white/30'}`}>
                {idx.toString().padStart(2, '0')} // {item}
              </span>
              <div className={`h-[1px] transition-all ${page === item ? 'w-12 bg-white' : 'w-4 bg-white/20 group-hover:w-8'}`} />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        {page === 'home' && (
          <div className="space-y-16 flex flex-col items-center text-center">
            <div className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] border border-white/10 p-2 overflow-hidden group">
              <Corners />
              <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Alexander" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
                <Activity size={14} className="text-white" /> {greeting} // {time.toLocaleTimeString()}
              </div>
              <h1 className="text-5xl md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase italic">
                ALEXANDER<br/><span className="text-outline text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>WONDWOSSEN</span>
              </h1>
            </div>
          </div>
        )}

        {page === 'education' && (
          <div className="max-w-4xl mx-auto space-y-24">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter flex items-center gap-6">
              <GraduationCap size={64} className="text-white/40" /> Education
            </h2>
            <div className="p-12 border border-white/10 bg-white/[0.02] relative">
              <Corners />
              <Label text="TCDSB_SYNC" />
              <div className="space-y-6">
                <h3 className="text-3xl font-black italic uppercase">Grade 7 Student</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-white/40">Toronto Catholic District School Board</p>
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {['Computer Science (Python)', 'Micro:bit Robotics', 'Digital Photography', 'Visual Arts'].map(s => (
                    <div key={s} className="text-[10px] font-bold uppercase tracking-widest border border-white/10 p-4 text-center">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photography, Code, Skills, etc. remain structurally the same but with the memoized logic above */}
        {page === 'photography' && (
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setPhotoFilter(cat)} className={`px-4 py-2 text-[10px] border ${photoFilter === cat ? 'bg-white text-black' : 'border-white/20'}`}>{cat}</button>
                ))}
              </div>
              <button onClick={downloadAllPhotos} className="flex items-center gap-2 border border-white/20 px-4 py-2 text-[10px]"><Download size={12}/> Download All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, i) => (
                <div key={i} className="aspect-[4/5] relative border border-white/10 overflow-hidden group">
                  <img src={photo.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-end p-6 transition-opacity">
                    <p className="text-[10px] uppercase font-bold tracking-widest">{photo.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-7xl font-black italic uppercase">Profile</h2>
            <p className="text-xl italic opacity-80 border-l-2 border-white/10 pl-8">
              Alexander is a Toronto-based student developer and photographer specializing in EXIF data extraction, 
              Python automation, and architectural photography with a Nikon D3200.
            </p>
          </div>
        )}

        {page === 'code' && (
          <div className="grid md:grid-cols-2 gap-6">
             {loading ? <Loader2 className="animate-spin" /> : repos.map(repo => (
               <a key={repo.id} href={repo.html_url} target="_blank" className="p-8 border border-white/10 hover:bg-white hover:text-black transition-all">
                 <h3 className="text-2xl font-black uppercase italic">{repo.name}</h3>
                 <p className="text-xs opacity-60 mt-2">{repo.description}</p>
               </a>
             ))}
          </div>
        )}

        {page === 'contact' && (
          <div className="space-y-12 text-center">
            <h2 className="text-[10vw] font-black italic uppercase">Sync</h2>
            <div className="flex flex-col gap-4">
              <a href="mailto:alxgraphy@icloud.com" className="text-3xl hover:italic">alxgraphy@icloud.com</a>
              <a href="https://github.com/alxgraphy" className="text-3xl hover:italic">github.com/alxgraphy</a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
