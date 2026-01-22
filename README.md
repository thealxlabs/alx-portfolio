# Alexander's Portfolio

A modern, minimalist portfolio showcasing photography and code projects. Built with React, featuring a black and white wireframe aesthetic with dual theme support (Wireframe/Aether).

## 🎨 Features

- **Dual Theme System** - Toggle between clean Wireframe (black/white) and dark Aether modes
- **Dynamic Photography Gallery** - Random selection of 12 photos from 32+ images hosted on ImgBB
- **GitHub Integration** - Auto-fetches and displays projects from GitHub API
- **Responsive Design** - Fully responsive across all devices
- **Smooth Animations** - Scroll-triggered animations using Framer Motion
- **Multi-page Navigation** - Home, About, Skills, Code, Photography, Contact pages
- **Secure Admin Panel** - IP-restricted, password-protected admin interface for easy content updates

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** Vercel
- **Photos:** ImgBB CDN
- **Version Control:** Git/GitHub

## 📂 Project Structure
```
alx-portfolio/
├── public/
│   ├── admin.html          # Secure admin panel
│   └── me.jpeg            # About me photo
├── api/
│   ├── auth.js            # Admin authentication
│   ├── check-ip.js        # IP whitelist verification
│   └── push-to-github.js  # GitHub API integration
├── src/
│   ├── App.jsx            # Main portfolio component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── vercel.json            # Vercel configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alxgraphy/alx-portfolio.git
cd alx-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## 🔐 Admin Panel Setup

The portfolio includes a secure admin panel for easy content updates.

### Environment Variables (Vercel)

Set these in Vercel Dashboard → Settings → Environment Variables:

- `ADMIN_PASSWORD` - Your secure admin password
- `ALLOWED_IP` - Your home IP address (from whatismyipaddress.com)
- `GITHUB_TOKEN` - GitHub Personal Access Token with `repo` permissions

### Access Admin Panel

- URL: `https://yoursite.com/secret-admin-x9k2m` (change this in vercel.json)
- Only accessible from whitelisted IP
- Password protected

## 📸 Photography

32 high-quality photos hosted on Cloudinary, randomly displayed 12 at a time. Photos are automatically optimized for web delivery.

## 📧 Contact

- **Email:** alxgraphy@icloud.com
- **GitHub:** (@alxgraphy)[github.com/alxgraphy]
- **Instagram:** (@alexedgraphy)[instagram.com/alexedgraphy]
- **TikTok:** (@alxgraphy)[tiktok.com/alxgraphy]

## 📝 License

MIT License - feel free to use this project as inspiration for your own portfolio.

---

Made with ❤️ in Toronto, Canada 🇨🇦 by Alexander Wondwossen ([@alxgraphy](https://github.com/alxgraphy))
