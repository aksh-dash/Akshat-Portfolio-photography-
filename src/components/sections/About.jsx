import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_IMG } from '../../constants';

const skills = ['Photography', 'Videography', 'Color Grading', 'Brand Design'];

const About = () => {
  return (
    <section id="about" className="relative w-full min-h-screen py-24 flex items-center bg-brand-surface z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-brand-gold uppercase tracking-widest text-sm mb-6 font-medium"
            >
              Based in Pune. Shooting everywhere.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-text mb-8 leading-tight"
            >
              I just don't capture .<br />I portray stories .
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-brand-text/70 text-lg leading-relaxed mb-12 font-light max-w-2xl"
            >
              You know you’re gonna cook this time when sunrays bilkul perfect ho...
              Hii, I'm Akshat Dange. A ENTC undergraduate and a freelance photographer and content creator based in Pune, Maharashtra.
              I started clicking since 2019 and has collaborated with various brands and influencers across social media, conducted and attended various events in college and outside as well.
              I'm always keen to capture and curate moments that leave a lasting impression.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="px-6 py-3 border border-white/10 rounded-full text-sm tracking-wide text-brand-text/80 glass-panel"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`relative ${PROFILE_IMG ? 'w-full max-w-sm aspect-[4/5] rounded-xl overflow-hidden shadow-2xl shadow-brand-dark/50' : 'w-72 h-72 md:w-96 md:h-96'}`}
            >
              {PROFILE_IMG ? (
                <>
                  <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay z-10" />
                  <img src={PROFILE_IMG} alt="Akshat Dange" className="w-full h-full object-cover transition-all duration-700" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 via-brand-dark to-brand-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
                    <path fill="#C9A84C" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.3C91.4,-33.5,98,-18.1,98.1,-2.7C98.2,12.7,91.8,28.1,82.5,41.4C73.2,54.7,61.1,65.9,47.4,74.3C33.7,82.7,18.4,88.3,2.6,84.1C-13.2,79.9,-28.5,65.9,-43.3,56.1C-58.1,46.3,-72.4,40.7,-81.4,29.8C-90.4,18.9,-94.1,2.7,-91.1,-11.9C-88.1,-26.5,-78.4,-39.5,-67.2,-50.2C-56,-60.9,-43.3,-69.3,-29.8,-75.3C-16.3,-81.3,-2,-84.9,12.5,-82.6C27,-80.3,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100) scale(0.8)" opacity="0.1" />
                    <path fill="#7B9FD4" d="M37.6,-66.4C50.2,-59.8,62.8,-51.9,71.2,-40.5C79.6,-29.1,83.8,-14.2,83.4,-0.2C83,13.8,78,28,68.9,38.5C59.8,49,46.6,55.8,33.5,63.1C20.4,70.4,7.4,78.2,-6.3,86.6C-20,95,-34.4,104,-46.5,98.5C-58.6,93,-68.4,73,-76.2,54.1C-84,35.2,-89.8,17.4,-88.7,0.6C-87.6,-16.2,-79.6,-32.1,-69.1,-44.8C-58.6,-57.5,-45.6,-67,-32.2,-73C-18.8,-79,-5,-81.5,7.7,-80.4C20.4,-79.3,37.6,-66.4,37.6,-66.4Z" transform="translate(100 100) scale(0.8)" opacity="0.05" className="animate-[spin_30s_linear_infinite_reverse]" style={{ transformOrigin: 'center' }} />
                  </svg>
                </>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
