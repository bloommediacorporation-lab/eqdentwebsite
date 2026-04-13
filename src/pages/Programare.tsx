import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Lenis from 'lenis';
import { useScroll, useMotionValueEvent, motion, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const DatePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start

  const monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
  const dayNames = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
  };

  const isSelected = (day: number) => {
    return selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth() && selectedDate?.getFullYear() === currentMonth.getFullYear();
  };

  const isPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return dateToCheck < today;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-charcoal/50 font-medium flex items-center gap-2">
          <CalendarIcon size={14} />
          Data și Ora
        </label>
        
        <div className="bg-cream/30 border border-charcoal/10 rounded-xl p-4 md:p-6">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6">
            <button type="button" onClick={prevMonth} className="p-2 hover:bg-white rounded-full transition-colors text-charcoal/60 hover:text-charcoal">
              <ChevronLeft size={20} />
            </button>
            <h4 className="font-serif text-lg text-charcoal">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h4>
            <button type="button" onClick={nextMonth} className="p-2 hover:bg-white rounded-full transition-colors text-charcoal/60 hover:text-charcoal">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-medium text-charcoal/40 pb-2">
                {day}
              </div>
            ))}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = isPast(day);
              const selected = isSelected(day);
              const today = isToday(day);
              
              return (
                <button
                  key={day}
                  type="button"
                  disabled={past}
                  onClick={() => {
                    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
                    setSelectedTime(""); // Reset time when date changes
                  }}
                  className={`
                    aspect-square rounded-full flex items-center justify-center text-sm transition-all
                    ${past ? 'text-charcoal/20 cursor-not-allowed' : 'hover:bg-gold/10 hover:text-gold cursor-pointer'}
                    ${selected ? 'bg-gold text-white hover:bg-gold hover:text-white shadow-md' : ''}
                    ${today && !selected ? 'border border-gold/30 text-gold' : ''}
                    ${!past && !selected && !today ? 'text-charcoal/80' : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Time Slots */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-t border-charcoal/10 pt-6"
              >
                <h5 className="text-xs uppercase tracking-widest text-charcoal/50 font-medium mb-4">Ore Disponibile</h5>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2 rounded-lg text-sm transition-all border
                        ${selectedTime === time 
                          ? 'bg-charcoal border-charcoal text-white shadow-md' 
                          : 'bg-white border-charcoal/10 text-charcoal/70 hover:border-gold hover:text-gold'}
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Hidden inputs to pass data if this were a real form submission */}
      <input type="hidden" name="date" value={selectedDate ? selectedDate.toISOString() : ''} />
      <input type="hidden" name="time" value={selectedTime} />
    </div>
  );
};

export default function Programare() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const [isOverDark, setIsOverDark] = useState(true);

  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textColor = useTransform(scrollY, [0, 300], ["#ffffff", "#1A1A1A"]);
  const textX = useTransform(scrollY, [0, 600], ["0vw", "-15vw"]);
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

  return (
    <div className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      <Navbar opacity={navOpacity} isScrolled={isScrolled} isOverDark={isOverDark} />
      
      {/* Fixed Hero Section */}
      <section className="fixed inset-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-end pb-32 md:pb-24 px-6 md:px-12 z-0 bg-cream">
        {/* Background Video */}
        <motion.video 
          style={{ opacity: videoOpacity }}
          src="https://www.pexels.com/ro-ro/download/video/5356198/" 
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
          <div className="w-full flex justify-center items-end">
             <h1 className="text-[10vw] sm:text-[11vw] md:text-[9vw] lg:text-[8.5vw] font-serif leading-[0.8] tracking-tight text-center whitespace-nowrap">
              <motion.span style={{ x: textX, color: textColor, opacity: mainTextOpacity, display: 'inline-block' }}>
                Programează-te
              </motion.span>
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
              Primul pas către <br />
              <span className="italic text-gold">un zâmbet perfect.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-charcoal/70 font-light max-w-2xl mx-auto"
            >
              Completați formularul de mai jos sau contactați-ne direct pentru a stabili o consultație. Echipa noastră vă stă la dispoziție.
            </motion.p>
          </div>
        </section>

        {/* Form and Map Section */}
        <section className="pb-32 md:pb-48 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              
              {/* Left Column: Contact Info & Map */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-12 flex flex-col"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 text-gold mb-4">
                      <MapPin size={24} />
                      <h3 className="font-serif text-xl text-charcoal">Locație</h3>
                    </div>
                    <p className="text-charcoal/70 leading-relaxed">
                      Str. Oituz 24, ap. 1<br />
                      550337 Sibiu, România
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-gold mb-4">
                      <Clock size={24} />
                      <h3 className="font-serif text-xl text-charcoal">Program</h3>
                    </div>
                    <p className="text-charcoal/70 leading-relaxed">
                      Luni - Vineri: 09:00 - 20:00<br />
                      Sâmbătă - Duminică: Închis
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-gold mb-4">
                      <Phone size={24} />
                      <h3 className="font-serif text-xl text-charcoal">Telefon</h3>
                    </div>
                    <a href="tel:+40771371957" className="text-charcoal/70 hover:text-gold transition-colors">
                      +40 771 371 957
                    </a>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-gold mb-4">
                      <Mail size={24} />
                      <h3 className="font-serif text-xl text-charcoal">Email</h3>
                    </div>
                    <a href="mailto:eqdent.office@gmail.com" className="text-charcoal/70 hover:text-gold transition-colors">
                      eqdent.office@gmail.com
                    </a>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="w-full h-[300px] md:h-full min-h-[300px] rounded-3xl overflow-hidden shadow-sm border border-charcoal/5 flex-grow">
                  <iframe 
                    src="https://maps.google.com/maps?q=Str.%20Oituz%2024,%20Sibiu&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="EQ Dent Location"
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                </div>
              </motion.div>

              {/* Right Column: Booking Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-charcoal/5">
                  <h3 className="text-2xl md:text-3xl font-serif text-charcoal mb-8">Formular de Programare</h3>
                  
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="nume" className="text-xs uppercase tracking-widest text-charcoal/50 font-medium">Nume Complet</label>
                        <input 
                          type="text" 
                          id="nume" 
                          className="w-full bg-cream/30 border-b border-charcoal/10 px-4 py-3 text-base text-charcoal focus:outline-none focus:border-gold focus:bg-cream/50 transition-all rounded-t-lg"
                          placeholder="ex: Ion Popescu"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="telefon" className="text-xs uppercase tracking-widest text-charcoal/50 font-medium">Telefon</label>
                        <input 
                          type="tel" 
                          id="telefon" 
                          className="w-full bg-cream/30 border-b border-charcoal/10 px-4 py-3 text-base text-charcoal focus:outline-none focus:border-gold focus:bg-cream/50 transition-all rounded-t-lg"
                          placeholder="ex: 07xx xxx xxx"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-charcoal/50 font-medium">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full bg-cream/30 border-b border-charcoal/10 px-4 py-3 text-base text-charcoal focus:outline-none focus:border-gold focus:bg-cream/50 transition-all rounded-t-lg"
                        placeholder="adresa@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="serviciu" className="text-xs uppercase tracking-widest text-charcoal/50 font-medium">Serviciul Dorit</label>
                      <select 
                        id="serviciu" 
                        className="w-full bg-cream/30 border-b border-charcoal/10 px-4 py-3 text-base text-charcoal focus:outline-none focus:border-gold focus:bg-cream/50 transition-all rounded-t-lg appearance-none cursor-pointer"
                      >
                        <option value="">Selectați un serviciu...</option>
                        <option value="consultatie">Consultație Generală</option>
                        <option value="implant">Implantologie</option>
                        <option value="estetica">Estetică Dentară</option>
                        <option value="ortodontie">Ortodonție</option>
                        <option value="altul">Alt serviciu / Nu sunt sigur</option>
                      </select>
                    </div>

                    <DatePicker />

                    <div className="space-y-2">
                      <label htmlFor="mesaj" className="text-xs uppercase tracking-widest text-charcoal/50 font-medium">Mesaj (Opțional)</label>
                      <textarea 
                        id="mesaj" 
                        rows={4}
                        className="w-full bg-cream/30 border-b border-charcoal/10 px-4 py-3 text-base text-charcoal focus:outline-none focus:border-gold focus:bg-cream/50 transition-all rounded-t-lg resize-none"
                        placeholder="Detalii despre problema sau preferințe legate de programare..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-charcoal text-cream py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-colors duration-300 mt-4 group"
                    >
                      Trimite Solicitarea
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    
                    <p className="text-xs text-charcoal/40 text-center mt-4">
                      Prin trimiterea acestui formular, sunteți de acord cu politica noastră de confidențialitate.
                    </p>
                  </form>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
