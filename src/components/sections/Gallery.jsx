import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aperture } from 'lucide-react';

import { GALLERY_DATA, GALLERY_CATEGORIES } from '../../constants';
import Lightbox from '../ui/Lightbox';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (filter === 'All') return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === filter);
  }, [filter]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="work" className="w-full py-24 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* ===== FILM STRIP HEADER DECORATION ===== */}
        <div className="flex items-center gap-4 mb-16">
          {/* Left film strip edge */}
          <div className="hidden md:flex items-center gap-2 opacity-20">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="sprocket-hole" />
            ))}
          </div>
          
          <div className="flex-1 flex flex-col items-center">
            {/* Aperture icon decoration */}
            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <Aperture size={20} className="text-brand-gold/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl text-brand-text mb-4 text-center"
            >
              These are the frames I chose to keep.
            </motion.h2>

            {/* Frame count indicator */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-mono text-[10px] tracking-[0.2em] text-brand-text/25 uppercase mb-8"
            >
              {filteredItems.length} frames · {filter}
            </motion.span>

            {/* Filter buttons — camera mode selector style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 md:gap-3 p-2 bg-white/[0.02] border border-white/5 rounded-full"
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                    filter === cat 
                      ? 'bg-brand-gold text-brand-dark font-medium shadow-[0_0_15px_rgba(201,168,76,0.2)]' 
                      : 'bg-transparent text-brand-text/50 hover:text-brand-text hover:bg-white/5'
                  }`}
                  data-cursor="CLICK"
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right film strip edge */}
          <div className="hidden md:flex items-center gap-2 opacity-20">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="sprocket-hole" />
            ))}
          </div>
        </div>

        {/* ===== GALLERY MASONRY ===== */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative overflow-hidden mb-6 group cursor-pointer ${item.height} rounded-md break-inside-avoid`}
                onClick={() => openLightbox(index)}
                data-cursor="VIEW"
              >
                {item.img ? (
                  <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2a1b0a] to-[#0a0702] transition-transform duration-500 group-hover:scale-[1.04]" />
                )}
                
                {/* Focus bracket overlay — camera autofocus effect */}
                <div className="focus-bracket">
                  <div className="focus-bracket-inner absolute inset-0" />
                </div>

                {/* Hover info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] tracking-widest uppercase text-brand-gold mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-display text-2xl text-brand-text">{item.title}</h3>
                  </div>
                </div>

                {/* Frame number — subtle photographer touch */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="font-mono text-[9px] tracking-widest text-brand-text/40">
                    #{String(item.id).padStart(3, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentItem={filteredItems[currentIndex] ? {...filteredItems[currentIndex], type: 'image'} : null}
        onNext={filteredItems.length > 1 ? handleNext : undefined}
        onPrev={filteredItems.length > 1 ? handlePrev : undefined}
      />
    </section>
  );
};

export default Gallery;
