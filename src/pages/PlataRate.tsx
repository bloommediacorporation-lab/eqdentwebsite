import { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Lenis from 'lenis';
import { useScroll, useMotionValueEvent, motion, useTransform } from 'motion/react';
import { ArrowUpRight, CreditCard, CheckCircle2, ShieldCheck, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const RevealText = ({ text, className }: { text: string, className?: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
        const y = useTransform(progress, [0, 1], ["100%", "0%"]);
        const clipPath = useTransform(progress, [0, 1], ["inset(-15% 0 115% 0)", "inset(-15% 0 -15% 0)"]);

        return (
          <span key={i}>
            <motion.span style={{ y, clipPath }} className="inline-block">{word}</motion.span>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </p>
  );
};

export default function PlataRate() {
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

  const benefits = [
    {
      icon: <CreditCard size={28} />,
      title: "Până la 10 Rate",
      desc: "Eșalonare flexibilă pentru orice tip de tratament complex."
    },
    {
      icon: <CheckCircle2 size={28} />,
      title: "Aprobare Rapidă",
      desc: "Proces simplificat, fără birocrație inutilă."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Siguranță Totală",
      desc: "Parteneriate cu instituții financiare de încredere."
    },
    {
      icon: <Wallet size={28} />,
      title: "Fără Presiune",
      desc: "Prioritizați sănătatea fără a compromite bugetul personal."
    }
  ];

  return (
    <div className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      <Navbar opacity={navOpacity} isScrolled={isScrolled} isOverDark={isOverDark} />
      
      {/* Fixed Hero Section */}
      <section className="fixed inset-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-end pb-32 md:pb-24 px-6 md:px-12 z-0 bg-cream">
        {/* Background Video */}
        <motion.video 
          style={{ opacity: videoOpacity }}
          src="https://www.pexels.com/ro-ro/download/video/4320417/" 
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
              <motion.span style={{ x: textLeftX, color: textColor, opacity: mainTextOpacity }}>Plată</motion.span>
              <motion.span style={{ x: textRightX, color: textColor, opacity: mainTextOpacity }} className="italic self-end md:self-auto">în Rate</motion.span>
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
              className="text-3xl md:text-5xl font-serif text-charcoal leading-tight max-w-3xl mx-auto"
            >
              Excelența în stomatologie, <br />
              <span className="italic text-gold">acum mai accesibilă ca niciodată.</span>
            </motion.h2>
          </div>
        </section>

        <section className="pb-32 md:pb-48 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-24 md:mb-32">
              <div className="space-y-8">
                <RevealText 
                  text="La EQ Dent, considerăm că excelența în îngrijirea orală este fundamentul unei stări de bine depline. Recunoaștem că investiția într-un zâmbet sănătos și estetic poate fi uneori semnificativă, în special în cazul reabilitărilor complexe."
                  className="text-xl md:text-2xl text-charcoal/80 leading-relaxed font-light"
                />
                <RevealText 
                  text="Misiunea noastră este de a pune stomatologia de elită la dispoziția fiecărui pacient. De aceea, am creat soluții financiare flexibile, menite să vă ofere acces imediat la tratamentele de care aveți nevoie, fără compromisuri asupra calității sau a liniștii dumneavoastră financiare."
                  className="text-lg text-charcoal/60 leading-relaxed"
                />
              </div>
              <div className="space-y-8">
                <RevealText 
                  text="Vă oferim privilegiul de a beneficia de planuri de tratament eșalonate în până la 10 rate. O metodă sigură, discretă și eficientă, care vă permite să prioritizați sănătatea, în timp ce noi ne ocupăm de restul detaliilor."
                  className="text-lg text-charcoal/60 leading-relaxed"
                />
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="p-8 bg-white rounded-3xl border border-charcoal/5 shadow-sm"
                >
                  <h4 className="text-gold font-serif text-xl mb-4 italic">Prioritatea noastră</h4>
                  <p className="text-charcoal/80 italic">
                    "Pentru noi, zâmbetul dumneavoastră nu este doar un obiectiv medical, ci o prioritate absolută. Accesibilitatea este, în viziunea noastră, o extensie firească a grijii pe care o purtăm fiecărui pacient."
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-charcoal/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-gold/30 transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-500">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-sans font-semibold text-charcoal mb-3 tracking-tight">{benefit.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
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
                Investește în zâmbetul tău <br className="hidden md:block" />
                <span className="italic text-gold">fără griji financiare.</span>
              </h2>
              <p className="text-lg md:text-xl text-cream/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                Contactează-ne astăzi pentru a discuta despre planul tău de tratament și opțiunile de eșalonare disponibile.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                <Link to="/programare" className="bg-gold text-white px-8 py-4 rounded-full text-lg font-medium inline-flex w-full sm:w-auto justify-center items-center gap-2 hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20">
                  Programează-te <ArrowUpRight size={20} />
                </Link>
                <a href="tel:+40771371957" className="text-cream hover:text-gold transition-colors font-medium">
                  Sau sună-ne la +40 771 371 957
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
