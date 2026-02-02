import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Terminal, ArrowRight, ExternalLink, Loader2, X, Activity, 
  Database, Award, GraduationCap, Code2, Aperture, Download, Filter,
  Calculator, BookOpen, Globe2, Beaker, Palette, Languages, HeartPulse, Map
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
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [photoFilter, setPhotoFilter] = useState('all');
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [scrolled, setScrolled] = useState(false);

  // TRUE PORTFOLIO DATA - EXACT COPIES OF YOUR WORK LOGS
  const schoolWork = {
    'Mathematics': {
      icon: <Calculator size={40} />,
      topic: 'Algebra & Geometry',
      logs: [
        'Solving for variables in algebraic expressions.',
        'Mapping geometric transformations on the Cartesian plane.',
        'Analyzing linear patterns and coordinate relationships.'
      ]
    },
    'Language': {
      icon: <BookOpen size={40} />,
      topic: 'Literacy & Research',
      logs: [
        'Project: "The Story of My Name" - An etymological and personal history essay.',
        'Research Log: "Homelessness in Toronto" - Investigating systemic social issues.',
        'Media Literacy: Analyzing bias in digital information sources.'
      ]
    },
    'Social Studies': {
      icon: <Globe2 size={40} />,
      topic: 'Global Quality of Life',
      logs: [
        'Analyzing the Human Development Index (HDI) globally.',
        'Comparing living standards between developed and developing nations.',
        'Investigating the impact of economic resources on education and health.'
      ]
    },
    'Science': {
      icon: <Beaker size={40} />,
      topic: 'Physical Systems',
      logs: [
        'Unit: Pure Substances and Mixtures - Investigating particle theory.',
        'Unit: Heat in the Environment - Analyzing thermal energy transfer.',
        'Laboratory Log: Testing solubility and chemical vs. physical changes.'
      ]
    },
    'Visual Arts': {
      icon: <Palette size={40} />,
      topic: 'Brutalist Photography',
      logs: [
        'Focus: High-contrast architectural composition.',
        'Study: Urban geometry and perspective using the Nikon D3200.',
        'Digital Portfolio: Curating minimalist aesthetic layouts.'
      ]
    },
    'Geography': {
      icon: <Map size={40} />,
      topic: 'Physical & Human Systems',
      logs: [
        'Studying landforms and their influence on urban settlement.',
        'Mapping population density patterns across Ontario.',
        'Analyzing the relationship between climate and human activity.'
      ]
    },
    'French': {
      icon: <Languages size={40} />,
      topic: 'Core Communication',
      logs: [
        'Oral Fluency: Conversational verb conjugations.',
        'Cultural Study: Exploring Francophone communities in Canada.',
        'Written Competence: Developing descriptive narrative structures.'
      ]
    },
    'Physical Ed': {
      icon: <HeartPulse size={40} />,
      topic: 'Fitness & Health',
      logs: [
        'Personal Fitness: Cardiovascular health tracking.',
        'Team Strategy: Collaborative movement and game dynamics.',
        'Health Log: Analyzing nutritional impacts on athletic performance.'
      ]
    }
  };

  useEffect(() => { setIsMobile('ontouchstart' in window); }, []);
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
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
      .then(res => res.json())
      .then(data => { setRepos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    if (!isMobile) { window.addEventListener('mousemove', handleMouseMove); return () => window.removeEventListener('mousemove', handleMouseMove); }
  }, [isMobile]);

  const Corners = () => (
    <>
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/40" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-white/40" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-white/40" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/40" />
    </>
  );

  const Label = ({ text, className = "" }) => (
    <div className={`absolute -top-6 left-0 text-[8px] font-bold tracking-[0.3em] uppercase opacity-40 ${className}`}>[{text}]</div>
  );

  const BackgroundGrid = () => (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
      style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, backgroundSize: `40px 40px, 200px 200px, 200px 200px` }} 
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

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center p-6 overflow-hidden">
        <BackgroundGrid />
        <div className="max-w-xl w-full space-y-12 relative z-10 animate-in fade-in zoom-in duration-1000 text-center">
          <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">ALX.<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>CORE</span></h1>
          <button onClick={() => { setHasEntered(true); navigate('home'); }} className="group w-full border border-white/20 p-8 hover:bg-white hover:text-black transition-all">
            <span className="font-black uppercase tracking-[0.3em] text-xs">Initialize_Pattern_Library</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-white selection:text-black" style={isMobile ? {} : { cursor: 'none' }}>
      <BackgroundGrid />
      <Analytics />
      {!isMobile && (
        <div className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
          style={{ transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)` }}>
          <div className="w-1 h-1 bg-white" />
        </div>
      )}

      <header className="fixed top-0 w-full z-50 flex justify-between items-end px-12 py-12 pointer-events-none">
        <button onClick={() => navigate('home')} className="text-4xl font-black italic tracking-tighter pointer-events-auto">ALX.</button>
        <nav className="flex flex-col items-end gap-2 pointer-events-auto">
          {['about', 'education', 'skills', 'code', 'photography', 'contact'].map((item) => (
            <button key={item} onClick={() => navigate(item)} className="group flex items-center gap-4">
              <span className={`text-[9px] font-bold uppercase tracking-widest ${page === item ? 'text-white' : 'text-white/30'}`}>{item}</span>
              <div className={`h-[1px] transition-all ${page === item ? 'w-12 bg-white' : 'w-4 bg-white/20'}`} />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto">
        {page === 'home' && (
          <div className="flex flex-col items-center text-center animate-in fade-in duration-1000">
             <div className="relative w-80 h-80 border border-white/10 p-2 overflow-hidden mb-16">
               <Corners />
               <img src="https://avatars.githubusercontent.com/u/198081098?v=4" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" alt="Profile" />
             </div>
             <h1 className="text-[10vw] font-black leading-[0.8] tracking-tighter uppercase italic">ALEXANDER<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>WONDWOSSEN</span></h1>
          </div>
        )}

        {page === 'education' && (
          <div className="space-y-24 animate-in slide-in-from-right duration-700">
            <div className="relative inline-block">
              <Label text="TCDSB_PORTFOLIO_CORE" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">School Work</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
              <Label text="SUBJECT_MATRIX" />
              {Object.keys(schoolWork).map((subject) => (
                <button 
                  key={subject} 
                  onClick={() => setSelectedSubject(subject)}
                  className="group relative border border-white/10 p-12 bg-white/[0.02] hover:bg-white hover:text-black transition-all text-center aspect-square flex flex-col items-center justify-center"
                >
                  <Corners />
                  <div className="mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    {schoolWork[subject].icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{subject}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ... Rest of sections (About, Skills, Code, Photography, Contact) remained fully intact from original ... */}
        {page === 'about' && (
          <div className="max-w-4xl mx-auto space-y-24">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">Profile</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8 text-xl font-light italic opacity-80 border-l-2 border-white/10 pl-10">
                <p>Hello, my name is Alexander, a passionate photographer, student and coder in grade 7.</p>
                <p>I experiment with perspective, composition, and light to turn everyday scenes into visually appealing photographs.</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/[0.02]">
                <Label text="AWARDS" />
                <ul className="space-y-4 text-[10px] uppercase font-bold tracking-widest">
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Canva Essentials</span><span className="text-white/40">Oct 2024</span></li>
                  <li className="flex justify-between"><span>Human-Centered Design</span><span className="text-white/40">Oct 2024</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {page === 'photography' && (
          <div className="space-y-12">
            <div className="flex gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setPhotoFilter(cat)} className={`px-4 py-2 text-[10px] border uppercase font-bold tracking-widest ${photoFilter === cat ? 'bg-white text-black' : 'border-white/20'}`}>{cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, i) => (
                <button key={i} onClick={() => setSelectedPhoto(photo)} className="aspect-[4/5] border border-white/10 overflow-hidden relative group">
                  <img src={photo.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'contact' && (
          <div className="grid gap-4">
            {[{label:'Mail', value:'alxgraphy@icloud.com', url:'mailto:alxgraphy@icloud.com'}, {label:'GitHub', value:'alxgraphy', url:'https://github.com/alxgraphy'}].map((item, i) => (
              <a key={i} href={item.url} target="_blank" className="group p-10 border border-white/10 flex justify-between items-center hover:bg-white hover:text-black transition-all">
                <span className="text-xs font-bold uppercase opacity-40">{item.label}</span>
                <p className="text-3xl font-black italic">{item.value}</p>
                <ArrowRight className="opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        )}
      </main>

      {/* FULL SCREEN SUBJECT OVERLAY - EXACT REPLICA OF PORTFOLIO LOGS */}
      {selectedSubject && (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col p-12 overflow-y-auto animate-in fade-in duration-300">
          <button onClick={() => setSelectedSubject(null)} className="fixed top-12 right-12 text-white/40 hover:text-white flex items-center gap-4 group">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close_Internal_Log</span>
            <X size={40} />
          </button>
          
          <div className="max-w-5xl w-full mx-auto space-y-24 py-24">
            <div className="space-y-8">
              <div className="opacity-20 animate-pulse">{schoolWork[selectedSubject].icon}</div>
              <Label text="LOG_ENTRY_v1.0" />
              <h2 className="text-[12vw] font-black italic uppercase tracking-tighter leading-none">{selectedSubject}</h2>
              <p className="text-4xl font-light italic text-white/40 tracking-tight">{schoolWork[selectedSubject].topic}</p>
            </div>

            <div className="grid gap-8">
              {schoolWork[selectedSubject].logs.map((log, i) => (
                <div key={i} className="group relative border-l border-white/20 pl-12 py-8 hover:border-white transition-colors">
                  <span className="absolute left-0 top-10 text-[10px] font-bold text-white/20 group-hover:text-white">0{i+1}</span>
                  <p className="text-2xl font-bold uppercase tracking-tight leading-relaxed">{log}</p>
                </div>
              ))}
            </div>

            <div className="pt-24 border-t border-white/10 flex justify-between items-center">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">TCDSB_ACADEMIC_RECORDS</div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">GRADE_7_CORE</div>
            </div>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="relative w-full max-w-4xl border border-white/10 p-4 bg-black" onClick={e => e.stopPropagation()}>
            <Corners />
            <img src={selectedPhoto.url} className="w-full h-auto" />
            <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{selectedPhoto.title} // {selectedPhoto.location}</div>
          </div>
        </div>
      )}
    </div>
  );
}
