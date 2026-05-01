import React, { useState, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

const StatCounter = ({ value, label, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          setCount(v);
        }
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start">
      <div className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-gold mb-2 flex items-baseline">
        {count.toFixed(decimals)}
        <span className="text-3xl lg:text-4xl ml-1">{suffix}</span>
      </div>
      <p className="text-sm tracking-widest uppercase text-brand-text/50">
        {label}
      </p>
    </div>
  );
};

export default StatCounter;
