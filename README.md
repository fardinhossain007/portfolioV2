# Personal Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Inspired by contemporary portfolio designs with a dark navy blue theme and teal accents.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Dark Theme**: Professional dark navy blue background with teal accent colors
- **Smooth Animations**: Typing animation in hero section, smooth scrolling navigation
- **Interactive Sections**:
  - Hero section with animated greeting
  - About section with tech stack display
  - Experience section with tab-based interface
  - Projects showcase with featured and grid layouts
- **Modern Tech Stack**: React 19, TypeScript, Tailwind CSS 4, shadcn/ui components

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 22 or higher
- pnpm 8 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fardinhossain007/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
cd client
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Customization

### Update Personal Information

1. **Navigation**: Edit `client/src/components/Navigation.tsx` to update your name and social links
2. **Hero Section**: Modify `client/src/components/Hero.tsx` to change the greeting and introduction
3. **About Section**: Update `client/src/components/About.tsx` with your bio and tech stack
4. **Experience**: Edit `client/src/components/Experience.tsx` to add your work experience
5. **Projects**: Customize `client/src/components/Projects.tsx` with your actual projects

### Change Colors

Edit `client/src/index.css` to modify the color scheme. The current theme uses:
- Background: `#0a192f` (Dark navy blue)
- Foreground: `#ccd6f6` (Light gray)
- Primary: `#64ffda` (Teal accent)

### Add Your Profile Photo

Replace the placeholder in `client/src/components/About.tsx` with your actual photo:

```tsx
<img 
  src="/path-to-your-photo.jpg" 
  alt="Your Name"
  className="w-full h-full object-cover"
/>
```

## Deployment

### Deploy to GitHub Pages

See [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md) for detailed instructions on deploying to GitHub Pages.

Quick steps:
1. Create a GitHub repository
2. Push your code to GitHub
3. Enable GitHub Pages in repository settings
4. The site will be automatically deployed via GitHub Actions

### Deploy via Manus

If you're using Manus:
1. Save a checkpoint
2. Click "Publish" in the Management UI
3. Your site will be deployed to a Manus subdomain

## Project Structure

```
personal-portfolio/
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/           # Page components
│   │   │   └── Home.tsx
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
└── README.md
```

## Building for Production

```bash
cd client
pnpm build
```

The built files will be in `client/dist/` directory.

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- GitHub: [@fardinhossain007](https://github.com/fardinhossain007)
- LinkedIn: [Fardin Hossain Tanmoy](https://www.linkedin.com/in/fardin-hossain-tanmoy)

---

Built and designed by Fardin Hossain. All rights reserved. © 2025
