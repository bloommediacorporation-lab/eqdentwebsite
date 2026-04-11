import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Lenis from 'lenis';
import { useScroll, useMotionValueEvent, motion, useTransform } from 'motion/react';
import { Wallet, ShieldCheck, Clock, ClipboardList, Plane, Map, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TurismDentar() {
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const avantaje = [
    {
      icon: <Wallet size={28} />,
      title: "Costuri mai eficiente",
      desc: "Comparativ cu tratamente similare din vestul Europei"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Standarde medicale înalte",
      desc: "Materiale premium și protocoale sigure de tratament"
    },
    {
      icon: <Clock size={28} />,
      title: "Programări într-un timp scurt",
      desc: "Fără luni întregi de așteptare pentru intervenții importante"
    },
    {
      icon: <ClipboardList size={28} />,
      title: "Plan clar înainte de vizită",
      desc: "Știi din timp pașii tratamentului și durata estimată"
    },
    {
      icon: <Plane size={28} />,
      title: "Suport pe tot parcursul șederii",
      desc: "Ajutor pentru organizarea vizitei, transportului și programărilor"
    },
    {
      icon: <Map size={28} />,
      title: "Tratament într-un oraș care merită vizitat",
      desc: "Poți descoperi Sibiul în timpul perioadei de tratament"
    }
  ];

  const steps = [
    {
      num: "1",
      title: "Contactează-ne online",
      desc: "Trimite-ne istoricul tău medical și câteva fotografii și radiografii."
    },
    {
      num: "2",
      title: "Vei primi un plan personalizat",
      desc: "De tratament și costuri estimate."
    },
    {
      num: "3",
      title: "Organizăm totul împreună",
      desc: "Programări, cazare, transferuri, activități."
    }
  ];

  return (
    <div className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      <Navbar opacity={navOpacity} isScrolled={isScrolled} isOverDark={isOverDark} />
      
      {/* Fixed Hero Section */}
      <section className="fixed inset-0 w-full h-screen overflow-hidden flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 z-0 bg-cream">
        {/* Background Video - Placeholder for a nice city/travel video */}
        <motion.video 
          style={{ opacity: videoOpacity }}
          src="https://www.pexels.com/ro-ro/download/video/10800401/" 
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
              <motion.span style={{ x: textLeftX, color: textColor, opacity: mainTextOpacity }}>Turism</motion.span>
              <motion.span style={{ x: textRightX, color: textColor, opacity: mainTextOpacity }} className="italic self-end md:self-auto">Dentar</motion.span>
            </h1>
          </div>
        </div>
      </section>

      {/* Scrolling Content */}
      <div className="relative z-10 mt-[120vh]">
        
        {/* Intro Text Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 relative z-20">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-[1.2]"
            >
              Descoperă turismul dentar în <span className="italic text-gold">Sibiu</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl text-charcoal/80 font-light leading-relaxed"
            >
              Tratamente stomatologice de calitate, într-o clinică modernă, într-un oraș perfect pentru un city-break. Îți oferim confort, profesionalism și un plan personalizat, adaptat nevoilor tale și programului de călătorie—ca experiența să fie simplă, clară și fără griji.
            </motion.p>
          </div>
        </section>

        {/* Avantaje Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-cream">
          <div className="max-w-6xl mx-auto">
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-serif text-charcoal text-center mb-20"
            >
              Avantajele turismului dentar pentru pacienţi
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {avantaje.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-charcoal/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-gold/30 transition-all duration-500 group flex flex-col items-start"
                >
                  <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-500 shrink-0">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl md:text-[1.65rem] font-sans font-semibold text-charcoal mb-3 leading-tight tracking-tight">{item.title}</h4>
                  <p className="text-base text-charcoal/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cum functioneaza Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
              Cum <span className="italic text-gold">funcţionează?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-charcoal/10 z-0" />

            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gold text-white shadow-[0_8px_30px_rgba(212,175,55,0.3)] flex items-center justify-center text-4xl font-serif mb-8 hover:scale-110 transition-transform duration-500 cursor-default">
                  {step.num}
                </div>
                <h3 className="text-2xl font-sans font-semibold text-charcoal mb-4 tracking-tight">{step.title}</h3>
                <p className="text-charcoal/70 leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section data-theme="dark" className="py-24 md:py-32 px-6 md:px-12 bg-charcoal text-cream text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
                Primește planul de tratament <br className="hidden md:block" />
                <span className="italic text-gold">înainte să ajungi în Sibiu</span>
              </h2>
              
              <p className="text-lg md:text-xl text-cream/80 leading-relaxed mb-12 max-w-2xl mx-auto">
                Fără stres: primești pașii clari și costurile estimate înainte de vizită.
              </p>

              <Link 
                to="/programare"
                className="bg-gold text-white px-8 py-4 rounded-full text-lg font-medium inline-flex w-full md:w-auto justify-center items-center gap-3 hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20"
              >
                Programează-te <ArrowUpRight size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
