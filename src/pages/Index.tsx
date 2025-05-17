
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Console easter egg
    console.log("%cHey hacker 👀 — want to collab? Email me!", "color: #4ade80; font-size: 20px; font-weight: bold;");
    console.log("%cYou found the Easter egg! Impressive dev skills detected.", "color: #00d8ff; font-size: 16px;");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
