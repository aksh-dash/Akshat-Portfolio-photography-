import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-brand-text mb-8 text-center"
          >
            These are the frames I chose to keep.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4"
          >
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-brand-gold text-brand-dark' 
                    : 'bg-transparent text-brand-text/50 hover:text-brand-text hover:bg-white/5'
                }`}
                data-cursor="CLICK"
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

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
                
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] tracking-widest uppercase text-brand-gold mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-display text-2xl text-brand-text">{item.title}</h3>
                  </div>
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
