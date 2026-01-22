import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Smartphone, Globe, Layout, Database, ArrowRight, Clock, MapPin } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('classic'); 
  const [repos, setRepos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- CLOCK & GREETING LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getFormattedTime = () => {
    return currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // --- SCROLL HEADER LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // --- NAVIGATION ---
  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    setCurrentPage(path);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    window.scrollTo(0, 0);
  };

  // --- GITHUB FETCH ---
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setRepos(data.filter(r => !r.fork)); });
  }, []);

  const themes = {
    classic: {
      bg: 'bg-[#FDFCF8]', 
      text: 'text-[#1A1A1A]', 
      border: 'border-[#1A1A1A]',
      accent: 'bg-[#1A1A1A] text-[#FDFCF8]',
      card: 'bg-white border-[#1A1A1A]',
      footer: 'border-t border-[#1A1A1A]'
    },
    midnight: {
      bg: 'bg-[#0F1111]', 
      text: 'text-[#F2F2F2]',
      border: 'border-[#F2F2F2]',
      accent: 'bg-[#F2F2F2] text-[#0F1111]',
      card: 'bg-[#1A1A1A] border-[#F2F2F2]',
      footer: 'border-t border-[#F2F2F2]'
    }
  };

  const t = themes[theme];

  // --- LANDING SCREEN (OLD MONEY + LIFE) ---
  if (!hasEntered && currentPage === 'home') {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col items-center justify-center font-serif px-6`}>
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="text-xs uppercase tracking-[0.6em] opacity-60 mb-4">{getGreeting()} — Toronto, Canada</div>
          <h1 className="text-[10vw] font-light leading-none tracking-tighter italic border-b border-black pb-4">Alexander</h1>
          <div className="text-4xl font-light tracking-widest uppercase opacity-80">{getFormattedTime()}</div>
          <button 
            onClick={() => setHasEntered(true)} 
            className={`mt-12 group relative px-16 py-5 border ${t.border} uppercase text-[10px] tracking-[0.5em] transition-all hover:invert`}
          >
            Enter the Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-serif selection:bg-black selection:text-white transition-colors duration-700`}>
      
      {/* HEADER LOGIC */}
      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-12 py-8 transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => navigate('home')} className="text-4xl font-light italic tracking-tighter hover:scale-110 transition-transform">A.</button>
        <nav className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.4em]">
          {['about', 'skills', 'code', 'photography', 'contact'].map(item => (
            <button key={item} onClick={() => navigate(item)} className="hover:italic hover:opacity-50 transition-all">{item}</button>
          ))}
          <button onClick={() => setTheme(theme === 'classic' ? 'midnight' : 'classic')} className="ml-4">
            {theme === 'classic' ? <Moon size={14} strokeWidth={1} /> : <Sun size={14} strokeWidth={1} />}
          </button>
        </nav>
      </header>

      <main className="pt-40 pb-20 px-12">
        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="flex flex-col items-center">
              <div className="relative group mb-16">
                <div className={`border ${t.border} p-3 transition-transform duration-1000 group-hover:rotate-[10deg] shadow-2xl`}>
                  <img 
                    src="https://avatars.githubusercontent.com/u/198081098?v=4" 
                    alt="Alexander" 
                    className="w-96 h-96 object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
                  />
                </div>
                <div className={`absolute -bottom-6 -right-12 ${t.accent} px-8 py-3 text-[10px] uppercase tracking-[0.5em] shadow-lg`}>
                  Toronto Based / Grade 7
                </div>
              </div>
              <h1 className="text-[15vw] font-light leading-[0.7] text-center tracking-tighter mb-12">ALEXANDER</h1>
              <div className="flex gap-10 opacity-60 text-xs uppercase tracking-widest">
                <span className="flex items-center gap-2"><MapPin size={12}/> Toronto, ON</span>
                <span className="flex items-center gap-2"><Clock size={12}/> {getFormattedTime()}</span>
              </div>
            </div>

            <div className={`grid md:grid-cols-2 gap-20 py-20 border-y ${t.border}`}>
              <div className="space-y-6">
                <h3 className="text-xs uppercase tracking-[0.5em] opacity-50">Current Focus</h3>
                <p className="text-3xl leading-snug">Architecting clean digital systems and capturing the raw geometry of urban environments through a 35mm lens.</p>
              </div>
              <div className="space-y-6 text-right">
                <h3 className="text-xs uppercase tracking-[0.5em] opacity-50">Identity</h3>
                <p className="text-3xl leading-snug font-light italic">"A balance of technical precision and visual empathy."</p>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto space-y-20 py-10">
            <h2 className="text-8xl font-light italic tracking-tighter text-center">The Narrative</h2>
            <div className="space-y-12 text-2xl font-light leading-relaxed">
              <p>I am Alexander Wondwossen. A 12-year-old developer and visual artist based in Toronto. I treat code like a structural material and photography like a poetic one.</p>
              <p>What started as a curiosity about the mechanics of the web turned into a deep obsession with the React ecosystem, Tailwind CSS, and the philosophy of minimalist design.</p>
              <p>My work is a continuous exploration of the spaces between logic and art. I believe that the most powerful tools are the ones that feel invisible to the user, yet perform with absolute reliability.</p>
              <div className="pt-12 border-t border-black opacity-20"></div>
              <p className="text-4xl italic font-light">"Simplicity is the ultimate sophistication."</p>
            </div>
          </div>
        )}

        {/* SKILLS SECTION */}
        {currentPage === 'skills' && (
          <div className="max-w-7xl mx-auto space-y-32">
            <h2 className="text-8xl font-light italic text-center">Technical Stack</h2>
            <div className="grid md:grid-cols-3 border ${t.border}">
              <div className={`p-20 border-r border-b ${t.border} space-y-8`}>
                <Code size={40} strokeWidth={1} className="opacity-40" />
                <h3 className="text-2xl uppercase tracking-widest">Engineering</h3>
                <ul className="space-y-4 text-xs uppercase tracking-[0.2em] opacity-70">
                  <li>React.js & Vite</li>
                  <li>JavaScript (ES6+)</li>
                  <li>Tailwind CSS</li>
                  <li>NPM Architecture</li>
                  <li>Git Version Control</li>
                </ul>
              </div>
              <div className={`p-20 border-r border-b ${t.border} space-y-8`}>
                <Camera size={40} strokeWidth={1} className="opacity-40" />
                <h3 className="text-2xl uppercase tracking-widest">Visuals</h3>
                <ul className="space-y-4 text-xs uppercase tracking-[0.2em] opacity-70">
                  <li>Manual Exposure</li>
                  <li>Adobe Lightroom</li>
                  <li>Composition Theory</li>
                  <li>Color Grading</li>
                  <li>Street Photography</li>
                </ul>
              </div>
              <div className={`p-20 border-b ${t.border} space-y-8`}>
                <Layout size={40} strokeWidth={1} className="opacity-40" />
                <h3 className="text-2xl uppercase tracking-widest">Design</h3>
                <ul className="space-y-4 text-xs uppercase tracking-[0.2em] opacity-70">
                  <li>Minimalism</li>
                  <li>Typography Flow</li>
                  <li>UI/UX Hierarchy</li>
                  <li>Wireframing</li>
                  <li>Geometric Balance</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY GALLERY */}
        {currentPage === 'photography' && (
          <div className="max-w-7xl mx-auto space-y-20">
            <h2 className="text-8xl font-light italic tracking-tighter">The Gallery</h2>
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
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00042_ej8fps.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00031_j85ugd.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00037_wh05kb.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC00022_knc5ir.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8573_amb5m8.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8607_kuco1i.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8571_i6mw8o.jpg",
                "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8614_miqc9h.jpg"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden border border-black group">
                  <img src={url} className="w-full grayscale hover:grayscale-0 hover:scale-110 transition-all duration-1000 cursor-crosshair" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT SECTION */}
        {currentPage === 'contact' && (
          <div className="max-w-5xl mx-auto py-20 text-center space-y-32">
            <h2 className="text-[12vw] font-light italic leading-none tracking-tighter">Inquiries</h2>
            <div className="grid md:grid-cols-3 gap-12 text-xs uppercase tracking-[0.5em]">
              <a href="mailto:alxgraphy@icloud.com" className="p-10 border border-black hover:invert transition-all">Email</a>
              <a href="https://github.com/alxgraphy" target="_blank" className="p-10 border border-black hover:invert transition-all">GitHub</a>
              <a href="https://instagram.com/alxgraphy" target="_blank" className="p-10 border border-black hover:invert transition-all">Instagram</a>
            </div>
          </div>
        )}
      </main>

      {/* SIGNATURE FOOTER */}
      <footer className={`w-full py-20 px-12 mt-20 ${t.footer} flex flex-col md:flex-row justify-between items-center opacity-40 text-[9px] uppercase tracking-[0.4em]`}>
        <div>Toronto, Canada 🇨🇦</div>
        <div className="text-center my-6 md:my-0">
          Made with ❤️ by Alexander Wondwossen (<a href="https://github.com/alxgraphy" target="_blank" className="underline hover:opacity-100">@alxgraphy</a>)
        </div>
        <div>© 2024 All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default App;
