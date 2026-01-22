import { useState, useEffect } from 'react';
import { Github, Mail, Camera, Moon, Sun, Instagram } from 'lucide-react';

// Your Cloudinary photos (unchanged)
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
  const [forkRepos, setForkRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [captchaClicks, setCaptchaClicks] = useState(0);
  const [katMemes, setKatMemes] = useState([]);
  const [katLoading, setKatLoading] = useState(true);
  useEffect(() => {
  if (currentPage === 'kat') {
    setKatLoading(true);
    fetch('https://meme-api.com/gimme/catmemes/15')
      .then(res => res.json())
      .then(data => {
        setKatMemes(data.memes); // data.memes is an array
        setKatLoading(false);
      })
      .catch(() => setKatLoading(false));
  }
}, [currentPage]);


  // ─── LANDING PAGE STATES ─────────────────────────────────────
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [captchaTarget] = useState(() => Math.floor(Math.random() * 100000) + 1);

  // Update time every second
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

  const navigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    setCaptchaClicks(0);
  };

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter(r => !r.fork));
        setForkRepos(data.filter(r => r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (allPhotoUrls.length > 0) {
      const shuffled = [...allPhotoUrls].sort(() => 0.5 - Math.random());
      setRandomPhotos(shuffled.slice(0, 12));
    }
  }, []);

