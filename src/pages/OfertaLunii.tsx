import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Lenis from 'lenis';
import { useScroll, useMotionValueEvent, motion, useTransform } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  "Calitate germană de încredere, recunoscută la nivel internațional",
  "Biocompatibilitate ridicată – risc minim de respingere, integrare osoasă optimă",
  "Longevitate și stabilitate excelentă, chiar și în condiții solicitante",
  "Rezultat estetic natural, adaptat perfect structurii dentare"
];

export default function OfertaLunii() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const [isOverDark, setIsOverDark] = useState(true);

  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textColor = useTransform(scrollY, [0, 300], ["#ffffff", "#1A1A1A"]);
  const textLeftX = useTransform(scrollY, [0, 600], ["0vw", "-50vw"]);
  const textRightX = useTransform(scrollY, [0, 600], ["0vw", "50vw"]);
  const mainTextOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    let overDark = latest < 150;

    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    const navHeight = 100;
    
    darkSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navHeight && rect.bottom >= 50) {
        overDark = true;
      }
    });

    setIsOverDark(overDark);
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      <Navbar opacity={navOpacity} isScrolled={isScrolled} isOverDark={isOverDark} />
      
      {/* Fixed Hero Section */}
      <section className="fixed inset-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-end pb-32 md:pb-24 px-6 md:px-12 z-0 bg-cream">
        {/* Background Video */}
        <motion.video 
          style={{ opacity: videoOpacity }}
          src="https://www.pexels.com/ro-ro/download/video/6630295/" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay */}
        <motion.div style={{ opacity: videoOpacity }} className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        {/* Gradient for text readability */}
        <motion.div style={{ opacity: videoOpacity }} className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

        <div className="w-full relative z-20">
          <div className="w-full flex justify-between items-end">
             <h1 className="text-[14vw] md:text-[11vw] lg:text-[11.5vw] font-serif leading-[0.9] md:leading-[0.8] tracking-tight w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-0 md:gap-8">
              <motion.span style={{ x: textLeftX, color: textColor, opacity: mainTextOpacity }}>Oferta</motion.span>
              <motion.span style={{ x: textRightX, color: textColor, opacity: mainTextOpacity }} className="italic self-end md:self-auto">Lunii</motion.span>
            </h1>
          </div>
        </div>
      </section>

      {/* Scrolling Content */}
      <div className="relative z-10 mt-[120vh]">
        {/* Intro Text Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 relative z-20">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 md:gap-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-8xl font-serif text-charcoal leading-[1.1]"
            >
              Implant Dentar <span className="italic">ICX</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-3xl text-charcoal/80 font-light max-w-3xl mx-auto"
            >
              Tehnologie germană de top, acum la un preț special.
            </motion.p>
          </div>
        </section>

        <main className="py-12 md:py-20 px-6 md:px-12 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight mb-8">
              În această lună, vă oferim posibilitatea de a beneficia de un implant dentar ICX la <span className="text-gold italic font-medium">doar 300€</span>
            </h2>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">
              O investiție inteligentă în sănătatea și estetica zâmbetului dumneavoastră.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-charcoal/5 mb-20"
          >
            <h3 className="text-2xl md:text-4xl font-serif text-charcoal text-center mb-12">De ce ICX?</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-1">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <p className="text-base md:text-lg text-charcoal/80 leading-relaxed">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-3xl mx-auto">
              ICX este alegerea ideală pentru pacienții care doresc un implant durabil, sigur și confortabil, realizat la cele mai înalte standarde.
            </p>
            <p className="text-lg md:text-xl text-charcoal font-medium leading-relaxed max-w-3xl mx-auto">
              Oferta este limitată, iar programările se ocupă rapid. Contactați-ne acum pentru o consultație și beneficiați de această oportunitate unică!
            </p>
            
            <div className="pt-8">
              <Link to="/programare" className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium inline-flex w-full md:w-auto justify-center items-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-black/20">
                Programează-Te Acum <ArrowUpRight size={20} />
              </Link>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
