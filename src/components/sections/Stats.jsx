import React from 'react';
import { motion } from 'framer-motion';
import { STATS_DATA } from '../../constants';
import StatCounter from '../ui/StatCounter';

const Stats = () => {
  return (
    <section className="w-full py-24 bg-[#0a0a0a] border-y border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center md:text-left">
          {STATS_DATA.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex justify-center md:justify-start"
            >
              <StatCounter 
                value={stat.value} 
                label={stat.label} 
                suffix={stat.suffix} 
                decimals={stat.decimals} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
