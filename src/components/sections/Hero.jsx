import React, { useEffect, useRef } from 'react';
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

    for (let i = 0; i < 100; i++) {
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />;
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      <ParticleCanvas />
      <div className="grain-overlay" />
      
      <div className="z-10 flex flex-col items-center text-center px-4 w-full max-w-6xl">
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

        <motion.p
          className="font-display italic text-xl md:text-3xl text-brand-text/80 mb-12"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
