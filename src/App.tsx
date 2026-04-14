import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from 'motion/react';
import { ArrowUpRight, Menu, Plus, ChevronDown } from 'lucide-react';
import Lenis from 'lenis';

const VIDEOS = [
  "https://www.pexels.com/ro-ro/download/video/5356198/",
  "https://www.pexels.com/ro-ro/download/video/36852704/",
  "https://www.pexels.com/ro-ro/download/video/36690443/",
  "https://www.pexels.com/ro-ro/download/video/7803464/"
];

import { Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Hero
const Hero = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const clipLeftDesktop = useTransform(scrollYProgress, [0, 0.5], ["50%", "0%"]);
  const clipLeftMobile = useTransform(scrollYProgress, [0, 0.5], ["0%", "0%"]);
  const clipLeft = isMobile ? clipLeftMobile : clipLeftDesktop;
  
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);
  const initialTextVisibility = useTransform(scrollYProgress, (v: number) => v < 0.08 ? "visible" : "hidden");
  const fullscreenTextOpacity = useTransform(scrollYProgress, [0.02, 0.15], [0, 1]);
  const fullscreenTextY = useTransform(scrollYProgress, [0.02, 0.15], [50, 0]);
  const clipPathStyle = useMotionTemplate`inset(0% 0% 0% ${clipLeft})`;

  return (
    <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden bg-cream">
      {/* Left Half */}
      <div className="absolute left-0 top-0 w-full md:w-1/2 h-full bg-cream z-10">
        <motion.div style={{ opacity: initialTextOpacity, visibility: initialTextVisibility as any }} className="absolute bottom-16 left-10 md:left-16">
          <p className="text-[11px] text-charcoal/40 uppercase tracking-widest mb-3 font-semibold">Sediu în:</p>
          <div className="text-sm font-medium leading-snug text-charcoal">
            <p>Sibiu,</p>
            <p>România</p>
          </div>
        </motion.div>
      </div>

      {/* Right Half */}
      <motion.div 
        style={{ clipPath: clipPathStyle }}
        className="absolute right-0 top-0 w-full h-full z-20 bg-charcoal overflow-hidden"
      >
        <AnimatePresence>
          <motion.video 
            key={currentVideoIndex}
            src={VIDEOS[currentVideoIndex]}
            autoPlay 
            muted 
            playsInline
            onEnded={() => setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Warm, lighter overlay */}
        <div className="absolute inset-0 bg-[#4A3B32]/30 mix-blend-multiply z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
        
        <motion.div style={{ opacity: initialTextOpacity, visibility: initialTextVisibility as any }} className="hidden md:block absolute bottom-16 left-[50%] ml-10 md:ml-16 z-20 text-white pointer-events-none">
          <p className="font-serif italic text-xl md:text-2xl max-w-[340px] leading-relaxed drop-shadow-md text-white/95">
            Combinăm știința dentară avansată<br/>cu mâna unui artist.
          </p>
        </motion.div>

        {/* Fullscreen Text Overlay */}
        <motion.div 
          style={{ opacity: fullscreenTextOpacity, y: fullscreenTextY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white"
        >
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-center max-w-5xl leading-tight mb-24 drop-shadow-lg px-6">
            Zâmbetul tău, <br className="md:hidden"/><span className="italic font-normal">perfecționat fără efort</span>
          </h2>

          <div className="absolute bottom-8 md:bottom-16 w-full px-4 md:px-12 flex flex-wrap justify-center md:grid md:grid-cols-3 gap-3 md:gap-8 text-center">
            <div className="w-full sm:w-auto">
              <p className="text-[10px] md:text-sm uppercase tracking-widest font-medium">Restaurare pe Implant</p>
            </div>
            <div className="w-full sm:w-auto">
              <p className="text-[10px] md:text-sm uppercase tracking-widest font-medium">Estetică Avansată</p>
            </div>
            <div className="w-full sm:w-auto">
              <p className="text-[10px] md:text-sm uppercase tracking-widest font-medium">Stomatologie Restaurativă</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Spanning Typography with Clip Path for perfect split */}
      <motion.div style={{ opacity: initialTextOpacity, visibility: initialTextVisibility as any }} className="absolute top-[22vh] left-0 w-full pointer-events-none z-30">
        
        {/* Base Layer (Dark text for the left side) */}
        <div className="w-full text-center flex flex-col items-center justify-center text-charcoal">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8.5vw] sm:text-[10vw] md:text-[9.5vw] leading-[0.85] font-serif font-medium whitespace-nowrap tracking-tight"
          >
            Stomatologie
          </motion.h1>
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8.5vw] sm:text-[10vw] md:text-[9.5vw] leading-[0.85] font-serif font-medium whitespace-nowrap tracking-tight"
          >
            Estetică <span className="italic font-normal">Premium</span>
          </motion.h1>
        </div>

        {/* Top Layer (White text for the right side, clipped exactly at 50%) */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full text-center flex flex-col items-center justify-center text-white"
          style={{ clipPath: clipPathStyle }}
        >
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8.5vw] sm:text-[10vw] md:text-[9.5vw] leading-[0.85] font-serif font-medium whitespace-nowrap tracking-tight"
          >
            Stomatologie
          </motion.h1>
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8.5vw] sm:text-[10vw] md:text-[9.5vw] leading-[0.85] font-serif font-medium whitespace-nowrap tracking-tight"
          >
            Estetică <span className="italic font-normal">Premium</span>
          </motion.h1>
        </motion.div>

      </motion.div>
    </div>
  );
};

