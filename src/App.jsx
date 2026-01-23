import React, { useState, useEffect } from 'react';
import { 
  Camera, Terminal, ArrowRight, ExternalLink, Loader2, X, Activity, 
  Database, Award, GraduationCap, Code2, Aperture, Download, Filter
} from 'lucide-react';

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
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg",
      title: "Urban_Geometry_001",
      category: "architecture",
      location: "Toronto, CA"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg",
      title: "Architectural_Study_002",
      category: "architecture",
      location: "Downtown Core"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg",
      title: "Light_Pattern_003",
      category: "abstract",
      location: "Studio"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg",
      title: "Shadow_Play_004",
      category: "abstract",
      location: "Toronto"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg",
      title: "Street_Frame_005",
      category: "street",
      location: "Queen West"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg",
      title: "Perspective_006",
      category: "architecture",
      location: "Harbourfront"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg",
      title: "Minimal_007",
      category: "abstract",
      location: "Downtown"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg",
      title: "Structural_008",
      category: "architecture",
      location: "Distillery District"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00047_hhe8vi.jpg",
      title: "Lines_009",
      category: "abstract",
      location: "Toronto"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00042_ej8fps.jpg",
      title: "Contrast_010",
      category: "street",
      location: "Downtown"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00031_j85ugd.jpg",
      title: "Reflection_011",
      category: "architecture",
      location: "Financial District"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00037_wh05kb.jpg",
      title: "Geometry_012",
      category: "abstract",
      location: "Toronto"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC00022_knc5ir.jpg",
      title: "Motion_013",
      category: "street",
      location: "Urban Core"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg",
      title: "Portrait_014",
      category: "portrait",
      location: "Studio"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8573_amb5m8.jpg",
      title: "Portrait_015",
      category: "portrait",
      location: "Studio"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8607_kuco1i.jpg",
      title: "Portrait_016",
      category: "portrait",
      location: "Studio"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8571_i6mw8o.jpg",
      title: "Portrait_017",
      category: "portrait",
      location: "Studio"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8614_miqc9h.jpg",
      title: "Portrait_018",
      category: "portrait",
      location: "Studio"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8572_sz6aer.jpg",
      title: "Portrait_019",
      category: "portrait",
      location: "Studio"
    },
    {
      url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8567_hlcana.jpg",
      title: "Portrait_020",
      category: "portrait",
      location: "Studio"
    }
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
        <meta property="og:title" content="Alexander Wondwossen - Portfolio" />
        <meta property="og:description" content="Student Developer & Photographer - Toronto" />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/198081098?v=4" />
        <meta property="og:url" content="https://thegreatportfolio.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
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
                alt="Alexander Wondwossen - Student Photographer and Developer"
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

        {page === 'about' && (
          <div className="max-w-4xl mx-auto space-y-24 animate-in slide-in-from-left duration-700">
            <div className="relative inline-block">
              <Label text="SEC_BIO_001" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">Profile</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 relative">
              <div className="space-y-8 text-xl font-light italic opacity-80 leading-snug border-l-2 border-white/10 pl-10">
                <p>Hello, my name is Alexander, a passionate photographer, student and coder in grade 7 who enjoys capturing memorable and compelling moments.</p>
                <p>I like experimenting with different perspectives, composition and light, turning everyday scenes into visually appealing portrait and landscape photographs.</p>
                <p>In my spare time, I practice for my next image and try to get in the moment no matter if it's in school, real life or in a photo.</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Label text="LOC_META_DATA" />
                <ul className="space-y-4 text-xs uppercase tracking-widest font-bold">
                  <li className="flex justify-between pb-2 border-b border-white/5"><span>Location</span><span className="text-white/40">Toronto, CA</span></li>
                  <li className="flex justify-between pb-2 border-b border-white/5"><span>Grade Level</span><span className="text-white/40">Grade 7</span></li>
                  <li className="flex justify-between pb-2 border-b border-white/5"><span>Focus Areas</span><span className="text-white/40">Photo · Code</span></li>
                  <li className="flex justify-between"><span>Equipment</span><span className="text-white/40">Nikon D3200</span></li>
                </ul>
              </div>
            </div>

            <div className="space-y-12 relative">
              <div className="relative inline-block">
                <Label text="ACHIEVEMENTS" />
                <h3 className="text-5xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                  <Award className="text-white/40" /> Awards
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white transition-all duration-500">
                  <Corners />
                  <div className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 group-hover:text-black/40">CERT_c54126</div>
                  <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-black">Canva Essentials</h4>
                  <p className="text-xs uppercase tracking-widest text-white/60 group-hover:text-black/60 mb-3">1 hour training certification</p>
                  <p className="text-[9px] tracking-widest text-white/40 group-hover:text-black/40">Issued: October 27, 2024</p>
                </div>
                <div className="group relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white transition-all duration-500">
                  <Corners />
                  <div className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 group-hover:text-black/40">CERT_372de8</div>
                  <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-black">Human-Centered Design</h4>
                  <p className="text-xs uppercase tracking-widest text-white/60 group-hover:text-black/60 mb-3">Field guide certification</p>
                  <p className="text-[9px] tracking-widest text-white/40 group-hover:text-black/40">Issued: October 26, 2024</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'education' && (
          <div className="max-w-4xl mx-auto space-y-24 animate-in slide-in-from-right duration-700">
            <div className="relative inline-block">
              <Label text="SEC_EDU_002" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter flex items-center gap-6">
                <GraduationCap size={64} className="text-white/40" /> Education
              </h2>
            </div>
            <div className="space-y-8 relative">
              <div className="p-12 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="CURRENT_ENROLLMENT" />
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter">Grade 7 Student</h3>
                      <p className="text-sm font-bold uppercase tracking-widest text-white/40 mt-2">TCDSB · Toronto, ON</p>
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">2024—2025</span>
                  </div>
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white/60">Focus Areas</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['Mathematics', 'Visual Arts', 'Computer Science', 'Photography', 'English', 'Science'].map(subject => (
                        <div key={subject} className="text-[10px] font-bold uppercase tracking-widest border border-white/10 p-3 text-center opacity-60">
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-12 border border-white/10 bg-white/[0.02] relative">
                <Label text="SELF_TAUGHT" />
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Independent Learning</h3>
                <div className="space-y-4 text-sm italic text-white/60 leading-relaxed">
                  <p>Self-taught in web development, focusing on React and modern frontend architecture. Building projects to learn design systems, responsive layouts, and user experience principles.</p>
                  <p>Developing photography skills through practice and experimentation with composition, lighting, and post-processing techniques using Adobe Lightroom.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'skills' && (
          <div className="max-w-6xl mx-auto space-y-24 animate-in fade-in duration-500">
            <div className="relative inline-block">
              <Label text="SEC_SKL_003" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">Capability</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-0 border border-white/10 relative">
              <Label text="VAR_STACK_ARRAY" />
              {[
                { title: 'Development', items: ['React / Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js / Express'], icon: <Terminal /> },
                { title: 'Optical_Kit', items: ['Nikon D3200', '55mm Prime', 'Adobe Lightroom', 'Manual Exposure'], icon: <Camera /> },
                { title: 'Design', items: ['Figma Basics', 'Brutalist UX', 'Component Systems', 'Typography'], icon: <Code2 /> }
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

        {page === 'code' && (
          <div className="space-y-24 animate-in slide-in-from-bottom duration-700">
            <div className="relative inline-block">
              <Label text="SEC_LIB_004" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">Library</h2>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white/60">Featured Projects</h3>
              <div className="grid md:grid-cols-2 gap-6 relative">
                {featuredProjects.map((project) => (
                  <div key={project.id} 
                    className="group relative p-12 border border-white/10 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500">
                    <Corners />
                    <div className="flex justify-between items-start mb-12">
                      <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 group-hover:text-black/40">FEATURED</span>
                      <Database size={14} className="opacity-20 group-hover:opacity-100" />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{project.name}</h3>
                    <p className="text-xs opacity-60 group-hover:text-black/60 mb-6">{project.description}</p>
                    <div className="text-[10px] font-bold uppercase tracking-widest group-hover:text-black/60 mb-6">
                      {project.language}
                    </div>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" 
                       className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                      View Live <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center gap-4 text-white/40">
                <Loader2 className="animate-spin" /> Loading repositories...
              </div>
            ) : error ? (
              <div className="p-12 border border-white/10 bg-white/[0.02] text-white/40">
                <p className="text-xs uppercase tracking-widest">Error loading repositories: {error}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white/60">All Repositories</h3>
                <div className="grid md:grid-cols-2 gap-6 relative">
                  <Label text="REPO_FETCH_JSON" />
                  {repos.map((repo) => (
                    <button key={repo.id} onClick={() => setSelectedProject(repo)} 
                      className="group relative p-12 border border-white/10 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500 text-left">
                      <Corners />
                      <div className="flex justify-between items-start mb-12">
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 group-hover:text-black/40">NODE_{repo.id.toString().slice(-4)}</span>
                        <Database size={14} className="opacity-20 group-hover:opacity-100" />
                      </div>
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{repo.name}</h3>
                      <p className="text-xs opacity-60 group-hover:text-black/60 mb-4 line-clamp-2">{repo.description || 'No description available'}</p>
                      <div className="text-[10px] font-bold uppercase tracking-widest group-hover:text-black/60">
                        {repo.language || 'Multiple'} · {repo.stargazers_count} stars
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {page === 'photography' && (
          <div className="space-y-24 animate-in zoom-in-95 duration-700">
            <div className="relative inline-block">
              <Label text="SEC_OPT_005" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">Optics</h2>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setPhotoFilter(cat)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      photoFilter === cat 
                        ? 'bg-white text-black border-white' 
                        : 'border-white/20 text-white/60 hover:border-white/60'
                    }`}>
                    <Filter size={10} className="inline mr-2" />
                    {cat}
                  </button>
                ))}
              </div>
              <button onClick={downloadAllPhotos}
                className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-all flex items-center gap-2">
                <Download size={12} /> Download All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              <Label text="GRID_RENDER_v1" />
              {filteredPhotos.map((photo, i) => (
                <button key={i} onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-[4/5] border border-white/10 bg-black overflow-hidden">
                  {!imagesLoaded[photo.url] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="animate-spin text-white/20" size={32} />
                    </div>
                  )}
                  <img src={photo.url} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" 
                    alt={`${photo.title} - ${photo.location}`}
                    loading="lazy"
                    onLoad={() => setImagesLoaded(prev => ({...prev, [photo.url]: true}))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/60">
                        <Aperture size={12} /> {photo.category}
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest">{photo.title}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'contact' && (
          <div className="max-w-5xl mx-auto space-y-24 py-10 animate-in slide-in-from-bottom duration-500">
            <div className="relative text-center">
              <Label text="SEC_SYNC_006" className="left-1/2 -translate-x-1/2" />
              <h2 className="text-[12vw] font-black italic uppercase tracking-tighter leading-none">Sync</h2>
            </div>
            <div className="grid gap-4 relative">
              <Label text="ACTIVE_PROTOCOLS" />
              {[
                { label: 'Mail', value: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com' },
                { label: 'GitHub', value: 'alxgraphy', url: 'https://github.com/alxgraphy' },
                { label: 'Instagram', value: 'alexedgraphy', url: 'https://instagram.com/alexedgraphy' },
                { label: 'TikTok', value: 'alxgraphy', url: 'https://tiktok.com/@alxgraphy' }
              ].map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer" 
                   className="group p-10 border border-white/10 flex justify-between items-center hover:bg-white hover:text-black transition-all duration-500">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 group-hover:text-black/40">{item.label}</span>
                  <p className="text-2xl md:text-5xl font-black italic tracking-tighter">
                    {item.label} <span className="text-white/20 group-hover:text-black/20 mx-2">·</span> {item.value}
                  </p>
                  <ArrowRight size={32} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in">
          <div className="relative w-full max-w-2xl border border-white/10 bg-black p-12">
            <Corners />
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-all" aria-label="Close modal"><X size={24}/></button>
            <div className="space-y-8">
              <Label text="NODE_INSPECT" />
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">{selectedProject.name}</h2>
              <p className="text-xl font-light italic text-white/60">{selectedProject.description || "No description provided for this repository."}</p>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest flex-wrap">
                <span className="px-4 py-2 border border-white/20 text-white/60">{selectedProject.language || 'Multiple'}</span>
                <span className="px-4 py-2 border border-white/20 text-white/60">★ {selectedProject.stargazers_count}</span>
                <span className="px-4 py-2 border border-white/20 text-white/60">Forks: {selectedProject.forks_count}</span>
              </div>
              <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-between border border-white/20 px-8 py-5 hover:bg-white hover:text-black transition-all group">
                <span className="font-bold uppercase text-[10px] tracking-widest">Access_Repository</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedPhoto(null)} className="absolute -top-12 right-0 text-white/40 hover:text-white transition-all" aria-label="Close photo"><X size={24}/></button>
            <div className="relative border border-white/10 bg-black p-4">
              <Corners />
              <img src={selectedPhoto.url} 
                className="w-full h-auto" 
                alt={`${selectedPhoto.title} - ${selectedPhoto.location}`}
              />
              <div className="mt-6 p-6 border-t border-white/10 space-y-4">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">{selectedPhoto.title}</h3>
                <div className="grid md:grid-cols-2 gap-4 text-xs uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-3">
                    <Aperture size={16} className="text-white/40" />
                    <span className="text-white/60">{selectedPhoto.category}</span>
                  </div>
                  <div className="text-white/60">Location: {selectedPhoto.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
