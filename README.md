# My Portfolio

Personal portfolio website showcasing my work, skills, and projects as a developer.

**Go Look At It:** https://thegreatportfolio.vercel.app


## ✨ Features

- Responsive design (mobile-first)  
- Smooth scrolling and section transitions  
- Modern, minimal UI with dark theme support  
- Fast loading thanks to Vite  
- Easy to customize – add your projects, change colors, etc.  
- Deployed on Vercel with automatic CI/CD from GitHub

## 🛠️ Tech Stack

- **Framework**: React (with Hooks & Components)  
- **Build Tool**: Vite  
- **Styling**: Tailwind CSS  
- **Deployment**: Vercel  
- **Language**: JavaScript / JSX  

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18  
- npm / pnpm / yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/alxgraphy/alx-portfolio.git
   cd alx-portfolio

# 2. Install Dependicies

npm install
# or
pnpm install
# or
yarn install


# 3. Run development server

npm run dev
# or
pnpm dev
# or
yarn dev

## Project Structure

```
alx-portfolio/
├── api/                  # Optional: serverless functions / API routes (Vercel)
├── public/               # Static assets (favicon, images served as-is)
├── src/
│   ├── assets/           # Images, icons, SVGs imported in code
│   ├── components/       # Reusable UI components (Button, Card, Navbar…)
│   ├── sections/         # Main page sections (Hero, About, Projects, Contact…)
│   ├── App.jsx           # Root layout / main component
│   └── main.jsx          # Entry point – mounts React app
├── tailwind.config.js    # Tailwind theme customization
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel deployment settings
├── package.json
└── README.md
```





## 🎨 Customization Tips

Change colors → edit tailwind.config.js (theme.extend.colors)

Add new project → create component in src/sections/Projects or similar

Update personal info → usually in src/sections/About.jsx or Hero.jsx

Add contact form → use Vercel serverless functions in /api + a service like Formspree/Resend


## 📄 License
MIT License
Feel free to use this as a base for your own portfolio just give credit.


## 👋 Let's Connect

Portfolio: https://thegreatportfolio.vercel.app

GitHub: (@alxgraphy)[github.com/alxgraphy]

Instagram: (@alexedgraphy)[instagram.com/alexedgraphy]

Tiktok: (@alxgraphy0[tiktok.com/alxgraphy]