// Services
const services = [
  { title: "Stomatologie Cosmetică", desc: "Fațete, albire și transformări complete ale zâmbetului adaptate esteticii faciale." },
  { title: "Implantologie", desc: "Înlocuirea dinților cu tehnologie de ultimă generație, restabilind funcția și aspectul natural." },
  { title: "Ortodonție", desc: "Aliniatori invizibili și aparate dentare moderne pentru o îndreptare precisă și confortabilă." },
  { title: "Îngrijire Generală", desc: "Întreținere completă, prevenție și tratamente restaurative pentru o sănătate de durată." }
];

const RevealWord = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
};

const PremiumRevealText = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 85%", "end 50%"]
  });

  const text = "Oferim îngrijire dentară și estetică de talie mondială prin tehnici avansate, tratamente personalizate și un nivel de servicii bespoke care face fiecare pacient să se simtă cu adevărat prețuit.";
  const words = text.split(" ");

  return (
    <div ref={container} className="mt-8 md:mt-0 max-w-lg">
      <p className="text-2xl md:text-3xl leading-snug font-serif text-charcoal">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return <RevealWord key={i} progress={scrollYProgress} range={[start, end]}>{word}</RevealWord>;
        })}
      </p>
    </div>
  );
};

const Services = () => {
  return (
    <section className="py-20 md:py-48 px-6 md:px-12 bg-cream text-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-serif max-w-2xl leading-tight">
            Ridicăm standardul în <span className="italic text-gold">îngrijirea dentară</span>.
          </h2>
          <PremiumRevealText />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-24 border-t border-charcoal/10 pt-12 md:pt-16">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <h3 className="text-2xl md:text-3xl font-serif">{service.title}</h3>
                <div className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-charcoal group-hover:text-cream transition-colors">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <p className="text-charcoal/70 max-w-md">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About
const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} data-theme="dark" className="py-24 md:py-48 px-6 md:px-12 bg-charcoal text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20 items-center">
        {/* Image Column (40%) */}
        <div className="w-full md:w-5/12 relative">
          <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm relative">
            <motion.img 
              style={{ y: imageY, scale: 1.15 }}
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop" 
              alt="EQ Dent Clinic" 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90"
            />
            {/* Subtle overlay for mood */}
            <div className="absolute inset-0 bg-charcoal/20 mix-blend-multiply" />
          </div>
        </div>
        
        {/* Text Column (60%) */}
        <div className="w-full md:w-7/12 flex flex-col mt-12 md:mt-0 md:pl-10 relative z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight"
          >
            Fă cunoștință cu <br/>
            <span className="block text-5xl md:text-7xl lg:text-[100px] italic text-gold mt-2 md:-ml-8 drop-shadow-lg">
              Dr. Alexandru
            </span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-16 space-y-8 md:space-y-10"
          >
            <p className="text-xl md:text-3xl font-light text-cream/95 leading-relaxed max-w-2xl">
              La EQ Dent, credem că stomatologia este la fel de mult o artă pe cât este o știință. Situată în inima Sibiului, clinica noastră a fost fondată pe principiul calității fără compromisuri.
            </p>
            <p className="text-base md:text-lg text-cream/60 leading-loose max-w-xl">
              Dr. Alexandru aduce ani de experiență specializată în stomatologia estetică și restaurativă, tratând fiecare zâmbet ca pe o pânză unică. Nu doar reparăm dinți; redăm încrederea, funcția și frumusețea naturală.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="mt-12 border-b border-gold text-gold pb-1 flex items-center gap-2 hover:opacity-70 transition-opacity uppercase tracking-widest text-sm font-medium w-fit">
              Citește Povestea <ArrowUpRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonials
const REVIEWS = [
  {
    text: "Recomand cu toată încrederea! O echipă de profesioniști, atenți la detalii și foarte răbdători. Clinica este modernă, curată, iar aparatura este de ultimă generație. Dr. Alexandru mi-a explicat fiecare pas al tratamentului. Rezultatele sunt peste așteptări!",
    author: "Maria Popescu"
  },
  {
    text: "Cea mai bună experiență la stomatolog de până acum. Servicii premium, atmosferă relaxantă și personal extrem de amabil. Mi-am pus fațete dentare și rezultatul este absolut superb, arată foarte natural. Voi reveni cu siguranță!",
    author: "Andrei Ionescu"
  },
  {
    text: "Am ajuns la EQ Dent cu o urgență și am fost preluată imediat. Profesionalism la superlativ! Totul decurge fără durere, într-un mediu impecabil. Se vede că pun accent pe confortul pacientului și pe calitatea materialelor.",
    author: "Elena Muntean"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-48 px-6 md:px-12 bg-cream text-charcoal overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-8 md:mb-12">
          <p className="text-xs md:text-sm uppercase tracking-widest text-gold">Recenzii Google</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        <div className="relative min-h-[350px] md:min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif leading-tight mb-8 md:mb-12">
                "{REVIEWS[currentIndex].text}"
              </h2>
              <p className="font-medium text-charcoal/80">— {REVIEWS[currentIndex].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'bg-gold w-8' : 'bg-charcoal/20 hover:bg-charcoal/40'
              }`}
              aria-label={`Vezi recenzia ${idx + 1}`}
            />
          ))}
        </div>
        
        <a 
          href="https://www.google.com/maps/place/Eq+Dent+-+Clinic%C4%83+dentar%C4%83/@45.7860044,24.150248,17z/data=!3m1!4b1!4m6!3m5!1s0x8e092ffde40bccd3:0xf2e09db7a1ad0ace!8m2!3d45.7860007!4d24.1528229!16s%2Fg%2F11mcjj5pwq"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 border-b border-charcoal/30 pb-1 text-sm uppercase tracking-widest hover:border-charcoal transition-colors font-medium"
        >
          Vezi toate recenziile pe Google
        </a>
      </div>
    </section>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const [isOverDark, setIsOverDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroEnd = window.innerWidth < 768 ? window.innerHeight * 0.5 : window.innerHeight * 2; // Approximate end of the sticky hero section
    
    if (latest < 50) {
      setNavOpacity(1);
      setIsScrolled(false);
    } else if (latest >= 50 && latest < heroEnd) {
      setNavOpacity(window.innerWidth < 768 ? 1 : 0);
      setIsScrolled(window.innerWidth < 768 ? true : false);
    } else {
      setNavOpacity(1);
      setIsScrolled(true);
    }

    // Check if navbar is over a dark section
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    let overDark = false;
    
    // On mobile, the hero section video is full screen, so the background is dark
    if (window.innerWidth < 768 && latest < heroEnd) {
      overDark = true;
    }
    
    const navHeight = 100; // approximate navbar height
    
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
      wheelMultiplier: 1,
      touchMultiplier: 2,
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
      
      <div ref={containerRef} className="relative h-[150vh] md:h-[300vh]">
        <Hero scrollYProgress={scrollYProgress} />
      </div>

      <Services />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
}
