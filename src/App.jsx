import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Cursor from './components/layout/Cursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Gallery from './components/sections/Gallery';
import VideoGallery from './components/sections/VideoGallery';
import Editing from './components/sections/Editing';
import Design from './components/sections/Design';
import Stats from './components/sections/Stats';
import Contact from './components/sections/Contact';

function App() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--framer-motion-duration', '0ms');
    }
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen text-brand-text relative selection:bg-brand-gold selection:text-brand-dark font-sans">
      <Cursor />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Gallery />
        <VideoGallery />
        <Editing />
        <Design />
        <Stats />
        <Contact />
      </main>

      <footer className="w-full py-12 text-center text-brand-text/30 text-xs tracking-widest uppercase bg-brand-dark border-t border-white/5 flex flex-col items-center gap-4">
        <span className="font-display text-2xl text-brand-gold font-semibold">CL</span>
        <p>&copy; {new Date().getFullYear()} Creatively Lensed by Akshat Dange.<br/>All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
