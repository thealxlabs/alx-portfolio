import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram, Code, Palette, Smartphone, Globe, Layout, Database } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('wireframe');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- TIME LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const getFormattedTime = () => {
    return currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // --- NAVIGATION ---
  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    setCurrentPage(path);
    const handlePopState = () => setCurrentPage(window.location.pathname.slice(1) || 'home');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    window.scrollTo(0, 0);
  };

  // --- GITHUB FETCH ---
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data.filter(r => !r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- THEME DEFINITIONS ---
  const themes = {
    wireframe: {
      bg: 'bg-white',
      text: 'text-black',
      accent: 'text-black',
      border: 'border-black',
      hoverBg: 'hover:bg-black',
      hoverText: 'hover:text-white',
      button: 'bg-black text-white hover:bg-white hover:text-black',
      card: 'bg-white border-black'
    },
    aether: {
      bg: 'bg-black',
      text: 'text-white',
      accent: 'text-white',
      border: 'border-white',
      hoverBg: 'hover:bg-white',
      hoverText: 'hover:text-black',
      button: 'bg-white text-black hover:bg-black hover:text-white hover:border-white',
      card: 'bg-black border-white'
    }
  };

  const t = themes[theme];

  // --- LANDING PAGE ---
  if (!hasEntered && (currentPage === 'home' || currentPage === '')) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} font-mono flex items-center justify-center px-6`}>
        <div className="max-w-4xl w-full text-center space-y-12">
          <h1 className="text-9xl font-black uppercase tracking-tighter">WELCOME</h1>
          <div className={`border-t-4 border-b-4 ${t.border} py-8`}>
            <p className="text-4xl font-bold uppercase tracking-widest">ALEXANDER'S PORTFOLIO</p>
          </div>
          <div className="text-3xl font-light italic">
            {getGreeting()}, it is currently {getFormattedTime()} in Toronto.
          </div>
          <button 
            onClick={() => setHasEntered(true)} 
            className={`px-24 py-10 border-8 ${t.border} ${t.button} text-4xl uppercase font-black transition-all hover:scale-110 active:scale-95 mt-12 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.2)]`}
          >
            INITIALIZE →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500`}>
      
      {/* HOME BUTTON (LEFT CORNER) */}
      <button 
        onClick={() => navigate('home')}
        className={`fixed top-8 left-8 z-50 text-5xl font-black transition-all hover:scale-110 active:scale-90 ${t.text}`}
      >
        A.
      </button>

      {/* NAVIGATION BAR */}
      <nav className={`fixed top-8 right-8 z-50 flex gap-4 transition-all duration-500 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
        <button onClick={() => navigate('about')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>About</button>
        <button onClick={() => navigate('skills')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>Skills</button>
        <button onClick={() => navigate('code')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>Code</button>
        <button onClick={() => navigate('photography')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>Photography</button>
        <button onClick={() => navigate('contact')} className={`px-6 py-3 border-2 ${t.border} transition-all text-sm uppercase font-black ${t.hoverBg} ${t.hoverText}`}>Contact</button>
        <button onClick={() => setTheme(theme === 'wireframe' ? 'aether' : 'wireframe')} className={`px-6 py-3 border-2 ${t.border} transition-all ${t.hoverBg} ${t.hoverText}`}>
          {theme === 'wireframe' ? <Moon size={22} /> : <Sun size={22} />}
        </button>
      </nav>

      <div className="min-h-screen flex flex-col items-center justify-center px-10 pt-40 pb-32">
        
        {/* HOME SECTION - PHOTO FIXED */}
        {currentPage === 'home' && (
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-20 items-center">
            <div className={`relative border-[12px] ${t.border} shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] dark:shadow-[30px_30px_0px_0px_rgba(255,255,255,1)]`}>
              {/* Using your high-quality Cloudinary photo for the homepage */}
              <img 
                src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg" 
                alt="Alexander" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-2 font-black italic text-2xl uppercase tracking-widest">Toronto Based</div>
            </div>
            <div className="space-y-10">
              <h1 className="text-[10rem] font-black uppercase leading-[0.8] tracking-tighter">ALEX<br/>ANDER</h1>
              <p className="text-3xl font-bold border-l-[16px] border-red-600 pl-8 py-2">GRADE 7 • DEVELOPER • PHOTOGRAPHER</p>
              <p className="text-2xl opacity-90 leading-relaxed font-medium">
                I am a student and a coder who enjoys capturing the silent stories of Toronto through a lens. 
                I believe coding is the architecture of the mind, and photography is the architecture of the moment.
              </p>
              <button onClick={() => navigate('about')} className={`px-12 py-6 border-4 ${t.border} font-black uppercase text-xl ${t.hoverBg} ${t.hoverText} transition-all`}>Read Biography</button>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        {currentPage === 'about' && (
          <div className="max-w-5xl w-full space-y-16">
            <h2 className="text-8xl font-black uppercase italic tracking-widest underline decoration-red-600 underline-offset-[20px]">Biography</h2>
            <div className={`border-[10px] ${t.border} p-16 space-y-12 text-3xl font-medium leading-relaxed`}>
              <p>I am Alexander. I'm a 12-year-old developer and photographer currently living and studying in Toronto.</p>
              <p>My journey in development began with a fascination for design and logic. I spend my time exploring React, building functional user interfaces, and learning the intricacies of modern web architecture.</p>
              <p>Photography is my second language. It allows me to freeze time and observe the city in a way that code cannot. By combining these two passions, I strive to create digital and visual art that resonates with people.</p>
            </div>
          </div>
        )}

        {/* SKILLS SECTION - BREATHING ROOM ADDED */}
        {currentPage === 'skills' && (
          <div className="max-w-7xl w-full space-y-32 py-20">
            <h2 className="text-[9rem] font-black uppercase text-center tracking-tighter">Capabilities</h2>
            
            <div className="space-y-40"> {/* Massive spacing between sections */}
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <Code size={120} className="text-red-600 justify-self-center" />
                <div className="space-y-6">
                  <h3 className="text-6xl font-black uppercase underline decoration-8 decoration-red-600">Development</h3>
                  <p className="text-2xl font-bold opacity-80 uppercase tracking-widest leading-loose">
                    React.js • Vite • JavaScript ES6+ • Tailwind CSS • Git • GitHub • Node.js • NPM
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-20 items-center">
                <div className="space-y-6 text-right order-2 md:order-1">
                  <h3 className="text-6xl font-black uppercase underline decoration-8 decoration-blue-600">Photography</h3>
                  <p className="text-2xl font-bold opacity-80 uppercase tracking-widest leading-loose">
                    Street Photography • Manual Exposure • Adobe Lightroom • Composition • Visual Storytelling • Architecture
                  </p>
                </div>
                <Camera size={120} className="text-blue-600 justify-self-center order-1 md:order-2" />
              </div>

              <div className="grid md:grid-cols-2 gap-20 items-center">
                <Layout size={120} className="text-green-600 justify-self-center" />
                <div className="space-y-6">
                  <h3 className="text-6xl font-black uppercase underline decoration-8 decoration-green-600">Design</h3>
                  <p className="text-2xl font-bold opacity-80 uppercase tracking-widest leading-loose">
                    UI/UX • Wireframing • Typography • Color Theory • Responsive Layouts • Minimalism
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CODE SECTION - IMPROVED FOR THEME */}
        {currentPage === 'code' && (
          <div className="max-w-7xl w-full space-y-20">
            <h2 className="text-8xl font-black uppercase italic underline decoration-blue-600">Repositories</h2>
            <div className="grid md:grid-cols-1 gap-12">
              {repos.map(repo => (
                <div key={repo.id} className={`border-[10px] ${t.border} ${t.card} p-16 group transition-all duration-500 ${t.hoverBg}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-4">
                      <h3 className={`text-6xl font-black uppercase transition-colors duration-500 ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                        {repo.name}
                      </h3>
                      <p className={`text-2xl transition-colors duration-500 ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                        {repo.description || 'A comprehensive repository showcasing advanced programming concepts and clean code architecture.'}
                      </p>
                    </div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`text-3xl font-black px-10 py-5 border-4 transition-all ${theme === 'aether' ? 'group-hover:bg-black group-hover:text-white group-hover:border-black' : 'group-hover:bg-white group-hover:text-black group-hover:border-white'} ${t.border}`}
                    >
                      VIEW REPO
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY - COLLAGE STYLE */}
        {currentPage === 'photography' && (
          <div className="max-w-7xl w-full space-y-16">
            <h2 className="text-8xl font-black uppercase italic underline decoration-green-600">The Gallery</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {/* Manually placed for collage effect */}
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005836/IMG_0649_jmyszm.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/IMG_0645_b679gp.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00059_qk2fxf.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005835/DSC00063_zkhohb.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005830/DSC00057_tbjyew.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00041_ufimhg.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00046_yxqzyw.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00052_qngaw6.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00047_hhe8vi.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005829/DSC00042_ej8fps.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00031_j85ugd.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005828/DSC00037_wh05kb.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC00022_knc5ir.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8617_wpcutg.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
              <img src="https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8573_amb5m8.jpg" className={`border-8 ${t.border} w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl`} />
            </div>
          </div>
        )}

        {/* CONTACT SECTION */}
        {currentPage === 'contact' && (
          <div className="max-w-6xl w-full text-center space-y-24">
            <h2 className="text-9xl font-black uppercase italic tracking-tighter">Connect</h2>
            <div className="flex flex-col gap-12 text-5xl font-black underline decoration-[12px]">
              <a href="mailto:alxgraphy@icloud.com" className="hover:italic hover:translate-x-10 transition-transform inline-block">EMAIL</a>
              <a href="https://github.com/alxgraphy" target="_blank" className="hover:italic hover:translate-x-10 transition-transform inline-block">GITHUB</a>
              <a href="https://instagram.com/alxgraphy" target="_blank" className="hover:italic hover:translate-x-10 transition-transform inline-block">INSTAGRAM</a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
