import React from 'react';
import { motion } from 'framer-motion';
import { DESIGN_DATA } from '../../constants';

const Design = () => {
  return (
    <section className="w-full py-24 bg-brand-surface border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-brand-text mb-4"
          >
            Design. The structured sibling of photography.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-text/50 max-w-2xl"
          >
            A photographer who thinks in design. Every composition is a layout, every colour scheme a brand identity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {DESIGN_DATA.map((item, index) => {
            const isLarge = item.size.includes('col-span-2');
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-md overflow-hidden group cursor-pointer border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/50 hover:shadow-[0_10px_30px_rgba(201,168,76,0.1)] ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                data-cursor="VIEW"
              >
                {item.img ? (
                  <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${
                    item.category === 'Branding' ? 'bg-gradient-to-br from-[#1a1c29] to-[#0d0e15]' :
                    item.category === 'Poster' ? 'bg-gradient-to-br from-[#2a1b0a] to-[#0a0702]' :
                    'bg-gradient-to-br from-[#102a20] to-[#050d0a]'
                  }`} />
                )}

                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-brand-dark/90 to-transparent">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] tracking-widest uppercase text-brand-gold mb-3">
                      {item.category}
                    </span>
                    <h3 className={`font-display text-brand-text ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Design;
