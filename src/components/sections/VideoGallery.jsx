import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film } from 'lucide-react';
import { VIDEO_DATA } from '../../constants';
import Lightbox from '../ui/Lightbox';

const VideoGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="w-full py-24 bg-brand-surface overflow-hidden">
      
      {/* ===== SCROLLING MARQUEE with film reel icon ===== */}
      <div className="relative w-full overflow-hidden flex mb-20 whitespace-nowrap bg-brand-dark py-4 border-y border-white/5">
        <motion.div
          animate={{ x: [0, -1500] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-4 mx-4">
              <span className="font-display text-4xl lg:text-6xl text-brand-text/20 uppercase tracking-widest">
                Cinematic Reels
              </span>
              <Film size={20} className="text-brand-gold/20" />
              <span className="font-display text-4xl lg:text-6xl text-brand-text/20 uppercase tracking-widest">
                Motion Stories
              </span>
              <Film size={20} className="text-brand-gold/20" />
              <span className="font-display text-4xl lg:text-6xl text-brand-text/20 uppercase tracking-widest">
                Visual Essays
              </span>
              <Film size={20} className="text-brand-gold/20" />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6">

        {/* ===== TIMELINE SCRUBBER DECORATION ===== */}
        <div className="flex items-center gap-3 mb-12 max-w-xl mx-auto">
          <span className="font-mono text-[9px] tracking-widest text-brand-text/20">00:00</span>
          <div className="flex-1 h-px bg-white/10 relative">
            <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-gold/40" />
            <div className="absolute left-0 top-0 h-full w-[30%] bg-brand-gold/15" />
          </div>
          <span className="font-mono text-[9px] tracking-widest text-brand-text/20">01:00</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {VIDEO_DATA.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-video rounded-md overflow-hidden group cursor-pointer border border-transparent transition-colors duration-500 hover:border-brand-gold/50 shadow-[0_0_0_rgba(201,168,76,0)] hover:shadow-[0_0_30px_rgba(201,168,76,0.15)]"
              onClick={() => openLightbox(index)}
              data-cursor="PLAY"
            >
              {video.img ? (
                <img src={video.img} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a24] to-[#04080c] transition-transform duration-700 group-hover:scale-105" />
              )}
              
              {/* ===== LETTERBOX BARS — cinema widescreen effect ===== */}
              <div className="letterbox absolute inset-0 pointer-events-none" />

              <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] tracking-widest uppercase text-brand-text z-10">
                {video.category}
              </div>
              
              {/* Duration with film icon */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                <Film size={10} className="text-brand-gold/50" />
                <span className="font-mono text-xs text-brand-text/70">{video.duration}</span>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 rounded-full bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/50 flex items-center justify-center text-brand-gold opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Play fill="currentColor" size={24} className="ml-1" />
                </div>
              </div>

              {/* Title bar */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-brand-dark/90 to-transparent z-10">
                <h3 className="font-display text-2xl text-brand-text group-hover:text-brand-gold transition-colors duration-300">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentItem={VIDEO_DATA[currentIndex] ? {...VIDEO_DATA[currentIndex], type: 'video'} : null}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % VIDEO_DATA.length)}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + VIDEO_DATA.length) % VIDEO_DATA.length)}
      />
    </section>
  );
};

export default VideoGallery;
