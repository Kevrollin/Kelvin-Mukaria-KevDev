
# KelvinDev Portfolio

![KelvinDev Portfolio Screenshot](./My%20portfolio.JPG)

A professional developer portfolio with a twist of humor and personality. This portfolio showcases skills, projects, and contact information in a visually engaging way with subtle animations and interactive elements.

## ✨ Features

- **Responsive Design**: Fully optimized for all screen sizes with a custom mobile navigation
- **Dark/Light Mode**: Toggle between themes with humorous tooltips
- **Interactive Elements**: 
  - Typing animations
  - Hover effects
  - Toast notifications
  - Easter eggs in the console
  - "Hacker Mode" theme toggle
  - Random Dev jokes with toast notifications
- **WhatsApp Integration**: Send messages directly via WhatsApp
- **Custom Components**:
  - Project cards with hover effects
  - Skills section with interactive card layout
  - Tech stack visualization
  - Contact form with WhatsApp integration
  - Custom 404 page with humor
- **Performance Optimized**: Fast loading and smooth animations

## 🚀 Technologies Used

- **React**: Component-based UI development
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Accessible UI components
- **Lucide Icons**: Simple and consistent icon set
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Data fetching and cache management
- **Vite**: Fast and optimized frontend build tool

## 🔧 Wanna Clone the File??

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kelvindev-portfolio.git
   cd kelvindev-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 WhatsApp Integration

The portfolio includes WhatsApp integration for easy communication:

1. **Contact Form**: Messages sent via the contact form open WhatsApp with pre-filled content
2. **"Hire Me" Button**: Direct link to start a conversation about potential work
3. **Collaboration Button**: Quick way to discuss project collaborations

To configure your WhatsApp number:
- Update the phone number in `NavBar.tsx` and `ContactSection.tsx`
- Format should include country code without '+' (e.g., 254757086742 for Kenya)

## 🎨 Customization

### Personal Information
Edit the following files to customize your information:
- `src/components/HeroSection.tsx`: Update name, title and introduction
- `src/components/AboutSection.tsx`: Modify your bio and personal details
- `src/components/SkillsSection.tsx`: Update your skills data
- `src/components/ProjectsSection.tsx`: Change project information and links
- `src/components/ContactSection.tsx`: Update contact details

### Theme Colors
Modify the theme colors in `src/index.css` within the `:root` and `.dark` selectors.

### Images
Replace placeholder images in the public directory with your own images.

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy to Vercel

The portfolio is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Sign up for [Vercel](https://vercel.com) and connect your repository
3. Vercel will automatically detect the Vite configuration and deploy your site

## 🌐 SEO & Performance

The portfolio includes:
- Semantic HTML for better accessibility
- Meta tags for SEO
- Optimized asset loading
- Performance best practices

## 🧩 Project Structure

```
kelvindev-portfolio/
├── public/                # Public assets and images
├── src/
│   ├── components/        # UI components
│   │   ├── ui/            # Shadcn UI components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── NavBar.tsx
│   │   └── Footer.tsx
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── App.tsx            # App root component
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 📝 License

MIT License © Kelvin Mukaria | KevDev

---

Built with 💻 and ☕ by [KevDev](https://github.com/Kevrollin)
