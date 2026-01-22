import { useState, useEffect } from 'react';
import { Github, Mail, Moon, Sun } from 'lucide-react';

/* --- PHOTOS CONFIGURATION --- */
const allPhotoUrls = [
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
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005821/DSC_8614_miqc9h.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8572_sz6aer.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8567_hlcana.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005820/DSC_8565_v8k0ih.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005819/DSC_8554_mpcap8.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005816/DSC_8553_x5flqg.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005815/DSC_8552_xq0gpt.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005814/DSC_8548_z6x97g.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005814/DSC_8551_voipzu.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005813/DSC_8547_gfaa2p.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005813/DSC_8546_kh0mhr.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005813/DSC_8545_dweztf.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005809/DSC_8544_mcdmeu.jpg",
  "https://res.cloudinary.com/dyjibiyac/image/upload/v1769005805/DSC_8477_l3dxys.jpg"
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('wireframe');
  const [repos, setRepos] = useState([]);
  const [forkRepos, setForkRepos] = useState([]); // Kept variable even if unused
  const [loading, setLoading] = useState(true);
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [captchaClicks, setCaptchaClicks] = useState(0);
  const [katMemes, setKatMemes] = useState([]);
  const [katLoading, setKatLoading] = useState(true);
  const [lastCatSource, setLastCatSource] = useState(null);

  const catSources = ['catmemes', 'cats', 'IllegallySmolCats', 'MEOW_IRL', 'CatsAreAssholes'];
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Time and Date
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
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // URL Handling
  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    setCurrentPage(path);
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || 'home';
      setCurrentPage(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // RICKROLL REDIRECT
  useEffect(() => {
    if (currentPage === 'rickroll') {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  }, [currentPage]);

  const navigate = (page) => {
    if (page === 'kat') {
      setKatMemes([]);
      setCurrentPage('');
      setTimeout(() => setCurrentPage('kat'), 0);
    } else {
      setCurrentPage(page);
    }
    // Fix: Ensures back button works
    const newPath = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', newPath);
    setCaptchaClicks(0);
  };

  // Fetch Repos
  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter(r => !r.fork));
          setForkRepos(data.filter(r => r.fork));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Shuffle Photos
  useEffect(() => {
    if (allPhotoUrls.length > 0) {
      const shuffled = [...allPhotoUrls].sort(() => 0.5 - Math.random());
      setRandomPhotos(shuffled.slice(0, 12));
    }
  }, []);

  // Fetch Kat Memes
  useEffect(() => {
    if (currentPage !== 'kat') return;
    setKatLoading(true);
    let randomSource;
    do {
      randomSource = catSources[Math.floor(Math.random() * catSources.length)];
    } while (randomSource === lastCatSource && catSources.length > 1);
    setLastCatSource(randomSource);
    fetch(`https://meme-api.com/gimme/${randomSource}/15`)
      .then(res => res.json())
      .then(data => {
        setKatMemes(data.memes || []);
        setKatLoading(false);
      })
      .catch(() => setKatLoading(false));
  }, [currentPage]);

  // Scroll Nav Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const aboutMePhoto = '/pic/me.jpeg';
  const avatarUrl = 'https://avatars.githubusercontent.com/u/198081098?v=4';

  /* --- THEME FIXES HERE --- */
  const themes = {
    wireframe: {
      bg: 'bg-white',
      text: 'text-black',
      accent: 'text-black',
      border: 'border-black',
      hoverBg: 'hover:bg-black',
      hoverText: 'hover:text-white', // Added
      button: 'bg-black text-white hover:bg-white hover:text-black',
      card: 'bg-white border-black',
      footerBg: 'bg-white'
    },
    aether: {
      bg: 'bg-black',
      text: 'text-white',
      accent: 'text-white',
      border: 'border-white',
      hoverBg: 'hover:bg-white',
      hoverText: 'hover:text-black', // Added
      button: 'bg-white text-black hover:bg-black hover:text-white hover:border-white',
      card: 'bg-black border-white',
      footerBg: 'bg-black'
    }
  };

  const t = themes[theme];

  const validPages = [
    'home', 'about', 'skills', 'code', 'photography', 'contact',
    'secret', 'admin', 'rickroll', 'source', 'coffee', 'old', 'test', 'terminal',
    'glowup', 'sus', 'void', 'winner', 'captcha', 'cringe', 'timbits', 'hackerman',
    'skillissue', 'delete', 'ratio', 'mid', 'touchgrass', 'no-bitches', 'pain',
    'foreveralone', 'invisible', 'kat'
  ];

  const is404 = !validPages.includes(currentPage);
  const funny404Messages = [
    "Oops, that page wandered off... probably chasing clout. Skill issue.",
    "404: Page not found (but my excuses are premium). Cope harder.",
    "Page.exe has stopped responding. Classic skill issue detected.",
    "This is what happens when you type random stuff. Natural consequences."
  ];

  const [random404, setRandom404] = useState('');
  useEffect(() => {
    if (is404) {
      setRandom404(funny404Messages[Math.floor(Math.random() * funny404Messages.length)]);
    }
  }, [is404]);

  const hideUIpages = ['rickroll', 'terminal', 'void', 'pain'];

  // LANDING PAGE
  if (!hasEntered && (currentPage === 'home' || currentPage === '')) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} font-mono flex items-center justify-center px-6`}>
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${t.accent} animate-pulse`}>
            WELCOME
          </h1>
          <p className="text-3xl md:text-4xl font-bold">TO ALEXANDER'S PORTFOLIO</p>
          <div className={`text-xl md:text-2xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
            {getGreeting()}, it's {getFormattedTime()}
          </div>
          <button
            onClick={() => setHasEntered(true)}
            className={`px-16 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110 mt-12`}
          >
            LET'S GO →
          </button>
          <div className={`text-sm uppercase tracking-widest mt-8 ${theme === 'wireframe' ? 'opacity-50' : 'opacity-60'}`}>
            Grade 7 • Toronto • Developer & Photographer
          </div>
        </div>
      </div>
    );
  }

  // VOID PAGE RENDER (Special case for hidden page)
  if (currentPage === 'void') {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <h1 className="text-4xl animate-pulse">YOU ARE IN THE VOID. TURN BACK.</h1>
      </div>
    );
  }

  // TERMINAL PAGE RENDER (Special case)
  if (currentPage === 'terminal') {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-10">
        <p>User@Alexander-Portfolio ~ % echo "Hello World"</p>
        <p>Hello World</p>
        <p className="animate-pulse">_</p>
      </div>
    );
  }

  // PAIN PAGE RENDER (Special case)
  if (currentPage === 'pain') {
    return (
      <div className="min-h-screen bg-red-600 text-white font-black text-9xl flex items-center justify-center uppercase">
        PAIN
      </div>
    );
  }

  // MAIN LAYOUT
  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500`}>
      {!hideUIpages.includes(currentPage) && (
        <>
          <nav className={`fixed top-6 right-6 z-50 flex gap-4 transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
            {['about', 'skills', 'code', 'photography', 'contact'].map((pg) => (
              <button 
                key={pg} 
                onClick={() => navigate(pg)} 
                className={`px-4 py-2 border-2 ${t.border} transition text-sm uppercase tracking-wider font-bold ${t.hoverBg} ${t.hoverText}`}
              >
                {pg.charAt(0).toUpperCase() + pg.slice(1)}
              </button>
            ))}
            <button 
              onClick={() => setTheme(theme === 'wireframe' ? 'aether' : 'wireframe')} 
              className={`px-4 py-2 border-2 ${t.border} transition ${t.hoverBg} ${t.hoverText}`}
            >
              {theme === 'wireframe' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </nav>
          <button
            onClick={() => navigate('home')}
            className={`fixed top-6 left-6 z-50 text-2xl font-black uppercase tracking-widest ${t.accent} hover:opacity-70 transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
          >
            A.
          </button>
        </>
      )}

      <div className="min-h-screen flex items-center justify-center px-6 pb-24 pt-32">
        {/* HOME */}
        {currentPage === 'home' && (
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            <div className={`border-4 ${t.border} overflow-hidden shadow-2xl`}>
              <img
                src={aboutMePhoto}
                alt="Alexander"
                onError={(e) => { e.target.onerror = null; e.target.src = avatarUrl; }}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-6">
              <h1 className={`text-6xl md:text-7xl font-black uppercase tracking-tight ${t.accent}`}>
                ALEXANDER
              </h1>
              <div className={`text-sm uppercase tracking-widest ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                Grade 7 • Toronto • Developer & Photographer
              </div>
              <p className={`text-xl md:text-2xl leading-relaxed ${theme === 'wireframe' ? 'opacity-90' : 'opacity-95'}`}>
                Hello, my name is Alexander, a passionate photographer, student and a coder in grade 7 who enjoys capturing memorable and compelling moments.
              </p>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {currentPage === 'about' && (
          <div className="max-w-6xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>ABOUT ME</h2>
            <div className={`border-2 ${t.border} ${t.card} p-8`}>
              <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>WHO I AM</h3>
              <p className="text-lg leading-relaxed">Hello, my name is Alexander. I’m a Grade 7 student, coder, and passionate photographer who enjoys turning ideas into projects and capturing memorable moments.</p>
            </div>
          </div>
        )}

        {/* SKILLS */}
        {currentPage === 'skills' && (
          <div className="max-w-6xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>SKILLS</h2>
            <div className={`border-2 ${t.border} ${t.card} p-8`}>
              <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>DEVELOPMENT</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['HTML/CSS', 'JavaScript', 'React', 'Tailwind', 'Git', 'GitHub', 'Vite', 'VS Code'].map(skill => (
                  <div key={skill} className={`border-2 ${t.border} p-4 text-center ${t.hoverBg} ${t.hoverText} transition`}>
                    <div className="text-xl font-bold">{skill}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY */}
        {currentPage === 'photography' && (
          <div className="max-w-7xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>PHOTOGRAPHY</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {randomPhotos.map((url, i) => (
                <div key={i} className={`border-2 ${t.border} overflow-hidden rounded-lg`}>
                  <img src={url} alt={`Photo ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CODE */}
        {currentPage === 'code' && (
          <div className="max-w-7xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>PROJECTS</h2>
            <div className="space-y-8">
              {repos.map(repo => (
                <div key={repo.id} className={`border-2 ${t.border} ${t.card} p-8 transition-all duration-300 group ${t.hoverBg}`}>
                  <h3 className={`text-3xl font-black uppercase tracking-tight mb-3 ${t.accent} transition-colors duration-300 ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                    {repo.name}
                  </h3>
                  <p className={`text-base mb-4 transition-colors duration-300 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'} ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                    {repo.description || 'No description provided.'}
                  </p>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 underline transition-colors duration-300 ${t.accent} ${theme === 'aether' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                    <Github size={18} /> View Repo
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KAT MEMES */}
        {currentPage === 'kat' && (
          <div className="max-w-7xl w-full py-20">
             <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>MEME VAULT</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {katLoading ? <div className="text-2xl">Loading cats...</div> : katMemes.map((meme, i) => (
                   <div key={i} className={`border-2 ${t.border} p-2`}>
                      <img src={meme.url} alt="Meme" className="w-full h-auto" />
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* CONTACT */}
        {currentPage === 'contact' && (
          <div className="max-w-4xl w-full">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>LET'S CONNECT</h2>
            <div className={`border-2 ${t.border} ${t.card} p-12`}>
              <div className="space-y-8">
                <div>
                  <h3 className={`text-sm uppercase tracking-widest mb-4 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>EMAIL</h3>
                  <a href="mailto:alxgraphy@icloud.com" className={`flex items-center gap-3 text-2xl ${t.accent} hover:opacity-70 transition group`}>
                    <Mail size={28} />
                    <span className="group-hover:translate-x-2 transition">alxgraphy@icloud.com</span>
                  </a>
                </div>
                <div>
                  <h3 className={`text-sm uppercase tracking-widest mb-4 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>GITHUB</h3>
                  <a href="https://github.com/alxgraphy" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-2xl ${t.accent} hover:opacity-70 transition group`}>
                    <Github size={28} />
                    <span className="group-hover:translate-x-2 transition">github.com/alxgraphy</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GENERIC HIDDEN PAGE RENDERER (For things like 'mid', 'ratio', etc.) */}
        {(!is404 && !['home', 'about', 'skills', 'code', 'photography', 'contact', 'kat'].includes(currentPage)) && (
          <div className="text-center py-20">
            <h1 className="text-6xl font-black uppercase">SECRET FOUND: {currentPage}</h1>
            <button onClick={() => navigate('home')} className={`mt-8 px-8 py-4 border-2 ${t.border} uppercase font-bold`}>
              Return Home
            </button>
          </div>
        )}

        {/* 404 PAGE */}
        {is404 && (
          <div className="text-center space-y-8">
            <h1 className="text-9xl font-black">404</h1>
            <p className="text-2xl">{random404}</p>
            <button onClick={() => navigate('home')} className={`border-2 ${t.border} px-8 py-4 uppercase font-bold ${t.hoverBg} ${t.hoverText} transition`}>
              Back to Safety
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
