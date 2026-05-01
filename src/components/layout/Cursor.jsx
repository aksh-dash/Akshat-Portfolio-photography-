import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';

const Cursor = () => {
  const { position, isHovering, hoverText, isVisible } = useCursor();

  if (window.matchMedia("(pointer: coarse)").matches || !isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
      style={{
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div 
        className={`w-4 h-4 rounded-full bg-brand-text flex items-center justify-center transition-all duration-300 ${
          isHovering ? "w-12 h-12 bg-white text-brand-dark mix-blend-normal" : ""
        }`}
      >
        {isHovering && hoverText && (
          <span className="text-[5px] font-bold tracking-widest uppercase">
            {hoverText}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default Cursor;
