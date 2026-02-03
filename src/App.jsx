import React, { useState, useEffect } from 'react';
import { 
  Camera, Terminal, ArrowRight, ExternalLink, Loader2, X, Activity, 
  Database, Award, GraduationCap, Code2, Aperture, Download, Filter
} from 'lucide-react';

const MATH_IMG_1 = "https://github.com/user-attachments/assets/bcb8c8c8-4c1f-4ba7-a4aa-688f4e8c514f";
const MATH_IMG_2 = "https://github.com/user-attachments/assets/0decc0ea-52b5-4ad8-89ce-8bebe6b3a6b2";
const STORY_DOC = "https://docs.google.com/document/d/1rNfHCNyB9KjKROh2_g0Hz2_70FU4GAeOEx844VV4Fuk/edit";
const HOMELESS_DOC = "https://docs.google.com/document/d/1kZLzbcLXqLunsfn6jI6U1Q8i1_IoaUXbNRVBMdeOg3E/edit";

// ─────────────────────────────────────────────
// OLD PORTFOLIO CONTENT — pulled from Google Sites
// ─────────────────────────────────────────────

// ── SOCIAL STUDIES ──
const SOCIAL_STUDIES_CONTENT = {
  projects: [
    {
      id: 'ancestry-tree',
      title: 'Ancestry_Family_Tree',
      label: 'PROJ_SS_001',
      date: 'Sep 2024',
      description: 'A presentation of my ancestry tree which includes history, a diagram and more.',
      type: 'presentation' // was a Google Slides embed — no direct link available
    }
  ],
  books: [
    {
      id: 'marrow-thieves',
      title: 'The_Marrow_Thieves',
      label: 'BOOK_SS_001',
      date: 'Jan 2025 — Ongoing',
      coverUrl: "https://lh3.googleusercontent.com/sitesv/APaQ0SSMoXY_oM5EtmN85PG94wt3Wen-4_ypgRiaY9p4Vt675_fREBSW3ybdMod4M_K0i3DvKBok49tA_RosI9KR6oKuABCV_AMdLnT9pOVY-viuoej4povEyMFvE0D9QeY9v8ULUddkQrqiEIQmQria30gBHNgAfRNs9DIUJYvsbsveIVYXL0kcAB3XskJUO1aFQm52hurEVUoPeyu5pWkWCTLpkr3LcKagpC2wN1M=w1280",
      description: null
    },
    {
      id: 'paper-cranes',
      title: 'One_Thousand_Paper_Cranes',
      label: 'BOOK_SS_002',
      date: null,
      coverUrl: "https://lh3.googleusercontent.com/sitesv/APaQ0STDOj1JDPStYTs9n_gEyrcn96eVwKdZ4Vnbv1vrKyIhZfpI4pOvAyrDbgQ_pD78yNiosoF2eLTvm_CsqvJWYqmkdP7RFaWMTW5C_HQxOmQJkPcEYW6AXrcGvUR8NXEU75mjnn2MBX8-rlh-sWvKCcOD0BcR7e_HMG296GWNS8Mo9FHq-4J-1IoI4XeajKx2KaKk0sNEttMtnbcb8_XgaYXJomAtl0P_h-hBXtk=w1280",
      description: 'Based on the true story of Sadako Sasaki, a Japanese girl living in Hiroshima who develops leukemia from the 1945 atomic bombing.'
    }
  ]
};

