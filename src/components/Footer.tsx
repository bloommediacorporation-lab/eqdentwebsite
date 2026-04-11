import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <footer ref={containerRef} data-theme="dark" className="bg-charcoal text-cream relative overflow-hidden">
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black z-10 pointer-events-none"
      />
      <motion.div 
        style={{ y }}
        className="pt-20 md:pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto relative z-0"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-12 md:gap-16">
          <div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif leading-none mb-8 md:mb-12">
              Pregătit pentru <br/><span className="italic text-gold">transformarea ta?</span>
            </h2>
            <Link to="/programare" className="inline-flex w-full md:w-auto justify-center bg-cream text-charcoal px-6 py-4 md:px-8 md:py-4 rounded-full text-base md:text-lg font-medium items-center gap-2 hover:bg-gold hover:text-white transition-colors">
              Programează-te <ArrowUpRight size={20} />
            </Link>
          </div>
          
          <div className="flex flex-col gap-6 md:gap-8 text-sm opacity-80">
            <div>
              <p className="uppercase tracking-widest text-xs mb-1 md:mb-2 opacity-50">Locație</p>
              <p>Str. Oituz 24, ap. 1<br/>550337 Sibiu, România</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-xs mb-1 md:mb-2 opacity-50">Contact</p>
              <p>eqdent.office@gmail.com<br/>+40 771 371 957</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-cream/20 text-xs opacity-50 gap-6 md:gap-0">
          <p>© {new Date().getFullYear()} EQ Dent. Toate drepturile rezervate.</p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mt-2 md:mt-0">
            <div className="flex items-center gap-6">
              <a href="https://www.facebook.com/EqDent.ro/" target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:opacity-100 transition-colors" aria-label="Facebook">
                <Facebook size={28} />
              </a>
              <a href="https://www.instagram.com/eq_dent/" target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:opacity-100 transition-colors" aria-label="Instagram">
                <Instagram size={28} />
              </a>
              <a href="https://www.youtube.com/@eqdent_sibiu" target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:opacity-100 transition-colors" aria-label="YouTube">
                <Youtube size={28} />
              </a>
              <a href="https://www.tiktok.com/@eq.dent?_t=ZN-8wUAiKu4k22&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:opacity-100 transition-colors" aria-label="TikTok">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
            <a href="#" className="hover:text-gold hover:opacity-100 transition-colors">Politica de Confidențialitate</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
