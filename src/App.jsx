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
        {/* Aperture icon instead of just text */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" className="text-brand-gold/40">
          <circle cx="12" cy="12" r="10" />
          <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
          <line x1="9.69" y1="8" x2="21.17" y2="8" />
          <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
          <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
          <line x1="14.31" y1="16" x2="2.83" y2="16" />
          <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
        </svg>
        <span className="font-display text-2xl text-brand-gold font-semibold">CL</span>
        <p>&copy; {new Date().getFullYear()} Creatively Lensed by Akshat Dange.<br/>All rights reserved.</p>
        <span className="font-mono text-[9px] tracking-[0.2em] text-brand-text/15">Capturing since 2019</span>
      </footer>
    </div>
  );
}

export default App;
