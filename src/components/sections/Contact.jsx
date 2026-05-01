import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, Check } from 'lucide-react';
import { FiInstagram as Instagram } from 'react-icons/fi';
import { SOCIAL_LINKS } from '../../constants';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="w-full py-24 bg-brand-dark relative z-10">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col mb-16 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-text mb-4"
          >
            Let's make something that lasts.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-text/50 text-xl font-light"
          >
            Every great project starts with a conversation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="relative group">
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-brand-text focus:outline-none focus:border-brand-gold transition-colors peer placeholder-transparent"
                  placeholder="Name"
                />
                <label className="absolute left-0 top-4 text-brand-text/50 text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-gold pointer-events-none">
                  Name
                </label>
                {errors.name && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.name}</span>}
              </div>

              <div className="relative group mt-2">
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-brand-text focus:outline-none focus:border-brand-gold transition-colors peer placeholder-transparent"
                  placeholder="Email"
                />
                <label className="absolute left-0 top-4 text-brand-text/50 text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-gold pointer-events-none">
                  Email
                </label>
                {errors.email && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.email}</span>}
              </div>

              <div className="relative group mt-2">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-brand-text focus:outline-none focus:border-brand-gold transition-colors peer placeholder-transparent resize-none h-32"
                  placeholder="Message"
                />
                <label className="absolute left-0 top-4 text-brand-text/50 text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-gold pointer-events-none">
                  Message
                </label>
                {errors.message && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.message}</span>}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="mt-6 self-start px-12 py-4 bg-brand-text text-brand-dark uppercase tracking-widest text-sm font-semibold hover:bg-brand-gold transition-colors relative overflow-hidden flex items-center justify-center min-w-[200px]"
                data-cursor="SEND"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="w-5 h-5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin" />
                    </motion.div>
                  ) : isSuccess ? (
                    <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check size={20} />
                    </motion.div>
                  ) : (
                    <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10"
          >
            <div>
              <h4 className="text-brand-gold tracking-widest uppercase text-sm mb-6">Direct Contact</h4>
              <div className="flex flex-col gap-4">
                <a href={SOCIAL_LINKS.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-brand-text hover:text-brand-gold transition-colors group w-fit" data-cursor="CHAT">
                  <span className="p-3 bg-white/5 rounded-full group-hover:bg-brand-gold/20 transition-colors"><MessageCircle size={20} /></span>
                  <span className="tracking-wide">WhatsApp</span>
                </a>
                <a href={`mailto:${SOCIAL_LINKS.email1}`} className="flex items-center gap-4 text-brand-text hover:text-brand-gold transition-colors group w-fit" data-cursor="MAIL">
                  <span className="p-3 bg-white/5 rounded-full group-hover:bg-brand-gold/20 transition-colors"><Mail size={20} /></span>
                  <span className="tracking-wide">{SOCIAL_LINKS.email1}</span>
                </a>
                <a href={`mailto:${SOCIAL_LINKS.email2}`} className="flex items-center gap-4 text-brand-text hover:text-brand-gold transition-colors group w-fit" data-cursor="MAIL">
                  <span className="p-3 bg-white/5 rounded-full group-hover:bg-brand-gold/20 transition-colors"><Mail size={20} /></span>
                  <span className="tracking-wide">{SOCIAL_LINKS.email2}</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-brand-gold tracking-widest uppercase text-sm mb-6 mt-4">Socials</h4>
              <div className="flex flex-col gap-4">
                <a href={SOCIAL_LINKS.photographyIg} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-brand-text hover:text-brand-gold transition-colors group w-fit" data-cursor="VIEW">
                  <span className="p-3 bg-white/5 rounded-full group-hover:bg-brand-gold/20 transition-colors"><Instagram size={20} /></span>
                  <span className="tracking-wide">Photography @creativelylensed</span>
                </a>
                <a href={SOCIAL_LINKS.gymophilicIg} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-brand-text hover:text-brand-gold transition-colors group w-fit" data-cursor="VIEW">
                  <span className="p-3 bg-white/5 rounded-full group-hover:bg-brand-gold/20 transition-colors"><Instagram size={20} /></span>
                  <span className="tracking-wide">Apparel @gymophilic</span>
                </a>
                <a href={SOCIAL_LINKS.carClubIg} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-brand-text hover:text-brand-gold transition-colors group w-fit" data-cursor="VIEW">
                  <span className="p-3 bg-white/5 rounded-full group-hover:bg-brand-gold/20 transition-colors"><Instagram size={20} /></span>
                  <span className="tracking-wide">Cars @carclubofsambhajinagar</span>
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>

      <a 
        href={SOCIAL_LINKS.whatsappLink} 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300 group"
        data-cursor="CHAT"
      >
        <div className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <MessageCircle size={28} />
      </a>
    </section>
  );
};

export default Contact;
