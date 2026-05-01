import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EDITING_PORTRAIT, EDITING_LANDSCAPE } from '../../constants';

const BeforeAfterSlider = ({ label1, label2, img1, img2 }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-md cursor-ew-resize select-none border border-white/5"
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      data-cursor="DRAG"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#8a5d2e] to-[#2c1b0c] flex items-center justify-center">
        {img2 && <img src={img2} alt="After" className="absolute inset-0 w-full h-full object-cover" />}
        <span className="text-brand-text/50 font-display text-2xl absolute right-8 z-10">{label2}</span>
      </div>

      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#4a5568] to-[#1a202c] flex items-center justify-center overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        {img1 && <img src={img1} alt="Before" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center z-10" style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100vw' }}>
          <span className="text-brand-text/50 font-display text-2xl absolute left-8">{label1}</span>
        </div>
      </div>

      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-brand-gold z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-dark border-2 border-brand-gold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(201,168,76,0.5)]">
          <ChevronLeft size={12} className="text-brand-gold absolute left-1" />
          <ChevronRight size={12} className="text-brand-gold absolute right-1" />
        </div>
      </div>
    </div>
  );
};

const Editing = () => {
  return (
    <section className="w-full py-24 bg-brand-dark border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-brand-text mb-4 text-center"
          >
            The art is in the invisible details.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-text/50 text-center max-w-2xl"
          >
            Color grading and dodging & burning breathe life into a flat RAW file. Drag the sliders below to see the transformation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BeforeAfterSlider label1="RAW" label2="Graded" img1={EDITING_PORTRAIT.before} img2={EDITING_PORTRAIT.after} />
            <p className="text-center mt-4 text-sm tracking-widest text-brand-text/50 uppercase">Portrait Retouching</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BeforeAfterSlider label1="Before" label2="After" img1={EDITING_LANDSCAPE.before} img2={EDITING_LANDSCAPE.after} />
            <p className="text-center mt-4 text-sm tracking-widest text-brand-text/50 uppercase">Landscape Grading</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {['Film emulation', 'Dodging & Burning', 'Colour harmony'].map((pill, i) => (
            <span key={i} className="px-6 py-2 border border-brand-gold/30 text-brand-gold rounded-full text-sm tracking-widest uppercase">
              {pill}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Editing;
