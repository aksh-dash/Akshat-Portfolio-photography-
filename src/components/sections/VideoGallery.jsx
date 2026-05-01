import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
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
      
      <div className="relative w-full overflow-hidden flex mb-20 whitespace-nowrap bg-brand-dark py-4 border-y border-white/5">
        <motion.div
          animate={{ x: [0, -1500] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array(8).fill("Cinematic Reels · Motion Stories · Visual Essays · ").map((text, i) => (
            <span key={i} className="font-display text-4xl lg:text-6xl text-brand-text/20 uppercase tracking-widest mx-4">
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
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
              
              <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] tracking-widest uppercase text-brand-text">
                {video.category}
              </div>
              
              <div className="absolute top-4 right-4 text-xs font-mono text-brand-text/70">
                {video.duration}
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/50 flex items-center justify-center text-brand-gold opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Play fill="currentColor" size={24} className="ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-brand-dark/90 to-transparent">
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