useEffect(() => {
  if (currentPage === 'kat') {
    setKatLoading(true);
    fetch('https://meme-api.com/gimme/catmemes/15')
      .then(res => res.json())
      .then(data => {
        setKatMemes(data.memes || []); // assign memes directly
        setKatLoading(false);
      })
      .catch(() => setKatLoading(false));
  }
}, [currentPage]);

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

  const aboutMePhoto = '/pic/me.jpeg';
  const avatarUrl = 'https://avatars.githubusercontent.com/u/198081098?v=4';

  const themes = {
    wireframe: {
      bg: 'bg-white',
      text: 'text-black',
      accent: 'text-black',
      border: 'border-black',
      hoverBg: 'hover:bg-black hover:text-white',
      button: 'bg-black text-white hover:bg-white hover:text-black',
      card: 'bg-white border-black',
      footerBg: 'bg-white'
    },
    aether: {
      bg: 'bg-black',
      text: 'text-white',
      accent: 'text-white',
      border: 'border-white',
      hoverBg: 'hover:bg-white hover:text-black',
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
    "This page is on vacation. Permanently. Don't wait up, loser.",
    "Error 404: My bad, this doesn't exist yet. Maybe next lifetime.",
    "You found the secret 'nothing here' page! Claim your participation trophy... oh wait, there isn't one.",
    "Congrats! You broke the internet. Just kidding — this page doesn't exist. Git gud.",
    "This page is in another castle. And Mario already rage-quit.",
    "Lost? Yeah, this page is too. Touch grass and try again.",
    "404: Reality not found. Try again in another universe, maybe one with better navigation.",
    "Page.exe has stopped responding. Classic skill issue detected.",
    "We let this page go touch grass. It never came back. Ghosted.",
    "This URL took an L and deleted itself. Brutal.",
    "Error 404: Too cool for this page. Sorry not sorry.",
    "You weren't supposed to find this... or maybe you were. I'm bad at secrets and you're bad at URLs.",
    "Page not found. Have you tried yelling at your screen? Works for me.",
    "This page ghosted you. Classic 2026 energy.",
    "404: We can neither confirm nor deny the existence of this page. Plausible deniability.",
    "The page you're looking for has left the chat. Blocked and reported.",
    "Error: Page took a sick day. Or a permanent one. Who knows. Not me.",
    "You're lost and I'm judging you silently from the home page.",
    "Bold of you to assume I built that page. Zero effort was made.",
    "This is what happens when you type random stuff. Natural consequences.",
    "404 energy only. No refunds, no sympathy.",
    "The page ran away because it heard you were coming. Smart page.",
    "Plot twist: the page was never real. Mind blown.",
    "This is the part where you go back to the home page and pretend this never happened. Shhh."
  ];

  const [random404, setRandom404] = useState('');

  useEffect(() => {
    if (is404) {
      const pick = funny404Messages[Math.floor(Math.random() * funny404Messages.length)];
      setRandom404(pick);
    }
  }, [is404]); // run only when is404 changes

  const hideUIpages = ['rickroll', 'terminal', 'void', 'pain'];

  const captchaChallenges = [
    "Select all squares with traffic lights (there are none, click anyway)",
    "Are you human? Prove it by clicking this button 47 times",
    "I'm not a robot... are YOU a robot? 🤖",
    "Click if you're not a time-traveling toaster",
    "Verify you're not Canadian spam (eh?)",
    "Solve: 1+1=? (trick question, it's 11 in binary)",
    "Pick the image of a sad developer (spoiler: it's you right now)",
    "Confirm you're not here to steal my Timbits",
    "Click to prove you're not a 404 in disguise",
    "Are you worthy of seeing my code? (Answer: no)",
    "Select all images of existential dread",
    "I'm watching you... click faster",
    "CAPTCHA level: over 9000. Good luck.",
    "Click until your finger falls off",
    "Are we sure you're not a very slow bot?",
    "This is not a drill. Click or be suspected forever."
  ];

 // ─── LANDING SCREEN ──────────────────────────────────────────
// Only show intro on the root/home page (not on direct secret page URLs)
if (!hasEntered && (currentPage === 'home' || currentPage === '')) {
  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono flex items-center justify-center px-6`}>
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${t.accent} animate-pulse`}>
          WELCOME
        </h1>
        <p className="text-3xl md:text-4xl font-bold">
          TO ALEXANDER'S PORTFOLIO
        </p>
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

  // ─── MAIN PORTFOLIO ──────────────────────────────────────────
  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500`}>
      {!hideUIpages.includes(currentPage) && (
        <>
          <nav className={`fixed top-6 right-6 z-50 flex gap-4 transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
            <button onClick={() => navigate('about')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>About</button>
            <button onClick={() => navigate('skills')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>Skills</button>
            <button onClick={() => navigate('code')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>Code</button>
            <button onClick={() => navigate('photography')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>Photography</button>
            <button onClick={() => navigate('contact')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>Contact</button>
           <button onClick={() => navigate('kat')}className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}>KAT</button>


            <button onClick={() => setTheme(theme === 'wireframe' ? 'aether' : 'wireframe')} className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition`}>
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

      <div className="min-h-screen flex items-center justify-center px-6 pb-24">
        {/* HOME */}
        {currentPage === 'home' && (
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            <div className={`border-4 ${t.border} overflow-hidden shadow-2xl`}>
              <img
                src={aboutMePhoto}
                alt="Alexander"
                onError={(e) => { e.target.src = avatarUrl; }}
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
              <p className={`text-lg leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                I like experimenting with different perspectives, composition and light, turning everyday scenes into visually appealing photographs.
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                In my spare time, I practice for my next image and try to stay in the moment — in school, real life or through a lens.
              </p>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {currentPage === 'about' && (
          <div className="max-w-6xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
              ABOUT ME
            </h2>
            <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
              Grade 7 • Toronto, Canada
            </div>
            <div className="space-y-16">
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>WHO I AM</h3>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>Hello, my name is Alexander, a passionate photographer, student and a coder in grade 7 who enjoys capturing memorable and compelling moments.</p>
                  <p>I like experimenting with different perspectives, composition and light, turning everyday scenes into visually appealing photographs.</p>
                  <p>In my spare time, I practice for my next image and try to stay in the moment — in school, real life or through a lens.</p>
                </div>
              </div>
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>INTERESTS</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold uppercase mb-3">Photography</h4>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Street photography, portraits, landscapes, and experimental composition. Always looking for unique perspectives and compelling moments.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase mb-3">Coding</h4>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Building web applications, learning new frameworks, and creating tools that solve real problems. Passionate about clean, minimal design.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase mb-3">Learning</h4>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Currently exploring human-centered design, web development best practices, and advanced photography techniques.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase mb-3">Creating</h4>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Love building projects from scratch — whether it's a portfolio, a photo series, or a new web app. Always making something.
                    </p>
                  </div>
                </div>
              </div>
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>AWARDS & ACHIEVEMENTS</h3>
                <div className="space-y-6">
                  <div className={`border-l-4 ${t.border} pl-6`}>
                    <h4 className="text-xl font-bold uppercase mb-2">The Field Guide to Human-Centered Design</h4>
                    <p className={`text-sm uppercase tracking-wider mb-3 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                      Canvas • Design Certification
                    </p>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Completed comprehensive training in human-centered design principles, focusing on empathy, ideation, and iteration in the design process.
                    </p>
                  </div>
                </div>
              </div>
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>CURRENTLY</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <span className={`${t.accent} font-bold`}>→</span>
                    <span>Building this portfolio and learning React</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`${t.accent} font-bold`}>→</span>
                    <span>Practicing street photography in Toronto</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`${t.accent} font-bold`}>→</span>
                    <span>Grade 7 student, balancing school and creative projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`${t.accent} font-bold`}>→</span>
                    <span>Open to collaboration on photography or code projects</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS */}
        {currentPage === 'skills' && (
          <div className="max-w-6xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
              SKILLS
            </h2>
            <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
              Tools & technologies I work with
            </div>
            <div className="space-y-12">
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>DEVELOPMENT</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['HTML/CSS', 'JavaScript', 'React', 'Tailwind', 'Git', 'GitHub', 'Vite', 'VS Code'].map(skill => (
                    <div key={skill} className={`border-2 ${t.border} p-4 text-center ${t.hoverBg} transition`}>
                      <div className="text-xl font-bold">{skill}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>DESIGN</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['Figma', 'Adobe LR', 'UI/UX', 'Typography'].map(skill => (
                    <div key={skill} className={`border-2 ${t.border} p-4 text-center ${t.hoverBg} transition`}>
                      <div className="text-xl font-bold">{skill}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>PHOTOGRAPHY</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['Composition', 'Lighting', 'Editing', 'Street', 'Portraits', 'Landscapes'].map(skill => (
                    <div key={skill} className={`border-2 ${t.border} p-4 text-center ${t.hoverBg} transition`}>
                      <div className="text-xl font-bold">{skill}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`border-2 ${t.border} ${t.card} p-8`}>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${t.accent}`}>SOFT SKILLS</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`border-l-4 ${t.border} pl-6`}>
                    <h4 className="text-lg font-bold uppercase mb-2">Problem Solving</h4>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Breaking down complex problems into manageable pieces and finding creative solutions.
                    </p>
                  </div>
                  <div className={`border-l-4 ${t.border} pl-6`}>
                    <h4 className="text-lg font-bold uppercase mb-2">Attention to Detail</h4>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Obsessed with pixel-perfect designs and clean, readable code.
                    </p>
                  </div>
                  <div className={`border-l-4 ${t.border} pl-6`}>
                    <h4 className="text-lg font-bold uppercase mb-2">Self-Learning</h4>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Constantly exploring new technologies, frameworks, and techniques independently.
                    </p>
                  </div>
                  <div className={`border-l-4 ${t.border} pl-6`}>
                    <h4 className="text-lg font-bold uppercase mb-2">Human-Centered Design</h4>
                    <p className={`${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                      Trained in empathy-driven design thinking to create user-focused solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CODE */}
        {currentPage === 'code' && (
          <div className="max-w-7xl w-full py-20">
            <div className="mb-20">
              <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
                PROJECTS
              </h2>
              <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                Original repositories auto-updating from GitHub
              </div>
              {loading ? (
                <div className={`text-center text-xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>Loading projects...</div>
              ) : repos.length === 0 ? (
                <div className={`text-center text-xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>No projects yet.</div>
              ) : (
                <div className="space-y-8">
                  {repos.map(repo => (
                    <div key={repo.id} className={`border-2 ${t.border} ${t.card} p-8 ${t.hoverBg} transition group`}>
                      <div>
                        <h3 className={`text-3xl font-black uppercase tracking-tight mb-3 ${t.accent} group-hover:opacity-70 transition`}>
                          {repo.name}
                        </h3>
                        <p className={`text-base mb-4 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                          {repo.description || 'No description provided.'}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 underline ${t.accent} hover:opacity-70 transition`}>
                            <Github size={18} /> View Repo
                          </a>
                          {repo.homepage && (
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition">
                              → Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {forkRepos.length > 0 && (
              <div className="mt-32">
                <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
                  CONTRIBUTED TO
                </h2>
                <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                  Forked repositories
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {forkRepos.map(repo => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`border-2 ${t.border} ${t.card} p-6 ${t.hoverBg} transition group`}>
                      <h4 className={`text-xl font-bold uppercase mb-2 ${t.accent} group-hover:opacity-70 transition`}>
                        {repo.name}
                      </h4>
                      <div className={`text-sm uppercase tracking-wider ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>View →</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PHOTOGRAPHY */}
        {currentPage === 'photography' && (
          <div className="max-w-7xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
              PHOTOGRAPHY
            </h2>
            <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
              Random selection of 12 photos • Refresh to see new ones
            </div>
            {randomPhotos.length === 0 ? (
              <div className={`text-center text-xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                No photos found. Add images to /public/photos/
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {randomPhotos.map((photo, i) => (
                  <div key={i} className={`border-2 ${t.border} overflow-hidden aspect-[4/3] ${theme === 'wireframe' ? 'bg-gray-100' : 'bg-black/50'} group cursor-pointer`}>
                    <img
                      src={photo}
                      alt={`Photo ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTACT */}
        {currentPage === 'contact' && (
          <div className="max-w-4xl w-full">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
              LET'S CONNECT
            </h2>
            <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
              Reach out for collaboration
            </div>
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
                    <span className="group-hover:translate-x-2 transition">@alxgraphy</span>
                  </a>
                </div>
                <div>
                  <h3 className={`text-sm uppercase tracking-widest mb-4 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>INSTAGRAM</h3>
                  <a href="https://www.instagram.com/alexedgraphy/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-2xl ${t.accent} hover:opacity-70 transition group`}>
                    <Instagram size={28} />
                    <span className="group-hover:translate-x-2 transition">@alexedgraphy</span>
                  </a>
                </div>
                <div>
                  <h3 className={`text-sm uppercase tracking-widest mb-4 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>TIKTOK</h3>
                  <a href="https://www.tiktok.com/@alxgraphy" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-2xl ${t.accent} hover:opacity-70 transition group`}>
                    <Camera size={28} />
                    <span className="group-hover:translate-x-2 transition">@alxgraphy</span>
                  </a>
                </div>
                <div className={`pt-8 border-t-2 ${theme === 'wireframe' ? 'border-black/20' : 'border-white/20'}`}>
                  <p className={`text-lg ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                    Interested in collaboration on photography or code? Reach out anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KAT MEMES */}
        {currentPage === 'kat' && (
          <div className="max-w-7xl w-full py-20">
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tight mb-2 ${t.accent}`}>
              KAT MEMES 😼
            </h2>
            <div className={`text-sm uppercase tracking-widest mb-12 ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
              Fresh trending cat memes • Pulled live from Reddit r/catmemes • Refresh to update
            </div>

            {katLoading ? (
              <div className={`text-center text-xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                Fetching maximum cuteness...
              </div>
            ) : katMemes.length === 0 ? (
              <div className={`text-center text-xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                No kat memes right now... the cats are on strike. Try refreshing!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {katMemes.map((post, i) => (
                  <div
                    key={i}
                    className={`border-2 ${t.border} ${t.card} overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition group`}
                  >
                    <img
                      src={post.url}
                      alt={post.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <p className={`text-lg font-bold ${t.accent}`}>{post.title}</p>
                      <p className="text-sm mt-2 opacity-70">
                        {post.ups} ↑ • {post.num_comments} meows
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── ALL 25 SECRET PAGES ──────────────────────────────────────── */}

        {currentPage === 'secret' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              YOU ACTUALLY FOUND IT
            </h1>
            <p className="text-4xl md:text-6xl font-bold mb-12">
              Classified vibes activated
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Imaginary high-five ✋<br/>
              You win at guessing secret URLs.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Back to normal life
            </button>
          </div>
        )}

        {currentPage === 'admin' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              ACCESS DENIED
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-red-600">
              Nice try
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              This isn't the admin panel.<br/>
              Go back to guessing /login or /wp-admin.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Leave quietly
            </button>
          </div>
        )}

        {currentPage === 'rickroll' && (
          <div className="fixed inset-0 z-50 bg-black overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=0&loop=1&playlist=dQw4w9WgXcQ"
              title="Rickroll"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {currentPage === 'source' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              CTRL+SHIFT+I ENJOYER
            </h1>
            <p className="text-4xl md:text-6xl font-bold mb-12">
              You opened dev tools
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Respect. But there's nothing interesting here.<br/>
              Just some messy React and regrets.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Close inspector
            </button>
          </div>
        )}

        {currentPage === 'coffee' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              BUY ME A COFFEE?
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-brown-600">
              Or a double-double
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              My code runs on caffeine and bad decisions.<br/>
              One Tim Hortons coffee = one happy dev.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              No coffee for you
            </button>
          </div>
        )}

        {currentPage === 'old' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              THE DARK TIMES
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12">
              V1.0 Era
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Comic Sans everywhere.<br/>
              Center-aligned divs.<br/>
              Geocities energy.<br/>
              We don't talk about it.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Never again
            </button>
          </div>
        )}

        {currentPage === 'test' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              UNDER CONSTRUCTION
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12">
              Forever
            </p>
            <div className="text-6xl mb-8">🚧👷‍♂️💀</div>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Been "coming soon" since day one.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Leave the construction zone
            </button>
          </div>
        )}

        {currentPage === 'terminal' && (
          <div className="fixed inset-0 bg-black text-green-400 font-mono p-8 overflow-auto z-50">
            <pre className="text-xl md:text-2xl leading-relaxed">
{`alxgraphy@portfolio:~$ whoami
Alexander — 7th grader with too much React knowledge

alxgraphy@portfolio:~$ ls
procrastination.txt  talent.exe (corrupted)  timbits.jpg  regrets/

alxgraphy@portfolio:~$ sudo make me rich
sudo: make: command not found

alxgraphy@portfolio:~$ exit
You're stuck here now.`}
            </pre>
            <p className="text-4xl mt-16 animate-pulse">
              Type anything... nothing happens
            </p>
            <button
              onClick={() => navigate('home')}
              className="mt-12 px-10 py-5 bg-green-900 text-green-200 border-2 border-green-500 text-xl font-bold hover:bg-green-800 transition"
            >
              Escape terminal
            </button>
          </div>
        )}

        {currentPage === 'glowup' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              GLOW UP
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12">
              Grade 5 vs Now
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Then: stick figures and dreams<br/>
              Now: semi-working React and photos<br/>
              Big improvement? Debatable.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Back to reality
            </button>
          </div>
        )}

        {currentPage === 'sus' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              SUS
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-red-500">
              EMERGENCY MEETING
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Who typed /sus?<br/>
              You did. You're sus.<br/>
              Ejected.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Self-eject
            </button>
          </div>
        )}

        {currentPage === 'void' && (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <p className="text-5xl md:text-7xl font-mono text-gray-600 animate-pulse">
              nothing here...<br/>
              just like my motivation
            </p>
          </div>
        )}

        {currentPage === 'winner' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-bounce`}>
              WINNER WINNER
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-yellow-400">
              CHICKEN DINNER
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              You found a secret page.<br/>
              Your prize: nothing.<br/>
              But you can brag about it.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Claim fake victory
            </button>
          </div>
        )}

        {currentPage === 'captcha' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            {captchaClicks < captchaTarget ? (
              <>
                <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
                  ARE YOU A ROBOT?
                </h1>
                <p className="text-4xl md:text-6xl font-bold mb-8">
                  {captchaChallenges[Math.floor(Math.random() * captchaChallenges.length)]}
                </p>
                <button
                  onClick={() => setCaptchaClicks(c => c + 1)}
                  className={`px-16 py-8 border-4 ${t.border} ${t.button} text-3xl uppercase tracking-widest font-black transition hover:scale-110 mb-8`}
                >
                  CLICK TO PROVE
                </button>
                <p className={`text-2xl ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                  {captchaClicks} / {captchaTarget.toLocaleString()} clicks
                </p>
              </>
            ) : (
              <>
                <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
                  CAPTCHA PASSED
                </h1>
                <p className="text-5xl md:text-7xl font-bold mb-12 text-green-500">
                  (Somehow)
                </p>
                <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                  You clicked {captchaTarget.toLocaleString()} times.<br/>
                  You need help. Or a life.
                </p>
                <button
                  onClick={() => {
                    navigate('home');
                    setCaptchaClicks(0);
                  }}
                  className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
                >
                  I'm done
                </button>
              </>
            )}
          </div>
        )}

        {currentPage === 'cringe' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              CRINGE ZONE
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-red-500">
              ENTER AT OWN RISK
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Old selfies, bad captions, thirst traps from 2019.<br/>
              Why did I post that? Why are you here?
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Erase from memory
            </button>
          </div>
        )}

        {currentPage === 'timbits' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              TIMBITS REQUIRED
            </h1>
            <p className="text-5xl md:text-7xl font-bold mb-12 text-orange-500">
              EMERGENCY LEVEL: CRITICAL
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              No Timbits = no motivation.<br/>
              Send box or site stays broken.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              I ate them all
            </button>
          </div>
        )}

        {currentPage === 'hackerman' && (
          <div className="fixed inset-0 bg-black text-green-400 font-mono p-8 overflow-auto z-50">
            <pre className="text-xl md:text-2xl leading-relaxed">
{`HACKERMAN ONLINE
> scanning your soul... 420% complete
> password: timbits123
> downloading cringe folder... done

YOU HAVE BEEN HACKERMAN'D
> no escape
> enjoy your rickroll`}
            </pre>
            <p className="text-5xl mt-12 animate-pulse text-red-500">HACKED</p>
            <button
              onClick={() => navigate('home')}
              className="mt-12 px-10 py-5 bg-green-900 text-green-200 border-2 border-green-500 text-xl font-bold hover:bg-green-800 transition"
            >
              REBOOT
            </button>
          </div>
        )}

        {currentPage === 'skillissue' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              SKILL ISSUE
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-red-500">
              CONFIRMED
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              You lost because skill issue.<br/>
              Not ping. Not teammates.<br/>
              Git gud.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Uninstall
            </button>
          </div>
        )}

        {currentPage === 'delete' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              SELF DESTRUCT
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-red-600">
              10... 9... 8...
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Just kidding.<br/>
              Nothing happens.<br/>
              You're trapped here forever.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Panic button
            </button>
          </div>
        )}

        {currentPage === 'ratio' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              RATIO'D
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-red-500">
              L + RATIO
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Your post: 2 likes<br/>
              Random comment: 420k likes<br/><br/>
              Ratio'd by the internet.<br/>
              Touch grass.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Accept defeat
            </button>
          </div>
        )}

        {currentPage === 'mid' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              MID
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-yellow-500">
              OFFICIALLY MID
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Code: mid<br/>
              Photos: mid<br/>
              Everything: mid<br/><br/>
              Welcome to average town.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Stay mid
            </button>
          </div>
        )}

        {currentPage === 'touchgrass' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              TOUCH GRASS
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-green-500">
              CHALLENGE ACTIVE
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Go outside.<br/>
              Get vitamin D.<br/>
              Stop staring at this screen.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Still inside
            </button>
          </div>
        )}

        {currentPage === 'no-bitches' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              NO BI*CHES?
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-purple-500">
              SKILL ISSUE
            </p>
            <p className={`text-3xl mb-16 leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Your dating profile:<br/>
              Likes: 0<br/>
              Matches: 0<br/>
              Rizz: negative<br/><br/>
              It's not you... wait, yes it is.<br/>
              Fix that haircut. Get a personality. Touch grass.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Stay single king
            </button>
          </div>
        )}

        {currentPage === 'pain' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent} animate-pulse`}>
              P A I N
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-gray-500">
              GROWING
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Existential dread loading...<br/>
              Sad violin music in background.<br/>
              Why are we here?
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              End the pain
            </button>
          </div>
        )}

        {currentPage === 'foreveralone' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              FOREVER ALONE
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-blue-500">
              MODE
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              No friends.<br/>
              No notifications.<br/>
              Just you and existential dread.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Back to solitude
            </button>
          </div>
        )}

        {currentPage === 'invisible' && (
          <div className="max-w-4xl mx-auto py-32 text-center">
            <h1 className={`text-8xl md:text-10xl font-black uppercase tracking-tighter mb-8 ${t.accent}`}>
              INVISIBLE
            </h1>
            <p className="text-6xl md:text-8xl font-bold mb-12 text-gray-500">
              STATUS
            </p>
            <p className={`text-3xl mb-16 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              No one sees you.<br/>
              No one notices.<br/>
              You're basically a ghost.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-12 py-6 border-4 ${t.border} ${t.button} text-2xl uppercase tracking-widest font-black transition hover:scale-110`}
            >
              Stay invisible
            </button>
          </div>
        )}

        {/* 404 */}
        {is404 && (
          <div className="max-w-4xl w-full text-center">
            <h2 className={`text-7xl md:text-9xl font-black uppercase tracking-tight mb-8 ${t.accent}`}>
              404
            </h2>
            <p className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6">
              {random404}
            </p>
            <p className={`text-xl mb-12 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Either you typed the wrong URL, or I forgot to build this page.
            </p>
            <button
              onClick={() => navigate('home')}
              className={`px-8 py-4 border-2 ${t.border} ${t.button} text-sm uppercase tracking-widest font-bold transition`}
            >
              Take me home
            </button>
          </div>
        )}
      </div>

      {!hideUIpages.includes(currentPage) && (
        <footer className={`fixed bottom-0 left-0 right-0 ${t.footerBg} border-t-2 ${t.border} py-4 z-40`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center text-sm uppercase tracking-widest">
            Made with ❤️ in Toronto, Canada 🇨🇦 by Alexander Wondwossen (
            <a href="https://github.com/alxgraphy" target="_blank" rel="noopener noreferrer" className={`${t.accent} hover:opacity-70 transition`}>
              @alxgraphy
            </a>)
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
