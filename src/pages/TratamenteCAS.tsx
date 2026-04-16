import { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Lenis from 'lenis';
import { useScroll, useMotionValueEvent, motion, useTransform } from 'motion/react';
import { ArrowUpRight, CheckCircle2, FileText, CreditCard, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const preventieItems = [
  {
    title: "Consultații periodice",
    desc: "Pentru monitorizarea constantă a sănătății orale."
  },
  {
    title: "Detartraj cu ultrasunete",
    desc: "Îndepărtarea tartrului într-un mod eficient și nedureros."
  },
  {
    title: "Periaj profesional",
    desc: "Pentru o curățare profundă și o respirație proaspătă."
  },
  {
    title: "Fluorizări",
    desc: "Întărirea smalțului și prevenirea cariilor."
  },
  {
    title: "Sigilări dentare",
    desc: "Pentru dinții copiilor, ca măsură de prevenție împotriva cariilor."
  }
];

export default function TratamenteCAS() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const [isOverDark, setIsOverDark] = useState(true);

  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textColor = useTransform(scrollY, [0, 300], ["#ffffff", "#1A1A1A"]);
  const textLeftX = useTransform(scrollY, [0, 600], ["0vw", "-50vw"]);
  const textRightX = useTransform(scrollY, [0, 600], ["0vw", "50vw"]);
  const mainTextOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const darkSectionsRef = useRef<Element[]>([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      darkSectionsRef.current = Array.from(document.querySelectorAll('[data-theme="dark"]'));
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    let overDark = latest < 150;
    const navHeight = 100;
    
    for (let i = 0; i < darkSectionsRef.current.length; i++) {
      const rect = darkSectionsRef.current[i].getBoundingClientRect();
      if (rect.top <= navHeight && rect.bottom >= 50) {
        overDark = true;
        break;
      }
    }

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
          src="https://www.pexels.com/ro-ro/download/video/7803018/" 
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
             <h1 className="text-[10vw] sm:text-[11vw] md:text-[11vw] lg:text-[11.5vw] font-serif leading-[0.9] md:leading-[0.8] tracking-tight w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-0 md:gap-8">
              <motion.span style={{ x: textLeftX, color: textColor, opacity: mainTextOpacity }}>Tratamente</motion.span>
              <motion.span style={{ x: textRightX, color: textColor, opacity: mainTextOpacity }} className="italic self-end md:self-auto">CAS</motion.span>
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
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-[1.2] max-w-4xl mx-auto"
            >
              Sănătatea dentară este o necesitate, <span className="italic text-gold">nu un lux.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl text-charcoal/80 font-light max-w-3xl mx-auto leading-relaxed"
            >
              Prin parteneriatul cu Casa de Asigurări de Sănătate Sibiu, vă oferim tratamente la standarde de excelență, decontate integral sau parțial.
            </motion.p>
          </div>
        </section>

        {/* Categorii Beneficiari */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-y border-charcoal/5">
          <div className="max-w-6xl mx-auto">
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl font-serif text-charcoal text-center mb-16"
            >
              Cine beneficiază de decontare?
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Copii */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-cream p-8 rounded-2xl border border-charcoal/5"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6">
                  <UserCircle size={24} />
                </div>
                <h4 className="text-xl font-serif text-charcoal mb-4">Copii (sub 18 ani)</h4>
                <p className="text-charcoal/70 leading-relaxed">
                  Gratuitate 100% la majoritatea tratamentelor (sigilări, extracții, aparate dentare, tratamente carii etc.).
                </p>
              </motion.div>

              {/* Adulti */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-cream p-8 rounded-2xl border border-charcoal/5"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6">
                  <UserCircle size={24} />
                </div>
                <h4 className="text-xl font-serif text-charcoal mb-4">Adulți</h4>
                <p className="text-charcoal/70 leading-relaxed">
                  Tratamente specifice decontate integral sau parțial (urgențe, extracții, tratamente endodontice etc.).
                </p>
              </motion.div>

              {/* Pensionari */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-cream p-8 rounded-2xl border border-charcoal/5"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6">
                  <UserCircle size={24} />
                </div>
                <h4 className="text-xl font-serif text-charcoal mb-4">Pensionari</h4>
                <p className="text-charcoal/70 leading-relaxed">
                  Condiții speciale pentru proteze acrilice (decontate o dată la 10 ani) și alte nevoi specifice vârstei.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pachete de preventie */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight max-w-3xl mx-auto">
              Pachetele de prevenţie <span className="italic text-gold">decontate</span> prin CAS includ:
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preventieItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-charcoal/5 hover:border-gold/30 transition-colors group"
              >
                <div className="mb-6 text-gold/50 group-hover:text-gold transition-colors">
                  <CheckCircle2 size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-charcoal mb-3">{item.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Documente Necesare & CTA */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-white text-charcoal text-center border-t border-charcoal/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-12">
                Documente <span className="italic text-gold">Necesare</span>
              </h2>
              
              <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mb-20">
                <div className="flex items-center gap-4 bg-cream p-6 rounded-xl border border-charcoal/5">
                  <CreditCard className="text-gold" size={28} />
                  <span className="text-lg font-medium">Card de Sănătate</span>
                </div>
                <div className="flex items-center gap-4 bg-cream p-6 rounded-xl border border-charcoal/5">
                  <FileText className="text-gold" size={28} />
                  <span className="text-lg font-medium">Carte de Identitate</span>
                </div>
              </div>

              <div className="bg-cream p-8 md:p-12 rounded-2xl border border-charcoal/5">
                <h3 className="text-2xl font-serif mb-4 text-gold">Important: Plafon lunar limitat</h3>
                <p className="text-lg text-charcoal/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                  Fondurile alocate de Casa de Asigurări de Sănătate sunt limitate în fiecare lună. Vă recomandăm să vă programați la începutul lunii pentru a beneficia de decontare.
                </p>
                <Link to="/programare" className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium inline-flex w-full md:w-auto justify-center items-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-black/20 text-center">
                  Programează-te pentru un consult CAS <ArrowUpRight size={20} className="shrink-0" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
