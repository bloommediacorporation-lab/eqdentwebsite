import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, ArrowUpRight, Plus, X } from 'lucide-react';

const dropdownServices = [
  "Consultaţie",
  "Profilaxie",
  "Tratament carii",
  "Tratament canal (endodonţie)",
  "Parodontologie",
  "Pedodonţie",
  "Ortodonţie",
  "Estetică dentară",
  "Protetică",
  "Implanturi",
  "Chirurgie"
];

export const Navbar = ({ opacity, isScrolled, isOverDark }: { opacity: any, isScrolled: boolean, isOverDark: boolean }) => {
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const leftTextColor = isOverDark ? 'text-cream' : 'text-charcoal';
  const leftBorderColor = isOverDark ? 'border-cream' : 'border-charcoal';
  
  const rightTextColor = isOverDark ? 'text-cream' : (isScrolled ? 'text-charcoal' : 'text-white');
  const rightSubTextColor = isOverDark ? 'text-cream/60' : (isScrolled ? 'text-charcoal/60' : 'text-white/60');
  
  const btnClass = isOverDark 
    ? 'bg-cream text-charcoal border-cream hover:bg-cream/90' 
    : (isScrolled ? 'bg-charcoal text-white border-charcoal hover:bg-charcoal/90' : 'bg-white text-charcoal border-charcoal/10 hover:bg-cream');

  return (
    <motion.nav 
      style={{ opacity: isMobileMenuOpen ? 1 : opacity }} 
      className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-between items-center pointer-events-none transition-all duration-500`}
    >
      {/* Left Section */}
      <div className={`flex items-center gap-12 pointer-events-auto transition-colors duration-500 shrink-0 ${leftTextColor}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0">
          <img 
            src="https://i.postimg.cc/qvrP42g1/imagine-fara-fundal-(2).png" 
            alt="EQ Dent Logo" 
            className="h-10 sm:h-12 md:h-16 w-auto object-contain"
          />
          <span className="font-serif font-medium text-lg sm:text-xl md:text-2xl tracking-tight whitespace-nowrap">
            EQ Dent
          </span>
        </Link>

        {/* Desktop Links Left */}
        <div className="hidden lg:flex items-center gap-8 text-base font-medium h-full">
          {/* Menu Dropdown */}
          <div 
            className="relative flex items-center h-full py-2"
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
          >
            <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              Meniu <Menu size={18} />
            </button>

            <AnimatePresence>
              {isMenuHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-4 w-64 pointer-events-auto flex flex-col"
                >
                  <div className="bg-white shadow-2xl overflow-hidden flex flex-col rounded-sm">
                    <Link to="/oferta-lunii" className="px-5 py-4 bg-[#3b4046] text-white hover:bg-[#2d3136] transition-colors text-sm font-medium">
                      Oferta lunii
                    </Link>
                    <div className="py-2 flex flex-col">
                      <Link to="/tratamente-cas" className="px-5 py-3 text-[#1a4a7b] hover:bg-gray-50 transition-colors text-sm font-medium">
                        Tratamente decontate prin CAS
                      </Link>
                      <Link to="/turism-dentar" className="px-5 py-3 text-[#1a4a7b] hover:bg-gray-50 transition-colors text-sm font-medium">
                        Turism Dentar
                      </Link>
                      <Link to="/plata-rate" className="px-5 py-3 text-[#1a4a7b] hover:bg-gray-50 transition-colors text-sm font-medium">
                        Plata în rate
                      </Link>
                      <Link to="/programare" className="px-5 py-3 text-[#1a4a7b] hover:bg-gray-50 transition-colors text-sm font-medium">
                        Programare
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Services Dropdown */}
          <div 
            className="relative flex items-center h-full py-2"
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
          >
            <Link to="/servicii" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              Servicii <ChevronDown size={18} className={`transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />
            </Link>
            
            <AnimatePresence>
              {isServicesHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-4 w-64 pointer-events-auto"
                >
                  <div className="bg-cream border border-charcoal/10 shadow-2xl rounded-sm overflow-hidden flex flex-col">
                    <div className="py-3 flex flex-col">
                      {dropdownServices.map((service, idx) => (
                        <Link 
                          key={idx} 
                          to={`/servicii`} 
                          className="px-5 py-2.5 text-charcoal hover:bg-charcoal/5 hover:text-gold transition-colors text-sm font-medium"
                        >
                          {service}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-8 pointer-events-auto shrink-0">
        {/* Desktop Links Right */}
        <div className={`hidden lg:flex items-center gap-8 text-base font-medium transition-colors duration-500 ${rightTextColor}`}>
          <Link to="/programare" className="flex items-center gap-1 hover:opacity-70 transition-opacity">
            Programează-te <ArrowUpRight size={18} />
          </Link>
          <div className="flex flex-col items-start">
            <button className="flex items-center gap-1 hover:opacity-70 transition-opacity">
              +40 771 371 957 <ChevronDown size={18} />
            </button>
            <span className={`text-[11px] font-normal mt-0.5 transition-colors duration-500 ${rightSubTextColor}`}>Sibiu</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className={`lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border transition-colors ${isOverDark ? 'border-cream text-cream' : (isScrolled ? 'border-charcoal/20 text-charcoal' : 'border-white/20 text-white')}`}
        >
          <Menu size={18} />
        </button>

        {/* CTA Button */}
        <Link to="/programare" className={`px-4 py-2.5 sm:px-5 sm:py-3 md:px-8 md:py-4 rounded-full text-[13px] sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm border shrink-0 whitespace-nowrap ${btnClass}`}>
          <span className="hidden sm:inline">Programează-te</span>
          <span className="sm:hidden">Programare</span>
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-cream z-[100] flex flex-col pointer-events-auto overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center px-6 py-6 border-b border-charcoal/10">
              <Link to="/" className="flex items-center gap-2 text-charcoal">
                <img 
                  src="https://i.postimg.cc/qvrP42g1/imagine-fara-fundal-(2).png" 
                  alt="EQ Dent Logo" 
                  className="h-10 w-auto object-contain"
                />
                <span className="font-serif font-medium text-xl tracking-tight">
                  EQ Dent
                </span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex-1 px-6 py-10 flex flex-col gap-8">
              <Link to="/" className="text-3xl font-serif text-charcoal">Acasă</Link>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="text-3xl font-serif text-charcoal flex items-center justify-between"
                >
                  Servicii
                  <ChevronDown size={24} className={`transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col gap-3 pl-4 border-l-2 border-gold/30"
                    >
                      <Link to="/servicii" className="text-lg text-charcoal/80 py-2 font-medium">Toate Serviciile</Link>
                      {dropdownServices.map((service, idx) => (
                        <Link 
                          key={idx} 
                          to="/servicii" 
                          className="text-lg text-charcoal/60 py-1"
                        >
                          {service}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/oferta-lunii" className="text-3xl font-serif text-charcoal">Oferta Lunii</Link>
              <Link to="/tratamente-cas" className="text-3xl font-serif text-charcoal">Tratamente CAS</Link>
              <Link to="/turism-dentar" className="text-3xl font-serif text-charcoal">Turism Dentar</Link>
              <Link to="/plata-rate" className="text-3xl font-serif text-charcoal">Plată în Rate</Link>
            </div>

            {/* Mobile Menu Footer */}
            <div className="px-6 py-8 bg-charcoal text-cream mt-auto">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-cream/50 mb-2">Contact</p>
                  <a href="tel:+40771371957" className="text-xl font-medium">+40 771 371 957</a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-cream/50 mb-2">Locație</p>
                  <p className="text-base">Str. Oituz 24, ap. 1<br/>Sibiu, România</p>
                </div>
                <Link to="/programare" className="bg-gold text-white px-6 py-4 rounded-full text-center font-medium mt-4 flex items-center justify-center gap-2">
                  Programează-te <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
