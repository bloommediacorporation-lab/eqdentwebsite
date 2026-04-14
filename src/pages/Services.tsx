import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'motion/react';
import { ArrowUpRight, Menu, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

function AnimatedWord({ word, index, total, progress }: { word: string, index: number, total: number, progress: MotionValue<number> }) {
  const wordProgress = useTransform(progress, (p) => {
    const wordTurn = (index - 3) / total;
    const wordStep = 1 / total;
    const wp = (p - wordTurn) / wordStep;
    return Math.max(0, Math.min(1, wp));
  });

  const y = useTransform(wordProgress, (p) => `${100 - p * 100}%`);
  const clipPath = useTransform(wordProgress, (p) => `inset(-15% 0 ${115 - p * 130}% 0)`);

  return (
    <span className="inline-flex overflow-visible align-bottom">
      <motion.span style={{ y, clipPath }} className="inline-block will-change-transform">{word}</motion.span>
    </span>
  );
}

// Services Data
const servicesData = [
  {
    category: "Consultaţie",
    items: [
      { name: "Consultație și plan de tratament personalizat", price: "150 RON" }
    ]
  },
  {
    category: "Profilaxie",
    items: [
      { name: "Igienizare profesională", price: "400 RON" },
      { name: "Igienizare periodică la 6 luni", price: "300 RON" }
    ]
  },
  {
    category: "Tratament carii",
    items: [
      { name: "Obturație compozit simplă", price: "250 RON" },
      { name: "Obturație compozit medie", price: "300 RON" },
      { name: "Obturație compozit complexă", price: "350 RON" },
      { name: "Obturație compozit dinte frontal", price: "400 RON" }
    ]
  },
  {
    category: "Tratament canal (endodonţie)",
    items: [
      { name: "Extirpare nerv per canal", price: "250 RON" },
      { name: "Obturație endodontică per canal", price: "250 RON" },
      { name: "Drenaj endodontic", price: "100 RON" },
      { name: "Retratament per canal", price: "300 RON" },
      { name: "Pivot din fibră de sticlă", price: "300 RON" },
      { name: "MTA / Dinte", price: "150 RON" }
    ]
  },
  {
    category: "Parodontologie",
    items: [
      { name: "Consult parodontal complet", price: "250 RON" },
      { name: "Detartraj supra și subgingival + airflow", price: "400 RON" },
      { name: "Chiuretaj subgingival per dinte", price: "100 RON" },
      { name: "Chiuretaj subgingival per arcadă", price: "1000 RON" },
      { name: "Chiuretaj în câmp deschis per dinte", price: "200 – 300 RON" },
      { name: "Operație cu lambou fără adiție per dinte", price: "400 – 500 RON" },
      { name: "Operație cu lambou cu adiție osoasă per dinte", price: "700 – 800 RON" },
      { name: "Grefă gingivală liberă per dinte", price: "1.000 RON" },
      { name: "Tratament cu Emdogain per dinte", price: "500 RON" },
      { name: "Imobilizare cu fibră de sticlă per dinte", price: "120 RON" },
      { name: "Imobilizare cu fibră de sticlă per arcadă", price: "700 RON" },
      { name: "Gingivectomie per dinte", price: "200 RON" }
    ]
  },
  {
    category: "Pedodonţie",
    items: [
      { name: "Igienizare profesională", price: "150 RON" },
      { name: "Fluorizare per arcadă", price: "100 RON" },
      { name: "Obturație glassionomer", price: "150 RON" },
      { name: "Sigilare", price: "100 RON" },
      { name: "Extracție dinte temporar", price: "100 RON" },
      { name: "Coafaj direct MTA", price: "150 RON" },
      { name: "Tratament endodontic dinți temporari", price: "250 RON" }
    ]
  },
  {
    category: "Ortodonţie",
    items: [
      { name: "Consult ortodontic", price: "150 RON" },
      { name: "Aplicare aparat metalic per arcadă", price: "2300 RON" },
      { name: "Aplicare aparat safir per arcadă", price: "3000 RON" },
      { name: "Aplicare sistem Spark10 / arcadă", price: "5000 RON" },
      { name: "Aplicare sistem Spark20 / arcadă", price: "10000 RON" },
      { name: "Aplicare sistem Spark35 bimaxilar", price: "15.000 - 25.000 RON" },
      { name: "Activare aparat ortodontic", price: "150 RON" },
      { name: "Îndepărtat aparat dentar + gutieră contenție", price: "500 RON" }
    ]
  },
  {
    category: "Estetică dentară",
    items: [
      { name: "Albire dentară", price: "300 lei/ ședință" },
      { name: "Fațete dentare E-MAX", price: "1800 RON" },
      { name: "Fațete compozit direct", price: "700 RON" }
    ]
  },
  {
    category: "Protetică",
    items: [
      { name: "Coroană metalo-ceramică", price: "850 RON" },
      { name: "Coroană zirconiu monolitic", price: "1200 RON" },
      { name: "Coroană ceramică E-MAX", price: "1500 RON" },
      { name: "Coroană metalo-ceramică pe implant", price: "1500 RON" },
      { name: "Coroană zirconiu pe implant", price: "2000 RON" },
      { name: "Proteză scheletată", price: "4000 RON" },
      { name: "Proteză totală acrilică", price: "2000 RON" },
      { name: "Proteză totală elastică", price: "2500 RON" },
      { name: "Supraproteză pe implant", price: "3000 RON" },
      { name: "Lucrare provizorie / element", price: "150 RON" },
      { name: "DCR metalic", price: "200 RON" },
      { name: "DCR zirconiu", price: "300 RON" },
      { name: "Proteză definitivă All-on-4 (suport titan și coroane individualizate)", price: "15000 RON" },
      { name: "Proteză definitivă All-on-6 (suport titan și coroane individualizate)", price: "20000 RON" },
      { name: "Proteză provizorie All-on-4 / All-on-6", price: "2000 RON" },
      { name: "Bont protetic ICX", price: "500 RON" },
      { name: "Bont protetic Osstem", price: "700 RON" },
      { name: "Bont protetic Bredent", price: "900 RON" },
      { name: "Bont multiunit ICX", price: "700 RON" },
      { name: "Bont multiunit Bredent", price: "900 RON" },
      { name: "Bont multiunit Bredent", price: "1100 RON" },
      { name: "Bont titan personalizat", price: "1000 RON" },
      { name: "Bont zirconiu personalizat", price: "1200 RON" }
    ]
  },
  {
    category: "Implanturi",
    items: [
      { name: "Implant ICX", price: "2000 RON" },
      { name: "Implant Osstem", price: "2500 RON" },
      { name: "Implant Bredent", price: "3000 RON" },
      { name: "Descoperire implant", price: "200 - 300 RON" }
    ]
  },
  {
    category: "Chirurgie",
    items: [
      { name: "Extracție dinte monoradicular", price: "200 RON" },
      { name: "Extracție dinte pluriradicular", price: "300 RON" },
      { name: "Extracție molar de minte", price: "450 RON" },
      { name: "Odontectomie molar", price: "600 RON" },
      { name: "Sinus Lift extern", price: "2000 - 4000 RON" },
      { name: "Augmentare osoasă", price: "1000 - 3000 RON" },
      { name: "PRF (aplicat postchirurgical)", price: "300 RON" },
      { name: "Membrană resorbabilă", price: "500 RON" },
      { name: "Mini implant ortodontic", price: "400 RON" },
      { name: "Rezecție apicală monoradicular", price: "900 RON" },
      { name: "Rezecție apicală pluriradicular", price: "1200 RON" },
      { name: "Frenectomie", price: "300 RON" }
    ]
  }
];

const paragraphs = [
  "Indiferent dacă dorești să corectezi imperfecțiuni minore sau să obții o transformare completă a zâmbetului, soluțiile noastre abordează o gamă largă de nevoi estetice și funcționale. De la albire dentară la fațete din porțelan și reabilitări orale complexe, adaptăm fiecare tratament dorințelor tale unice, asigurând o experiență confortabilă și personalizată.",
  "Echipa noastră de profesioniști folosește cele mai noi tehnologii și tehnici pentru a restabili și îmbunătăți aspectul dinților tăi, oferindu-ți încrederea de a zâmbi liber. Fie că ești în căutarea unor îmbunătățiri subtile sau a unei transformări dramatice, serviciile noastre premium te pot ajuta să obții zâmbetul pe care ți l-ai dorit dintotdeauna.",
  "Folosim materiale de ultimă generație și tehnici avansate pentru a ne asigura că fiecare restaurare arată și se simte natural, fiind în același timp durabilă și de lungă durată. Abordarea noastră se concentrează nu doar pe estetică, ci și pe sănătatea și funcționalitatea dinților tăi, asigurându-ne că zâmbetul tău este la fel de puternic pe cât este de frumos."
];
const totalWords = paragraphs.reduce((acc, p) => acc + p.split(" ").length, 0);

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const [isOverDark, setIsOverDark] = useState(true);
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: paragraphsProgress } = useScroll({
    target: paragraphsRef,
    offset: ["start 85%", "end 50%"]
  });

  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textColor = useTransform(scrollY, [0, 300], ["#ffffff", "#1A1A1A"]);
  const textLeftX = useTransform(scrollY, [0, 600], ["0vw", "-50vw"]);
  const textRightX = useTransform(scrollY, [0, 600], ["0vw", "50vw"]);
  const statsOpacity = useTransform(scrollY, [0, 300], [1, 0]);
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
          src="https://www.pexels.com/ro-ro/download/video/6630297/" 
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
          <motion.div style={{ opacity: statsOpacity }}>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <div className="flex gap-8 md:gap-24 mb-4 md:mb-8">
                <div className="flex flex-col">
                  <motion.span style={{ color: textColor }} className="text-4xl md:text-5xl font-serif">4</motion.span>
                  <motion.span style={{ color: textColor, borderColor: textColor }} className="text-xs uppercase tracking-widest opacity-80 border-b pb-1">Soluții<br/>Experte</motion.span>
                </div>
                <div className="flex flex-col">
                  <motion.span style={{ color: textColor }} className="text-4xl md:text-5xl font-serif">36k+</motion.span>
                  <motion.span style={{ color: textColor, borderColor: textColor }} className="text-xs uppercase tracking-widest opacity-80 border-b pb-1">Pacienți<br/>Tratați</motion.span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="w-full flex justify-between items-end">
             <h1 className="text-[14vw] md:text-[11vw] lg:text-[11.5vw] font-serif leading-[0.9] md:leading-[0.8] tracking-tight w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-0 md:gap-8">
              <motion.span style={{ x: textLeftX, color: textColor, opacity: mainTextOpacity }}>Servicii</motion.span>
              <motion.span style={{ x: textRightX, color: textColor, opacity: mainTextOpacity }} className="italic self-end md:self-auto">Premium</motion.span>
            </h1>
          </div>
        </div>
      </section>

      {/* Scrolling Content */}
      <div className="relative z-10 mt-[120vh]">
        {/* Intro Text Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-[1.1] text-center max-w-4xl mx-auto">
            Stomatologie premium creată pentru a-ți îmbunătăți și transforma zâmbetul.
          </h2>
          <div className="flex justify-end">
            <div ref={paragraphsRef} className="md:w-1/2 flex flex-col gap-8 text-charcoal/80 text-lg md:text-xl leading-relaxed font-medium">
              {paragraphs.map((p, pIndex) => {
                const words = p.split(" ");
                const startIndex = paragraphs.slice(0, pIndex).reduce((acc, prevP) => acc + prevP.split(" ").length, 0);
                return (
                  <p key={pIndex} className="m-0">
                    {words.map((word, wIndex) => (
                      <span key={wIndex}>
                        <AnimatedWord 
                          word={word} 
                          index={startIndex + wIndex} 
                          total={totalWords} 
                          progress={paragraphsProgress} 
                        />
                        {wIndex < words.length - 1 && " "}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services List - Premium Accordion */}
      <section className="pb-20 md:pb-32 px-6 md:px-12 bg-cream relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-charcoal/20">
            {servicesData.map((category, index) => {
              const isOpen = openCategory === index;
              return (
                <div key={index} className="border-b border-charcoal/20">
                  <button 
                    onClick={() => setOpenCategory(isOpen ? null : index)}
                    className="w-full py-8 md:py-12 flex justify-between items-center group text-left"
                  >
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className="text-sm md:text-base font-serif italic text-charcoal/40 w-6 md:w-8">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-charcoal group-hover:text-gold transition-colors duration-500">
                        {category.category}
                      </h2>
                    </div>
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${isOpen ? 'bg-charcoal border-charcoal text-cream rotate-45' : 'border-charcoal/20 text-charcoal group-hover:border-gold group-hover:text-gold'}`}>
                      <Plus size={24} className="stroke-[1.5]" />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-12 pt-2 md:pl-20">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-2">
                            {category.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-end border-b border-charcoal/10 py-4 group/item hover:border-gold/50 transition-colors">
                                <span className="text-base md:text-lg text-charcoal/80 pr-4 group-hover/item:text-charcoal transition-colors leading-snug">{item.name}</span>
                                <span className="text-base md:text-lg font-medium text-charcoal whitespace-nowrap">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
