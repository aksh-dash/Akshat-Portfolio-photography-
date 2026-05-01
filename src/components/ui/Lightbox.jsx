import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ isOpen, onClose, currentItem, items, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1000] bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-brand-text/50 hover:text-brand-text transition-colors z-50 p-2"
          >
            <X size={32} />
          </button>

          {onPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-2 md:left-6 text-brand-text/50 hover:text-brand-text transition-colors z-50 p-2"
            >
              <ChevronLeft size={48} />
            </button>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-[90vw] max-h-[90vh] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === 'video' ? (
              <div className="w-[85vw] max-w-5xl aspect-video bg-black flex items-center justify-center relative rounded-md overflow-hidden">
                {currentItem.src ? (
                  <video src={currentItem.src} controls autoPlay className="w-full h-full object-contain" />
                ) : currentItem.embedUrl ? (
                  <iframe src={currentItem.embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a1520] to-[#04080c] border border-white/5 flex items-center justify-center">
                    <span className="text-brand-text/50 font-display text-2xl text-center px-4">Video Player: {currentItem.title}</span>
                  </div>
                )}
              </div>
            ) : (
              currentItem.img ? (
                <img src={currentItem.img} alt={currentItem.title} className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain rounded-md" />
              ) : (
                <div className="w-[85vw] md:w-[60vw] max-w-4xl max-h-[85vh] aspect-[3/4] md:aspect-[3/2] bg-gradient-to-br from-[#1a1306] to-[#080602] flex flex-col items-center justify-center p-8 border border-white/5 rounded-md">
                  <span className="text-brand-gold font-display text-3xl mb-2 text-center">{currentItem.title}</span>
                  <span className="text-brand-text/50 tracking-widest uppercase text-xs">{currentItem.category}</span>
                </div>
              )
            )}
          </motion.div>

          {onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-2 md:right-6 text-brand-text/50 hover:text-brand-text transition-colors z-50 p-2"
            >
              <ChevronRight size={48} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
