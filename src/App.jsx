import React, { useState, useEffect } from 'react';
import { 
  Camera, Terminal, ArrowRight, ExternalLink, Loader2, X, Activity, 
  Database, Award, GraduationCap, Code2, Aperture, Download, Filter,
  BookOpen, Calculator, Globe2, Palette, FlaskConical, Trophy
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [photoFilter, setPhotoFilter] = useState('all');
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-5W1LZ96CQH', {
        page_path: window.location.hash
      });
    }
  }, [page]);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good_Morning";
    if (hour < 18) return "Good_Afternoon";
    return "Good_Evening";
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setPage(['home', 'about', 'education', 'skills', 'code', 'photography', 'contact'].includes(hash) ? hash : 'home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (path) => { window.location.hash = `#/${path}`; };

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
      })
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const BackgroundGrid = () => (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
      style={{ 
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: `40px 40px, 200px 200px, 200px 200px`
      }} 
    />
  );

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

  const filteredPhotos = photoFilter === 'all' ? photos : photos.filter(p => p.category === photoFilter);
  const categories = ['all', ...new Set(photos.map(p => p.category))];

  const featuredProjects = [
    {
      id: 'portfolio',
      name: 'ALX.CORE Portfolio',
      description: 'Brutalist portfolio built with React and Tailwind CSS',
      language: 'React',
      stars: 0,
      liveUrl: 'https://thegreatportfolio.vercel.app'
    }
  ];

  const downloadAllPhotos = () => {
    photos.forEach((photo, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = photo.url;
        a.download = `${photo.title}.jpg`;
        a.click();
      }, i * 200);
    });
  };

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center p-6 overflow-hidden" style={isMobile ? {} : { cursor: 'none' }}>
        <BackgroundGrid />
        <div className="max-w-xl w-full space-y-12 relative z-10 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-2 border-l border-white/20 pl-6">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">{getGreeting()}</p>
            <p className="text-3xl font-black italic tracking-tighter uppercase">{time.toLocaleTimeString()}</p>
          </div>
          <div className="space-y-4">
            <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">ALX.<br/><span className="text-outline text-transparent" style={{ WebkitTextStroke: '1px white' }}>CORE</span></h1>
          </div>
          <button onClick={() => { setHasEntered(true); navigate('home'); }} className="group w-full border border-white/20 p-8 hover:bg-white hover:text-black transition-all duration-700">
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
    <div className="min-h-screen bg-[#050505] text-white font-mono overflow-x-hidden selection:bg-white selection:text-black" style={isMobile ? {} : { cursor: 'none' }}>
      <head>
        <title>Alexander Wondwossen - Student Developer & Photographer</title>
        <meta name="description" content="Grade 7 student passionate about photography and web development. Based in Toronto, specializing in architectural photography and React development." />
      </head>
      <BackgroundGrid />
      <style>{`
        .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
      `}</style>

      {!isMobile && (
        <div className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
          style={{ transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)` }}>
          <div className="w-1 h-1 bg-white" />
        </div>
      )}

      <header className={`fixed top-0 w-full z-50 flex justify-between items-end px-6 md:px-12 py-12 pointer-events-none transition-transform duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="relative pointer-events-auto">
          <Label text="SYS_ID: 001" />
          <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter hover:opacity-60 transition-opacity">ALX.</button>
        </div>
        <nav className="flex flex-col items-end gap-2 pointer-events-auto relative">
          <Label text="INDEX_MAP" className="left-auto right-0" />
          {['about', 'education', 'skills', 'code', 'photography', 'contact'].map((item, idx) => (
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
            <div className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] border border-white/10 p-2 overflow-hidden group">
              <Label text="IMG_ASSET_MAIN" />
              <Corners />
              <img 
                src="https://avatars.githubusercontent.com/u/198081098?v=4" 
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105" 
                alt="Alexander"
                loading="eager"
              />
            </div>
            <div className="space-y-6 relative">
              <Label text="CORE_IDENT_v19.1" className="left-1/2 -translate-x-1/2" />
              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
                <Activity size={14} className="text-white" /> {getGreeting()} // {time.toLocaleTimeString()}
              </div>
              <h1 className="text-5xl md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase italic">
                ALEXANDER<br/>
                <span className="text-outline text-transparent">WONDWOSSEN</span>
              </h1>
              <p className="text-sm font-bold uppercase tracking-widest text-white/40">Grade 7 Student · Photographer · Developer</p>
            </div>
          </div>
        )}

        {page === 'education' && (
          <div className="max-w-5xl mx-auto space-y-24 animate-in slide-in-from-right duration-700">
            <div className="relative inline-block">
              <Label text="SEC_EDU_002" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter flex items-center gap-6">
                <GraduationCap size={64} className="text-white/40" /> Education
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 border border-white/10 bg-white/[0.02] relative group">
                <Corners /><Label text="TCDSB_ACADEMICS" />
                <h3 className="text-2xl font-black italic uppercase mb-6">Subject Matrix</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Mathematics', icon: <Calculator size={14} /> },
                    { name: 'Language Arts', icon: <BookOpen size={14} /> },
                    { name: 'Social Studies', icon: <Globe2 size={14} /> },
                    { name: 'Science', icon: <FlaskConical size={14} /> },
                    { name: 'Visual Arts', icon: <Palette size={14} /> },
                    { name: 'Geography', icon: <Globe2 size={14} /> },
                    { name: 'Phys Ed', icon: <Trophy size={14} /> }
                  ].map(subject => (
                    <div key={subject.name} className="flex items-center justify-between p-3 border border-white/5 text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-3">{subject.icon} {subject.name}</span>
                      <span className="text-white/20 group-hover:text-white/40">GRAD_07</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-8 border border-white/10 bg-white/[0.02] relative group">
                  <Corners /><Label text="PROJECT_LOG_LANGUAGE" />
                  <h3 className="text-2xl font-black italic uppercase mb-6">Writing & Research</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-white/10 pl-4 space-y-1">
                      <h4 className="text-sm font-black uppercase italic">Story Of My Name</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">Essay on history and etymology · Oct 2025</p>
                    </div>
                    <div className="border-l-2 border-white/10 pl-4 space-y-1">
                      <h4 className="text-sm font-black uppercase italic">Homelessness in Toronto</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest text-blue-400">Ongoing Research · Nov 2025</p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">TCDSB Mic Drop Competition Entry</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                  <Label text="SELF_TAUGHT" />
                  <h3 className="text-2xl font-black italic uppercase mb-4">Independent Learning</h3>
                  <p className="text-xs italic text-white/60 leading-relaxed">
                    Self-taught in modern frontend architecture focusing on React, Tailwind CSS, and UX systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-4xl mx-auto space-y-24 animate-in slide-in-from-left duration-700">
            <div className="relative inline-block">
              <Label text="SEC_BIO_001" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">Profile</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8 text-xl font-light italic opacity-80 leading-snug border-l-2 border-white/10 pl-10">
                <p>Hello, my name is Alexander, a passionate photographer, student and coder in grade 7 who enjoys capturing memorable and compelling moments.</p>
                <p>I like experimenting with different perspectives, composition and light, turning everyday scenes into visually appealing portrait and landscape photographs.</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Label text="LOC_META_DATA" />
                <ul className="space-y-4 text-xs uppercase tracking-widest font-bold">
                  <li className="flex justify-between pb-2 border-b border-white/5"><span>Location</span><span className="text-white/40">Toronto, CA</span></li>
                  <li className="flex justify-between pb-2 border-b border-white/5"><span>Grade Level</span><span className="text-white/40">Grade 7</span></li>
                  <li className="flex justify-between"><span>Equipment</span><span className="text-white/40">Nikon D3200</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {page === 'photography' && (
          <div className="space-y-12 animate-in zoom-in-95 duration-700">
            <div className="flex justify-between items-center">
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">Optics</h2>
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setPhotoFilter(cat)} className={`px-4 py-2 text-[10px] border ${photoFilter === cat ? 'bg-white text-black' : 'border-white/20'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, i) => (
                <button key={i} onClick={() => setSelectedPhoto(photo)} className="aspect-[4/5] relative border border-white/10 overflow-hidden group">
                  <img src={photo.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" alt={photo.title} />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-end p-6 transition-opacity">
                    <p className="text-[10px] uppercase font-bold tracking-widest">{photo.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'code' && (
          <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom duration-700">
             {loading ? <Loader2 className="animate-spin" /> : repos.map(repo => (
               <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="p-8 border border-white/10 hover:bg-white hover:text-black transition-all">
                 <h3 className="text-2xl font-black uppercase italic">{repo.name}</h3>
                 <p className="text-xs opacity-60 mt-2">{repo.description || "No description provided."}</p>
               </a>
             ))}
          </div>
        )}

        {page === 'contact' && (
          <div className="space-y-12 text-center animate-in slide-in-from-bottom duration-500">
            <h2 className="text-[12vw] font-black italic uppercase">Sync</h2>
            <div className="flex flex-col gap-4">
              <a href="mailto:alxgraphy@icloud.com" className="text-3xl hover:italic">alxgraphy@icloud.com</a>
              <a href="https://github.com/alxgraphy" className="text-3xl hover:italic">github.com/alxgraphy</a>
            </div>
          </div>
        )}
      </main>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl w-full border border-white/10 p-4 bg-black" onClick={e => e.stopPropagation()}>
            <Corners />
            <img src={selectedPhoto.url} className="w-full h-auto" alt={selectedPhoto.title} />
            <div className="p-6 border-t border-white/10 mt-4">
              <h3 className="text-2xl font-black uppercase italic">{selectedPhoto.title}</h3>
              <p className="text-xs opacity-40 uppercase tracking-widest mt-2">{selectedPhoto.location}</p>
            </div>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}
