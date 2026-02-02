import React, { useState, useEffect } from 'react';
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

  const subjectData = {
    'Math': { 
      icon: <Calculator size={32} />,
      desc: 'Algebraic expressions and Cartesian plane coordinate geometry.', 
      details: 'Current focus: Solving for variables and mapping geometric transformations in the four quadrants.' 
    },
    'Language': { 
      icon: <BookOpen size={32} />,
      desc: 'Literacy, creative writing, and social justice research.', 
      details: 'Active Projects: "The Story of My Name" personal essay and "Homelessness in Toronto" research log.' 
    },
    'Social Studies': { 
      icon: <Globe2 size={32} />,
      desc: 'Global quality of life and human development index analysis.', 
      details: 'Analyzing how economic and social factors affect living standards across different continents.' 
    },
    'Science': { 
      icon: <Beaker size={32} />,
      desc: 'Understanding pure substances, mixtures, and heat energy.', 
      details: 'Investigating particle theory and the environmental impact of thermal energy transfer.' 
    },
    'Art': { 
      icon: <Palette size={32} />,
      desc: 'Visual communication and brutalist design principles.', 
      details: 'Applying high-contrast aesthetics and minimalist layouts to digital and traditional media.' 
    },
    'Geography': { 
      icon: <Map size={32} />,
      desc: 'Physical patterns and human population distribution.', 
      details: 'Studying landforms, climate patterns, and how they influence urban development.' 
    },
    'French': { 
      icon: <Languages size={32} />,
      desc: 'Core French communication and cultural exploration.', 
      details: 'Focusing on oral fluency, verb conjugations, and Francophone culture in Canada.' 
    },
    'Phys Ed': { 
      icon: <HeartPulse size={32} />,
      desc: 'Personal fitness and team-based physical strategy.', 
      details: 'Focusing on cardiovascular health, movement skills, and collaborative sportsmanship.' 
    }
  };

  useEffect(() => {
    setIsMobile('ontouchstart' in window);
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
    <div className={`absolute -top-6 left-0 text-[8px] font-bold tracking-[0.3em] uppercase opacity-40 ${className}`}>
      [{text}]
    </div>
  );

  const photos = [
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg", title: "Urban_Geometry_001", category: "architecture", location: "Toronto, CA" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg", title: "Architectural_Study_002", category: "architecture", location: "Downtown Core" },
    { url: "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg", title: "Portrait_014", category: "portrait", location: "Studio" }
  ];

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center p-6">
        <div className="max-w-xl w-full space-y-12 relative z-10">
          <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">ALX.<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>CORE</span></h1>
          <button onClick={() => { setHasEntered(true); navigate('home'); }} className="group w-full border border-white/20 p-8 hover:bg-white hover:text-black transition-all">
            <div className="flex justify-between items-center font-black uppercase tracking-[0.3em] text-xs">
              <span>Initialize_Pattern_Library</span>
              <ArrowRight />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-white selection:text-black" style={isMobile ? {} : { cursor: 'none' }}>
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
        {page === 'education' && (
          <div className="space-y-24 animate-in slide-in-from-right duration-700">
            <div className="relative inline-block">
              <Label text="SEC_EDU_002" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter flex items-center gap-6">
                <GraduationCap size={64} className="text-white/40" /> Education
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(subjectData).map(subject => (
                <button 
                  key={subject} 
                  onClick={() => setSelectedSubject(subject)}
                  className="group relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white hover:text-black transition-all text-center"
                >
                  <Corners />
                  <div className="mb-4 opacity-40 group-hover:opacity-100 flex justify-center">
                    {subjectData[subject].icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{subject}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'skills' && (
          <div className="grid md:grid-cols-3 gap-0 border border-white/10">
            {[
              { title: 'Development', items: ['React', 'Tailwind CSS', 'Next.js'], icon: <Terminal /> },
              { title: 'Optics', items: ['Nikon D3200', 'Lightroom', 'Manual Exposure'], icon: <Camera /> },
              { title: 'Design', items: ['Brutalist UX', 'Figma', 'Typography'], icon: <Code2 /> }
            ].map((s, i) => (
              <div key={i} className="p-12 border-r border-white/10 last:border-r-0 group hover:bg-white hover:text-black transition-all">
                <div className="mb-8 opacity-40 group-hover:opacity-100">{s.icon}</div>
                <h3 className="text-2xl font-black uppercase mb-8 italic">{s.title}</h3>
                {s.items.map(item => <div key={item} className="text-[10px] font-bold uppercase tracking-widest mb-2">{item}</div>)}
              </div>
            ))}
          </div>
        )}

        {page === 'contact' && (
          <div className="grid gap-4">
            {[
              { label: 'Mail', value: 'alxgraphy@icloud.com', url: 'mailto:alxgraphy@icloud.com' },
              { label: 'GitHub', value: 'alxgraphy', url: 'https://github.com/alxgraphy' }
            ].map((item, i) => (
              <a key={i} href={item.url} target="_blank" className="group p-10 border border-white/10 flex justify-between items-center hover:bg-white hover:text-black transition-all">
                <span className="text-xs font-bold uppercase opacity-40">{item.label}</span>
                <p className="text-3xl font-black italic">{item.value}</p>
                <ArrowRight className="opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        )}
      </main>

      {selectedSubject && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setSelectedSubject(null)}>
          <div className="relative w-full max-w-xl border border-white/10 bg-black p-12" onClick={e => e.stopPropagation()}>
            <Corners />
            <button onClick={() => setSelectedSubject(null)} className="absolute top-8 right-8 text-white/40 hover:text-white"><X size={24}/></button>
            <div className="space-y-6">
              <Label text="SUBJECT_LOG" />
              <div className="opacity-40">{subjectData[selectedSubject].icon}</div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">{selectedSubject}</h2>
              <p className="text-xl font-light italic text-white/60">{subjectData[selectedSubject].desc}</p>
              <div className="p-6 border border-white/10 bg-white/[0.02]">
                <p className="text-xs uppercase tracking-[0.2em] leading-relaxed">{subjectData[selectedSubject].details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}