// ── ART ──
const ART_CONTENT = {
  pieces: [
    {
      id: 'movement-on-paper',
      title: 'Movement_On_Paper',
      label: 'ART_001',
      imgUrl: "https://lh3.googleusercontent.com/sitesv/APaQ0STEMF0pQNk8ykTWmBtoD1tPTsan_jx51b2XNOrdqbFNIhe-WD1E1Q5XMKev_csZN4K8-JtY30KzhrI_AIDXMWTDAtuaZtT85JAeeqdzMCpGSgLwAAgx4bc31p_C6bPHk-MKbOMz_fJE9zSYHc-nwUdga3PyhmC1Ev6UgocmDm7PzWbtgZX3sRG6tGTD7ZpW8pIv7h8XjYU1VIuBzGQoLcFaCH4jEhl8AocxEoY=w1280",
      description: null
    },
    {
      id: 'quilt-art',
      title: 'Quilt_Art',
      label: 'ART_002',
      imgUrl: "https://lh3.googleusercontent.com/sitesv/APaQ0SSSKF1Kw8bRWtMwjYzgMNu9FKKXuIDXvOsrcu4RDWUO89sRfwQjFhXhLzx75yNkuF5Uf2Sa2Vge4CkCqoJdcjsQolwvJ5j25hCrsS5b5XrspCf0x76WQwXzcI0ybTog1UdtlPpm9drIi282K9TuPEMD29vPZto_75ZnmYdnkl9MozFpJ9NMZAql3y9O_XspsLq-6iFFw5kH67xXCG292WxBlTYwFhUNfuskn-Q=w1280",
      description: null
    },
    {
      id: 'birthday-cards',
      title: 'Happy_Birthday_Cards',
      label: 'ART_003',
      imgUrl: "https://lh3.googleusercontent.com/sitesv/APaQ0SQlyFzmQL3QRFyA8B6FMhMozCNFsQP-wh3psWoZr9mDX8LTwWXvtBKBOIPSM-xmvTepuemsUiRpjnd9ohw_YjvPeFnh5edRn1HmvsREly9ynquz3RKcad-7Mmn1i4g4sAYiyQTMTS-gONiXkXHOCPcxUzD_O9QtZay8vJlpoQwpCCdAQJtGA-BrvfgEQezcGLVbCUQZFKAxsT4ajKZTYzBsykK6Vri8wUCB-NE=w1280",
      description: null
    },
    {
      id: 'mandela-art',
      title: 'Mandela_Art',
      label: 'ART_004',
      imgUrl: "https://lh3.googleusercontent.com/sitesv/APaQ0SQaxtwWEFRKsUvJU0cOKALsEVKrHPhmDBzCgDOmFgMLZM_OclbnXczC8Xpd-jITSzRKxXMNYoscRomW3S1tqpEYopP6nn4aWzcrvAvZdzK65GYeSiXp01eAsfjEdsWBv1y-R2IXYg6hSSBHwCb7Jn60Fn7-R3EfKwMeAWsyE8oSHCWXFmol0mn12cMDhTcSTwQbwHblfk-BxY64HgQ2LeXPp82nSNf_SJJXiZQ=w1280",
      description: null
    },
    {
      id: 'student-words',
      title: 'Student_Words',
      label: 'ART_005',
      imgUrl: "https://lh3.googleusercontent.com/sitesv/APaQ0SQdA6cMxTir93oUoFLNTVlJa6mL2_pHnslO2C5Yu2yPz2UQPfJXJ4GjzFo7ZTbG8gNHzJ6_-QoJe2HnmyjU799T6B8h5h9wXX-SCv6M5NeRKn9_4Sp_MGXxzav3Cizzug0-3f7Fpkv7X14gwJ8ObB8rkZUCEUuUbGDxdeViC3aoFJ7xa6J8-jmXg93Wc5V655mkBkx6iWBbU0mDT-Gk-JdvfMiulg_u9LiL=w1280",
      description: null
    },
    {
      id: 'indigenous-dot-painting',
      title: 'Indigenous_Dot_Painting',
      label: 'ART_006',
      subtitle: 'Art & History',
      imgUrl: "https://lh3.googleusercontent.com/sitesv/APaQ0STuWqiF39OReClckMPd_qn3rnZWeCAv8F1GNz6KvBDteoIFgUADRfmWzvpgtC8rseNN9miE4hWJwAbZz0LZA5qamtSwn_JirwEY8a-qGRthRxv-WJ9H9xyk059jzEbOuRIueOjKYkepqZVdAWm0wsv6qqcAq_keZexKRlAJ-gRCbOiUrfAkc5MBa3yP3ip3zbJCCdXK6U8DNzV7Znp1W6Seh-VE-6xoF1Gw=w1280",
      description: null
    }
  ],
  // The old site had 4 extra portrait/dot-painting images grouped together
  extraImages: [
    "https://lh3.googleusercontent.com/sitesv/APaQ0STayWiVAJaOdF5Bq08tPIHtF5lo3E_yV1QKgWrdJ64GlaVOFcsmbqe_6kajGHlogi6zRGXoftvfjrOYZkMZKYQZ0vTHwUae4T9NdjH83ft4MswbBc-32Ng3bbE8xG0ZNVZr7twaL3Xxdie1F_5rM-Yhc9gh2Qcss2TaINgZRzhDYJq1nvgw3YnqShNV2bLWXuvgyqbr9zGtY3mnVkcxj0FouAu3nkPkFQDF=w1280",
    "https://lh3.googleusercontent.com/sitesv/APaQ0SRrCxX8V1IwKBELiYKbv7iTZc_jEwjMBLvUpd1C22o2BnRvnHIHFHa3v1HihVCTz5Ygaxav1opkRIJU3RozuDLc7GLZvP6cWV2y4QOZVngzcnF4bnd_HWPW9g5IPUyCQ8FFVOPQwd_jIF6HG9K5aZH9N9svK0NqFWN0XsHgIvCsdcuCxkkKq1Qo9Nj5s1Ork44cnRa21SV16-GYkTZOVkFselED3BEk_95t6ok=w1280",
    "https://lh3.googleusercontent.com/sitesv/APaQ0STvyAgUqASS57Mf_2RiDTQm-9AZS6e6w4mnFTANbDm-mNlxH7QfsODaAQO5BiVHR2gvnYT-C6vTblR5ngHW020finZztGoA5BPQsSj3x8QJJk_pkCqoJdcjsQolwvJ5j25hCrsS5b5XrspCf0x76WQwXzcI0ybTog1UdtlPpm9drIi282K9TuPEMD29vPZto_75ZnmYdnkl9MozFpJ9NMZAql3y9O_XspsLq-6iFFw5kH67xXCG292WxBlTYwFhUNfuskn-Q=w1280",
    "https://lh3.googleusercontent.com/sitesv/APaQ0SQFF21Lc7ENTCw6uY1P3Q6LHNyg35mMrRh9VHnusoRcSp_r4ycGTnqcRPh17Mt_TyJP6BXwXcfaC7lW729rX3VJDwS74kPssqrczD_-NJYrohftIegwkgOF8jWF8gHw0HOtsQ33Z4AB8ib0KGhsYHKb2jbdsp4RTw_-Qix4mNcduOYv8feF1q2si9BXCEsVlhI=w1280"
  ]
};

