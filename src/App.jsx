import { useState, useEffect } from 'react';
import { Github, Mail, Camera, ExternalLink, Moon, Sun, Instagram } from 'lucide-react';

// All photos hosted on ImgBB
const allPhotoUrls = [
  'https://i.ibb.co/WNsB3Lz9/IMG-0643.jpg',
  'https://i.ibb.co/G30nS362/DSC-8615.jpg',
  'https://i.ibb.co/svWsfwt7/DSC00029.jpg',
  'https://i.ibb.co/b5N5DxLq/DSC-8612.jpg',
  'https://i.ibb.co/b5vQ4yd3/DSC-8608.jpg',
  'https://i.ibb.co/Pv8S6TC0/DSC-8605.jpg',
  'https://i.ibb.co/84Xdjn80/DSC-8580.jpg',
  'https://i.ibb.co/FbLgPdD5/DSC-8511.jpg',
  'https://i.ibb.co/21Q4DZk5/DSC-8514.jpg',
  'https://i.ibb.co/FQGZbjk/DSC-8510.jpg',
  'https://i.ibb.co/N6MWfZLH/DSC-8455.jpg',
  'https://i.ibb.co/Kc8pnvYC/DSC-8273.jpg',
  'https://i.ibb.co/4R7TgWbZ/DSC-8438.jpg',
  'https://i.ibb.co/bRKtPpwn/DSC-8259.jpg',
  'https://i.ibb.co/RTVYKck8/DSC-8171.jpg',
  'https://i.ibb.co/nMgN469P/DSC-8148.jpg',
  'https://i.ibb.co/QvkXKM73/IMG-0649.jpg',
  'https://i.ibb.co/Nk2bb8k/IMG-0645.jpg',
  'https://i.ibb.co/xqpyY01Y/DSC00063.jpg',
  'https://i.ibb.co/DHnTtg54/DSC00059.jpg',
  'https://i.ibb.co/QvJjDx5v/DSC00057.jpg',
  'https://i.ibb.co/ZRvhs3pL/DSC00052.jpg',
  'https://i.ibb.co/F1J9kF6/DSC00048.jpg',
  'https://i.ibb.co/1tc6hrHY/DSC00047.jpg',
  'https://i.ibb.co/5g2cZHM9/DSC00046.jpg',
  'https://i.ibb.co/H8fxMbC/DSC00042.jpg',
  'https://i.ibb.co/CpqfLF1X/DSC00041.jpg',
  'https://i.ibb.co/k68ndLgf/DSC00037.jpg',
  'https://i.ibb.co/hxXxhZ66/DSC00022.jpg',
  'https://i.ibb.co/gF9vT12Z/DSC00031.jpg',
  'https://i.ibb.co/pjB4LSBx/DSC-8614.jpg',
  'https://i.ibb.co/4wVmRMLZ/DSC-8617.jpg'
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

  // Handle URL routing
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
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
  };

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter(r => !r.fork));
        setForkRepos(data.filter(r => r.fork));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allPhotoUrls.length > 0) {
      const shuffled = [...allPhotoUrls].sort(() => 0.5 - Math.random());
      setRandomPhotos(shuffled.slice(0, 12));
    }
  }, []);

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
      bg: 'bg-gradient-to-br from-gray-900 via-black to-gray-900',
      text: 'text-white',
      accent: 'text-white',
      border: 'border-white',
      hoverBg: 'hover:bg-white hover:text-black',
      button: 'bg-white text-black hover:bg-black hover:text-white hover:border-white',
      card: 'bg-black/60 backdrop-blur-md border-white',
      footerBg: 'bg-black/80 backdrop-blur-md'
    }
  };

  const t = themes[theme];

  const validPages = ['home', 'about', 'skills', 'code', 'photography', 'contact'];
  const is404 = !validPages.includes(currentPage);

  const funny404Messages = [
    "Oops, that page wandered off...",
    "404: Page not found (but my excuses are)",
    "This page is on vacation. Permanently.",
    "Error 404: My bad, this doesn't exist yet",
    "You found the secret 'nothing here' page!",
    "Congrats! You broke the internet. Just kidding, this page doesn't exist.",
    "This page is in another castle",
    "Lost? Yeah, this page is too."
  ];

  const random404 = funny404Messages[Math.floor(Math.random() * funny404Messages.length)];

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-mono transition-all duration-500`}>
      
      <nav className={`fixed top-6 right-6 z-50 flex gap-4 transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <button
          onClick={() => navigate('about')}
          className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}
        >
          About
        </button>
        <button
          onClick={() => navigate('skills')}
          className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}
        >
          Skills
        </button>
        <button
          onClick={() => navigate('code')}
          className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}
        >
          Code
        </button>
        <button
          onClick={() => navigate('photography')}
          className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}
        >
          Photography
        </button>
        <button
          onClick={() => navigate('contact')}
          className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition text-sm uppercase tracking-wider font-bold`}
        >
          Contact
        </button>
        <button
          onClick={() => setTheme(theme === 'wireframe' ? 'aether' : 'wireframe')}
          className={`px-4 py-2 border-2 ${t.border} ${t.hoverBg} transition`}
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
                Hello, my name is Alexander, a passionate photographer, student and a coder 
                in grade 7 who enjoys capturing memorable and compelling moments.
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                I like experimenting with different perspectives, composition and light, 
                turning everyday scenes into visually appealing photographs.
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
                In my spare time, I practice for my next image and try to stay in the moment — 
                in school, real life or through a lens.
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
              Random selection of 12 photos • Refresh to see new ones (may be a little slow I am fixing that at the moment srry)
            </div>

            {randomPhotos.length === 0 ? (
              <div className={`text-center text-xl ${theme === 'wireframe' ? 'opacity-70' : 'opacity-80'}`}>
                No photos found. Add images to /public/photos/
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {randomPhotos.map((photo, i) => (
                  <div key={i} className={`border-2 ${t.border} overflow-hidden aspect-[4/3] ${theme === 'wireframe' ? 'bg-gray-100' : 'bg-black/50'} group`}>
                    <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
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

        {/* 404 PAGE */}
        {is404 && (
          <div className="max-w-4xl w-full text-center">
            <h2 className={`text-7xl md:text-9xl font-black uppercase tracking-tight mb-8 ${t.accent}`}>
              404
            </h2>
            <p className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6">
              {random404}
            </p>
            <p className={`text-xl mb-12 ${theme === 'wireframe' ? 'opacity-80' : 'opacity-90'}`}>
              Either you typed the wrong URL, or I forgot to build this page. Probably the first one. 
              Maybe the second. Definitely one of those.
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

      <footer className={`fixed bottom-0 left-0 right-0 ${t.footerBg} border-t-2 ${t.border} py-4 z-40`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center text-sm uppercase tracking-widest">
          <span>Made with ❤️ in Toronto, Canada 🇨🇦 by Alexander Wondwossen (</span>
          <a href="https://github.com/alxgraphy" target="_blank" rel="noopener noreferrer" className={`${t.accent} hover:opacity-70 transition`}>
            @alxgraphy
          </a>
          <span>)</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
