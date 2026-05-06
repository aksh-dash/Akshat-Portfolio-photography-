import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../constants';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />;
};

/* ------------------------------------------------
   Aperture SVG — the universal photographer icon
   ------------------------------------------------ */
const ApertureIcon = ({ className = "", size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
    <line x1="9.69" y1="8" x2="21.17" y2="8" />
    <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
    <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
    <line x1="14.31" y1="16" x2="2.83" y2="16" />
    <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
  </svg>
);

const Hero = () => {
  const [shutterOpen, setShutterOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShutterOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      
      {/* ===== FULL-BLEED BACKGROUND IMAGE ===== */}
      <div className={`absolute inset-0 z-0 ${shutterOpen ? 'shutter-reveal' : ''}`}
           style={{ clipPath: shutterOpen ? undefined : 'circle(0% at 50% 50%)' }}>
        <img
          src="/dance.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/50 to-brand-dark/90" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,8,8,0.7)_100%)]" />
      </div>

      <ParticleCanvas />
      <div className="grain-overlay" />

      {/* ===== LENS FLARE ===== */}
      <div className="lens-flare" />

      {/* ===== VIEWFINDER OVERLAY ===== */}
      <div className="viewfinder-corner viewfinder-corner--tl" />
      <div className="viewfinder-corner viewfinder-corner--tr" />
      <div className="viewfinder-corner viewfinder-corner--bl" />
      <div className="viewfinder-corner viewfinder-corner--br" />
      <div className="viewfinder-crosshair" />

      {/* ===== EXIF DATA STRIP ===== */}
      <div className="exif-strip hidden sm:flex">
        <span>f/2.8</span>
        <span>1/200s</span>
        <span>ISO 400</span>
        <span>50mm</span>
      </div>

      {/* ===== REC + FRAME COUNTER (top-left) ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute top-[10%] left-[8%] z-20 hidden sm:flex items-center gap-3 pointer-events-none"
      >
        <span className="rec-dot" />
        <span className="font-mono text-[10px] tracking-widest text-red-400/60 uppercase">Rec</span>
      </motion.div>

      {/* ===== FRAME COUNTER (top-right) ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute top-[10%] right-[8%] z-20 hidden sm:flex items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-widest text-brand-gold/30">FRM 001 / 024</span>
      </motion.div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="z-20 flex flex-col items-center text-center px-4 w-full max-w-6xl">
        
        {/* Aperture icon above brand name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <ApertureIcon size={36} className="text-brand-gold/60 aperture-icon" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-brand-gold tracking-widest uppercase text-sm mb-6"
        >
          Creatively Lensed
        </motion.p>

        <motion.h1
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl sm:text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[1.2] pb-4 mb-2 text-brand-text font-medium text-center"
        >
          Akshat Dange
        </motion.h1>

        {/* Subtitle with photography-specific language */}
        <motion.p
          className="font-display italic text-xl md:text-3xl text-brand-text/80 mb-4"
        >
          {"Painting Stories with lights and shadows".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.03 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* Profession tagline — makes it unmistakable */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="font-mono text-[11px] tracking-[0.25em] uppercase text-brand-text/40 mb-12"
        >
          Photographer &nbsp;·&nbsp; Videographer &nbsp;·&nbsp; Editor
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#work"
            className="px-8 py-4 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors tracking-widest text-sm uppercase"
            data-cursor="SCROLL"
          >
            Explore my work
          </a>
          <a
            href={SOCIAL_LINKS.photographyIg}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 border border-white/20 text-brand-text hover:border-white/50 transition-colors tracking-widest text-sm uppercase glass-panel"
            data-cursor="OPEN"
          >
            Open Instagram
          </a>
        </motion.div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs tracking-widest text-brand-text/50 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-brand-text/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