// ── PHYS ED ──
const PHYS_ED_CONTENT = {
  projects: [
    {
      id: 'juggling',
      title: 'Juggling_Video',
      label: 'PE_001',
      date: 'Sep 2025',
      description: 'A video of me trying to juggle.',
      type: 'video' // Google Drive video — no direct public embed URL available
    }
  ]
};

// ── GEOGRAPHY ──
const GEOGRAPHY_CONTENT = {
  empty: true,
  note: 'Nothing here yet — content coming soon.'
};

// ── SCIENCE ──
const SCIENCE_CONTENT = {
  projects: [
    {
      id: 'roller-coaster',
      title: 'Roller_Coaster_Project',
      label: 'SCI_001',
      date: 'Sep 2025',
      description: 'A STEM roller coaster project.',
      type: 'video' // Google Drive video — no direct public embed URL available
    }
  ]
};

// ─────────────────────────────────────────────

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setIsMobile('ontouchstart' in window); }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-5W1LZ96CQH', { page_path: window.location.hash });
    }
  }, [page]);

  const getGreeting = () => {
    const h = time.getHours();
    if (h < 12) return "Good_Morning";
    if (h < 18) return "Good_Afternoon";
    return "Good_Evening";
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setPage(['home','about','education','skills','code','photography','contact'].includes(hash) ? hash : 'home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (path) => { window.location.hash = '#/' + path; };

  useEffect(() => {
    fetch('https://api.github.com/users/alxgraphy/repos?sort=updated&per_page=10')
      .then(res => { if (!res.ok) throw new Error('Failed'); return res.json(); })
      .then(data => { setRepos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
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
      if (e.key === 'Escape') { setSelectedProject(null); setSelectedPhoto(null); }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Shared UI primitives ──
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
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '40px 40px, 200px 200px, 200px 200px'
      }}
    />
  );

  // ── Photo data ──
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
    { id: 'portfolio', name: 'ALX.CORE Portfolio', description: 'Brutalist portfolio built with React and Tailwind CSS', language: 'React', stars: 0, liveUrl: 'https://thegreatportfolio.vercel.app' }
  ];

  const downloadAllPhotos = () => {
    photos.forEach((photo, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = photo.url;
        a.download = photo.title + '.jpg';
        a.click();
      }, i * 200);
    });
  };

  // ─────────────────────────────────────────────
  // ENTRY SCREEN
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // MAIN APP
  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono overflow-x-hidden selection:bg-white selection:text-black" style={isMobile ? {} : { cursor: 'none' }}>
      <BackgroundGrid />
      <style>{'.text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }'}</style>

      {/* Custom cursor */}
      {!isMobile && (
        <div className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
          style={{ transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)` }}>
          <div className="w-1 h-1 bg-white" />
        </div>
      )}

      {/* Header / Nav */}
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

      {/* ─── PAGES ─── */}
      <main className="relative z-10 pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto">

        {/* ════════════════════════════════════════ HOME ════════════════════════════════════════ */}
        {page === 'home' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col items-center text-center">
            <div className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] border border-white/10 p-2 overflow-hidden group">
              <Label text="IMG_ASSET_MAIN" />
              <Corners />
              <img src="https://avatars.githubusercontent.com/u/198081098?v=4"
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                alt="Alexander Wondwossen" loading="eager" />
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

        {/* ════════════════════════════════════════ ABOUT ════════════════════════════════════════ */}
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
              <div className="grid md:grid-cols-3 gap-6">
                <div className="group relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white transition-all duration-500">
                  <Corners />
                  <div className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 group-hover:text-black/40">CERT_c54126</div>
                  <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-black">Canva Essentials</h4>
                  <p className="text-xs uppercase tracking-widest text-white/60 group-hover:text-black/60 mb-3">1 hour training certification</p>
                  <p className="text-[9px] tracking-widest text-white/40 group-hover:text-black/40">Issued: October 27, 2025</p>
                </div>
                <div className="group relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white transition-all duration-500">
                  <Corners />
                  <div className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 group-hover:text-black/40">CERT_372de8</div>
                  <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-black">Human-Centered Design</h4>
                  <p className="text-xs uppercase tracking-widest text-white/60 group-hover:text-black/60 mb-3">Field guide certification</p>
                  <p className="text-[9px] tracking-widest text-white/40 group-hover:text-black/40">Issued: October 26, 2025</p>
                </div>
                <div className="group relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white transition-all duration-500">
                  <Corners />
                  <div className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 group-hover:text-black/40">CERT_448340</div>
                  <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-black">Google AI for K12 Educators</h4>
                  <p className="text-xs uppercase tracking-widest text-white/60 group-hover:text-black/60 mb-3">Score: 94 · Course completion</p>
                  <p className="text-[9px] tracking-widest text-white/40 group-hover:text-black/40">Issued: February 1, 2026</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════ EDUCATION ════════════════════════════════════════ */}
        {page === 'education' && (
          <div className="max-w-4xl mx-auto space-y-24 animate-in slide-in-from-right duration-700">
            <div className="relative inline-block">
              <Label text="SEC_EDU_002" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter flex items-center gap-6">
                <GraduationCap size={64} className="text-white/40" /> Education
              </h2>
            </div>

            {/* ── Current Enrollment ── */}
            <div className="space-y-8 relative">
              <div className="p-12 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="CURRENT_ENROLLMENT" />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter">Grade 7 Student</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-white/40 mt-2">TCDSB · Toronto, ON</p>
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">2024—2025</span>
                </div>
              </div>

              {/* ── MATH ── */}
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="SUB_MATH_001" />
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4">Mathematics</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">What I've Learned</p>
                <p className="text-sm text-white/60 mb-6">GCF &amp; LCM · Exponents · Prime Factors · Prime Numbers · Multiples · Negatives · Diameter</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-white/10 overflow-hidden">
                    <img src={MATH_IMG_1} alt="Math work 1" className="w-full h-auto" />
                  </div>
                  <div className="border border-white/10 overflow-hidden">
                    <img src={MATH_IMG_2} alt="Math work 2" className="w-full h-auto" />
                  </div>
                </div>
              </div>

              {/* ── LANGUAGE ── */}
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="SUB_LANG_002" />
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4">Language</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Language Projects</p>
                <div className="space-y-6 border-l-2 border-white/10 pl-6">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-bold text-white">Story of My Name</h5>
                      <span className="text-[9px] uppercase tracking-widest text-white/40">Oct 2024</span>
                    </div>
                    <p className="text-sm text-white/60 mb-3">This is an essay on the story of my name. This includes the history, the meanings and more!</p>
                    <a href={STORY_DOC} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
                      View Document <ExternalLink size={10} />
                    </a>
                  </div>
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-bold text-white">Homelessness Around Toronto</h5>
                      <span className="text-[9px] uppercase tracking-widest text-white/40">Nov 2024—Ongoing</span>
                    </div>
                    <p className="text-sm text-white/60 mb-3">This is an ongoing essay about the problems with homelessness around Toronto.</p>
                    <a href={HOMELESS_DOC} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
                      View Document <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>

              {/* ════════════════════════════════════════════════════════════════
                  SOCIAL STUDIES — content pulled from old Google Sites portfolio
                  ════════════════════════════════════════════════════════════════ */}
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="SUB_SOCST_003" />
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-6">Social Studies</h4>

                {/* Projects */}
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Projects</p>
                <div className="space-y-4 mb-8">
                  {SOCIAL_STUDIES_CONTENT.projects.map(proj => (
                    <div key={proj.id} className="border border-white/10 p-4 bg-white/[0.02]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">{proj.label}</span>
                          <h5 className="font-bold text-white mt-1">{proj.title}</h5>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-white/40">{proj.date}</span>
                      </div>
                      <p className="text-sm text-white/60">{proj.description}</p>
                      <p className="text-[9px] uppercase tracking-widest text-white/30 mt-2">Originally a Google Slides presentation — not directly embeddable</p>
                    </div>
                  ))}
                </div>

                {/* Books */}
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Books</p>
                <div className="grid grid-cols-2 gap-4">
                  {SOCIAL_STUDIES_CONTENT.books.map(book => (
                    <div key={book.id} className="border border-white/10 overflow-hidden">
                      <div className="relative">
                        <span className="absolute top-2 left-2 text-[9px] font-bold tracking-[0.2em] uppercase bg-black/60 px-2 py-1">{book.label}</span>
                        <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover" />
                      </div>
                      <div className="p-3">
                        <h5 className="font-bold text-white text-sm">{book.title}</h5>
                        {book.date && <p className="text-[9px] uppercase tracking-widest text-white/40 mt-1">{book.date}</p>}
                        {book.description && <p className="text-[9px] text-white/50 mt-2">{book.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ════════════════════════════════════════════════════════════════
                  ART — content pulled from old Google Sites portfolio
                  ════════════════════════════════════════════════════════════════ */}
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="SUB_ART_004" />
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-6">Art</h4>

                {/* Main pieces grid */}
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Art Pieces</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {ART_CONTENT.pieces.map(piece => (
                    <div key={piece.id} className="group relative border border-white/10 overflow-hidden aspect-square cursor-pointer" onClick={() => setSelectedPhoto({ url: piece.imgUrl, title: piece.title, category: 'art', location: piece.subtitle || 'Art Class' })}>
                      <img src={piece.imgUrl} alt={piece.title} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-60">{piece.label}</span>
                        <p className="text-xs font-bold uppercase tracking-widest mt-1">{piece.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Extra images (the group of 4 dot-painting extras from the old site) */}
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Grade 7 Portraits</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ART_CONTENT.extraImages.map((url, i) => (
                    <div key={i} className="group relative border border-white/10 overflow-hidden aspect-square cursor-pointer" onClick={() => setSelectedPhoto({ url, title: `Portrait_Extra_${String(i + 1).padStart(2, '0')}`, category: 'art', location: 'Art Class' })}>
                      <img src={url} alt={`Extra ${i + 1}`} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase">ART_EXTRA_{String(i + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ════════════════════════════════════════════════════════════════
                  PHYSICAL EDUCATION — content pulled from old Google Sites portfolio
                  ════════════════════════════════════════════════════════════════ */}
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="SUB_PHYSED_005" />
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-6">Physical Education</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Projects</p>
                <div className="space-y-4">
                  {PHYS_ED_CONTENT.projects.map(proj => (
                    <div key={proj.id} className="border border-white/10 p-5 bg-white/[0.02]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">{proj.label}</span>
                          <h5 className="font-bold text-white mt-1">{proj.title}</h5>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-white/40">{proj.date}</span>
                      </div>
                      <p className="text-sm text-white/60">{proj.description}</p>
                      <p className="text-[9px] uppercase tracking-widest text-white/30 mt-2">Originally a Google Drive video — not directly embeddable</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ════════════════════════════════════════════════════════════════
                  GEOGRAPHY — content pulled from old Google Sites portfolio
                  ════════════════════════════════════════════════════════════════ */}
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="SUB_GEO_006" />
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4">Geography</h4>
                <div className="border border-white/10 p-4 bg-white/[0.01]">
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">STATUS_EMPTY</span>
                  <p className="text-sm text-white/40 mt-2 italic">{GEOGRAPHY_CONTENT.note}</p>
                </div>
              </div>

              {/* ════════════════════════════════════════════════════════════════
                  SCIENCE — content pulled from old Google Sites portfolio
                  ════════════════════════════════════════════════════════════════ */}
              <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                <Corners />
                <Label text="SUB_SCI_007" />
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-6">Science</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Projects</p>
                <div className="space-y-4">
                  {SCIENCE_CONTENT.projects.map(proj => (
                    <div key={proj.id} className="border border-white/10 p-5 bg-white/[0.02]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">{proj.label}</span>
                          <h5 className="font-bold text-white mt-1">{proj.title}</h5>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-white/40">{proj.date}</span>
                      </div>
                      <p className="text-sm text-white/60">{proj.description}</p>
                      <p className="text-[9px] uppercase tracking-widest text-white/30 mt-2">Originally a Google Drive video — not directly embeddable</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Independent Learning ── */}
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

        {/* ════════════════════════════════════════ SKILLS ════════════════════════════════════════ */}
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
                  <div className="mb-8 text-white/40 group-hover:text-black/40">{s.icon}</div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-8 group-hover:text-black">{s.title}</h3>
                  <ul className="space-y-3 text-sm font-bold uppercase tracking-wider text-white/60 group-hover:text-black/60">
                    {s.items.map((item, j) => <li key={j}>— {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════ CODE ════════════════════════════════════════ */}
        {page === 'code' && (
          <div className="max-w-6xl mx-auto space-y-24 animate-in fade-in duration-500">
            <div className="relative inline-block">
              <Label text="SEC_CODE_004" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter flex items-center gap-6">
                <Terminal size={64} className="text-white/40" /> Projects
              </h2>
            </div>

            <div className="space-y-12">
              <div className="relative inline-block">
                <Label text="FEATURED_REPOS" />
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">Featured Work</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredProjects.map(proj => (
                  <div key={proj.id} onClick={() => setSelectedProject(proj)} className="group cursor-pointer relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white transition-all duration-500">
                    <Corners />
                    <div className="flex justify-between items-start mb-6">
                      <Database className="text-white/40 group-hover:text-black/40" size={24} />
                      <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 group-hover:text-black/40">{proj.language}</span>
                    </div>
                    <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-black">{proj.name}</h4>
                    <p className="text-sm text-white/60 group-hover:text-black/60 mb-6">{proj.description}</p>
                    <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-black/40">
                      {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 hover:text-black">Live <ExternalLink size={10} /></a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div className="relative inline-block">
                <Label text="GITHUB_REPOS" />
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">GitHub Repositories</h3>
              </div>
              {loading ? (
                <div className="flex items-center justify-center p-24">
                  <Loader2 className="animate-spin text-white/40" size={32} />
                </div>
              ) : error ? (
                <div className="text-center p-12 border border-white/10 bg-white/[0.02]">
                  <p className="text-white/40">Failed to load repositories</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {repos.map(repo => (
                    <div key={repo.id} onClick={() => setSelectedProject(repo)} className="group cursor-pointer relative border border-white/10 p-8 bg-white/[0.02] hover:bg-white transition-all duration-500">
                      <Corners />
                      <div className="flex justify-between items-start mb-6">
                        <Database className="text-white/40 group-hover:text-black/40" size={24} />
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 group-hover:text-black/40">{repo.language || 'Code'}</span>
                      </div>
                      <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-black">{repo.name}</h4>
                      <p className="text-sm text-white/60 group-hover:text-black/60 mb-6">{repo.description || 'No description available'}</p>
                      <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-black/40">
                        <span className="flex items-center gap-1">★ {repo.stargazers_count}</span>
                        <a href={repo.html_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 hover:text-black">GitHub <ExternalLink size={10} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════ PHOTOGRAPHY ════════════════════════════════════════ */}
        {page === 'photography' && (
          <div className="space-y-24 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="relative inline-block">
                <Label text="SEC_PHOTO_005" />
                <h2 className="text-7xl font-black italic uppercase tracking-tighter flex items-center gap-6">
                  <Aperture size={64} className="text-white/40" /> Gallery
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={downloadAllPhotos} className="group flex items-center gap-2 border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all">
                  <Download size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Download All</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 relative">
              <Label text="FILTER_SYSTEM" />
              {categories.map(cat => (
                <button key={cat} onClick={() => setPhotoFilter(cat)} className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${photoFilter === cat ? 'bg-white text-black border-white' : 'border-white/20 hover:bg-white/10'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, i) => (
                <div key={i} onClick={() => setSelectedPhoto(photo)} className="group cursor-pointer relative border border-white/10 overflow-hidden aspect-square">
                  <Corners />
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <p className="text-xs font-bold uppercase tracking-widest mb-1">{photo.title}</p>
                    <p className="text-[9px] uppercase tracking-widest text-white/60">{photo.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════ CONTACT ════════════════════════════════════════ */}
        {page === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-24 animate-in fade-in duration-500">
            <div className="relative inline-block">
              <Label text="SEC_CONTACT_006" />
              <h2 className="text-7xl font-black italic uppercase tracking-tighter">Contact</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="p-8 border border-white/10 bg-white/[0.02] relative">
                  <Label text="COMM_CHANNELS" />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Get in Touch</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between pb-3 border-b border-white/5">
                      <span className="uppercase tracking-widest text-white/40">Email</span>
                      <a href="mailto:alxgraphy@gmail.com" className="hover:text-white/60 transition-colors">alxgraphy@gmail.com</a>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-white/5">
                      <span className="uppercase tracking-widest text-white/40">GitHub</span>
                      <a href="https://github.com/alxgraphy" target="_blank" rel="noreferrer" className="hover:text-white/60 transition-colors flex items-center gap-1">
                        @alxgraphy <ExternalLink size={12} />
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="uppercase tracking-widest text-white/40">Location</span>
                      <span className="text-white/60">Toronto, CA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-12 border border-white/10 bg-white/[0.02] relative flex flex-col justify-center">
                <Label text="STATUS_SYS" />
                <div className="space-y-6 text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest">Available for Inquiries</span>
                  </div>
                  <p className="text-sm italic text-white/60">Open to collaboration and photography opportunities</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── Project Modal ── */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6" onClick={() => setSelectedProject(null)}>
          <div className="max-w-4xl w-full bg-[#050505] border border-white/20 p-12 relative" onClick={e => e.stopPropagation()}>
            <Corners />
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-white/40 hover:text-white">
              <X size={24} />
            </button>
            <div className="space-y-8">
              <div>
                <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-4">{selectedProject.name}</h3>
                <p className="text-white/60">{selectedProject.description}</p>
              </div>
              {selectedProject.language && (
                <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                  <span className="px-4 py-2 border border-white/20">{selectedProject.language}</span>
                  {selectedProject.stargazers_count !== undefined && <span className="px-4 py-2 border border-white/20">★ {selectedProject.stargazers_count}</span>}
                </div>
              )}
              <div className="flex gap-4">
                {selectedProject.html_url && (
                  <a href={selectedProject.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all">
                    <span className="text-xs font-bold uppercase tracking-widest">View on GitHub</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all">
                    <span className="text-xs font-bold uppercase tracking-widest">Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Photo Modal ── */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6" onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-6xl w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedPhoto(null)} className="absolute -top-12 right-0 text-white/40 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <X size={20} /> Close
            </button>
            <div className="border border-white/20 p-2 bg-[#050505]">
              <Corners />
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-auto" />
            </div>
            <div className="mt-6 space-y-2">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">{selectedPhoto.title}</h3>
              <div className="flex gap-6 text-xs uppercase tracking-widest">
                <span className="text-white/40">Category: <span className="text-white">{selectedPhoto.category}</span></span>
                <span className="text-white/40">Location: <span className="text-white">{selectedPhoto.location}</span></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="relative z-10 mt-32 py-12 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">© 2025 ALX.CORE — All Rights Reserved</p>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest">
            <a href="https://github.com/alxgraphy" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">GitHub</a>
            <a href="mailto:alxgraphy@gmail.com" className="text-white/40 hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
