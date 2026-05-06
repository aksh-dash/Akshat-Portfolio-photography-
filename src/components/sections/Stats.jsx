import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Aperture, Eye, FolderOpen } from 'lucide-react';
import { STATS_DATA } from '../../constants';
import StatCounter from '../ui/StatCounter';

const statIcons = [Eye, Aperture, Camera, FolderOpen];

const Stats = () => {
  return (
    <section className="w-full py-24 bg-[#0a0a0a] border-y border-white/5 relative z-10">
      {/* Subtle LCD panel background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(201, 168, 76, 0.3) 2px,
            rgba(201, 168, 76, 0.3) 3px
          )`,
        }}
      />

      <div className="container mx-auto px-6">
        {/* LCD-style header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="h-px flex-1 max-w-[60px] bg-brand-gold/10" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-brand-gold/30">
            Stats · Live
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-brand-gold/10" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center md:text-left">
          {STATS_DATA.map((stat, index) => {
            const Icon = statIcons[index] || Camera;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex flex-col items-center md:items-start lcd-display p-4 rounded-lg"
              >
                {/* Camera icon decoration */}
                <Icon size={14} className="text-brand-gold/25 mb-3" />
                <StatCounter 
                  value={stat.value} 
                  label={stat.label} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals} 
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
