import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Menu, X, Scissors, MapPin, Phone, Mail,
  Star, ArrowUpRight, CheckCircle2, Clock, Award
} from 'lucide-react';
import Lenis from 'lenis';

const Instagram = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Facebook = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Reviews', href: '#reviews' },
];

const stats = [
  { label: 'Years Experience', value: '30+', icon: <Clock size={20} /> },
  { label: 'Perfect Fits', value: '10k+', icon: <Scissors size={20} /> },
  { label: 'Awards Won', value: '15', icon: <Award size={20} /> },
];

const portfolioItems = [
  {
    id: 1,
    title: 'Bespoke Navy Suit',
    category: 'Custom Suit',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    colSpan: 'md:col-span-8',
  },
  {
    id: 2,
    title: 'Bridal Elegance',
    category: 'Wedding Gown',
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    colSpan: 'md:col-span-4',
  },
  {
    id: 3,
    title: 'Classic Tuxedo',
    category: 'Formal Wear',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    colSpan: 'md:col-span-4',
  },
  {
    id: 4,
    title: 'Vintage Blazer',
    category: 'Restoration',
    img: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800',
    colSpan: 'md:col-span-4',
  },
  {
    id: 5,
    title: 'Linen Collection',
    category: 'Summer Wear',
    img: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=800',
    colSpan: 'md:col-span-4',
  }
];

const reviews = [
  { id: 1, name: 'James Harrington', text: 'Exceptional craftsmanship. Michael understood exactly what I needed for my wedding, down to the final stitch.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
  { id: 2, name: 'Sarah Jenkins', text: 'He modernized my grandmother\'s vintage dress while keeping its soul intact. A true master of his craft.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
  { id: 3, name: 'David Chen', text: 'Best bespoke suits in the city. The attention to detail from the initial measurement to the final buttonhole is unmatched.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
  { id: 4, name: 'Eleanor Vance', text: 'Impeccable service and unparalleled skill. My evening gowns always fit like a dream after visiting this studio.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
];

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Outfit:wght@300;400;500;600&family=Great+Vibes&display=swap');
    
    html.lenis, html.lenis body { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto !important; }
    .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
    .lenis.lenis-stopped { overflow: hidden; }

    body {
      font-family: 'Outfit', sans-serif;
      background-color: #F5F3EE;
      color: #0F4A46;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    
    .font-serif {
      font-family: 'Cormorant Garamond', serif;
    }
    .font-cursive {
      font-family: 'Great Vibes', cursive;
    }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #F5F3EE; }
    ::-webkit-scrollbar-thumb { background: #C8A96B; border-radius: 10px; }

    .glass-nav {
      background: rgba(245, 243, 238, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(15, 74, 70, 0.08);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    }
  `}} />
);

const MagneticButton = ({ children, className, href, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Comp = href ? 'a' : 'button';

  return (
    <Comp
      href={href}
      onClick={onClick}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </Comp>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4 md:px-8 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-nav rounded-full px-6 py-3 md:py-4 flex items-center justify-between gap-8 md:gap-16 pointer-events-auto"
      >
        <a href="#home" className="text-xl md:text-2xl font-serif font-semibold text-[#0F4A46] flex items-center gap-2 group">
          <Scissors className="text-[#C8A96B] group-hover:rotate-180 transition-transform duration-700" size={24} />
          <span>Tahir Hussain.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest font-medium text-[#0F4A46] hover:text-[#C8A96B] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton href="#contact" className="bg-[#0F4A46] text-[#F5F3EE] px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[#C8A96B] transition-colors duration-300">
            Book Now
          </MagneticButton>
        </div>

        <button className="md:hidden text-[#0F4A46]" onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-4 right-4 bg-[#F5F3EE] rounded-[2rem] shadow-2xl p-8 pointer-events-auto border border-[#0F4A46]/10"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl text-[#0F4A46]">Menu</span>
              <button onClick={() => setIsOpen(false)} className="text-[#0F4A46] bg-[#C7D2C8]/30 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-serif text-[#0F4A46] hover:text-[#C8A96B] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="mt-8 bg-[#0F4A46] text-[#F5F3EE] py-4 rounded-full text-center text-sm uppercase tracking-widest">
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center px-4 md:px-8 overflow-hidden bg-[#F5F3EE] pt-32 pb-20 md:py-0">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center h-full min-h-[80vh]">

        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start z-20 md:pr-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 bg-[#0F4A46]/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-[#0F4A46]/10 flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse"></div>
            <span className="text-xs md:text-sm font-medium tracking-[0.2em] text-[#0F4A46] uppercase">Specialist In Uniform Services</span>
          </motion.div>

          <h1 className="font-serif text-[16vw] lg:text-[9vw] leading-[0.85] text-[#0F4A46] uppercase tracking-tighter mb-8 mix-blend-multiply">
            Tahir<br />Hussain
          </h1>

          <p className="text-[#0F4A46]/70 text-lg md:text-xl font-light max-w-lg mb-12 leading-relaxed">
            Elevating professional attire with unparalleled precision. From impeccable bespoke suits to authoritative uniform services, we craft excellence in every stitch.
          </p>

          <div className="flex flex-wrap gap-4 w-full">
            <MagneticButton href="#contact" className="bg-[#0F4A46] text-[#F5F3EE] px-8 py-5 rounded-full flex items-center justify-center gap-3 hover:bg-[#C8A96B] transition-all duration-500 w-full sm:w-auto">
              <span className="text-sm uppercase tracking-widest font-semibold">Book Consultation</span>
            </MagneticButton>
            <MagneticButton href="#portfolio" className="bg-transparent border border-[#0F4A46]/20 text-[#0F4A46] px-8 py-5 rounded-full flex items-center justify-center gap-3 hover:bg-[#0F4A46] hover:text-[#F5F3EE] transition-all duration-500 w-full sm:w-auto">
              <span className="text-sm uppercase tracking-widest font-semibold">View Collection</span>
              <ArrowUpRight size={18} />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Side: Image & Floating Boxes */}
        <div className="relative h-[65vh] lg:h-[85vh] w-full flex items-center justify-center mt-12 lg:mt-0">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[90%] md:w-[75%] lg:w-[85%] h-full relative rounded-t-[10rem] rounded-b-[2rem] md:rounded-t-[15rem] overflow-hidden shadow-2xl z-10 border-[12px] border-[#F5F3EE]"
          >
            <img
              src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=1200"
              alt="Tahir Hussain Master Tailor"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F4A46]/60 to-transparent mix-blend-multiply"></div>
          </motion.div>

          {/* Floating Boxes */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 lg:top-20 left-2 md:left-0 lg:-left-10 bg-[#F5F3EE]/95 backdrop-blur-xl px-4 py-3 md:px-6 md:py-5 rounded-2xl md:rounded-3xl shadow-xl border border-[#0F4A46]/10 z-20 flex items-center gap-3 md:gap-4"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 bg-[#0F4A46] rounded-full flex items-center justify-center text-[#C8A96B]">
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xl md:text-3xl font-serif text-[#0F4A46] leading-none mb-1">30+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#0F4A46]/70 font-semibold">Years Exp.</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-16 md:bottom-20 lg:bottom-32 -left-2 md:-left-4 lg:-left-12 bg-[#0F4A46] px-4 py-3 md:px-6 md:py-5 rounded-2xl md:rounded-3xl shadow-xl z-20 flex items-center gap-3 md:gap-4"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 bg-[#1F5C56] rounded-full flex items-center justify-center text-[#C8A96B]">
              <Award className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xl md:text-3xl font-serif text-[#F5F3EE] leading-none mb-1">Awarded</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#C7D2C8] font-semibold">Master Tailor</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
            className="absolute top-[45%] md:top-1/2 -right-2 md:-right-4 lg:-right-10 bg-[#F5F3EE]/95 backdrop-blur-xl px-4 py-3 md:px-6 md:py-5 rounded-2xl md:rounded-3xl shadow-xl border border-[#0F4A46]/10 z-20 flex items-center gap-3 md:gap-4"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 bg-[#C8A96B] rounded-full flex items-center justify-center text-[#0F4A46]">
              <Scissors className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xl md:text-3xl font-serif text-[#0F4A46] leading-none mb-1">10k+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#0F4A46]/70 font-semibold">Perfect Fits</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-40 px-4 md:px-8 bg-[#0F4A46] text-[#F5F3EE] rounded-t-[2rem] md:rounded-t-[3rem] -mt-10 relative z-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 xl:col-span-5 space-y-12 lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#C8A96B]"></div>
              <span className="uppercase tracking-widest text-xs font-semibold text-[#C8A96B]">Our Philosophy</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-serif leading-tight">
              Elegance is an <br /><span className="text-[#C8A96B] italic font-light">Attitude</span>.
            </h2>

            <div className="pt-8 overflow-hidden md:overflow-visible">
              <div className="font-cursive text-[14vw] sm:text-6xl md:text-7xl text-[#C8A96B] -rotate-3 transform-gpu origin-left inline-block">
                Tahir Hussain
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8 xl:col-span-7 flex flex-col gap-16 mt-8 lg:mt-0">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="space-y-10"
            >
              <p className="text-[#C7D2C8] text-2xl md:text-3xl lg:text-4xl font-serif font-medium leading-normal italic pr-4">
                "We don't merely measure dimensions; we measure style, personality, and purpose. Every stitch is a commitment to excellence."
              </p>

              <div className="h-px w-full bg-[#1F5C56]"></div>

              <div className="grid md:grid-cols-2 gap-8 text-[#C7D2C8] text-lg font-light leading-relaxed">
                <p>
                  With over three decades of mastery, Tahir brings an unparalleled level of precision and artistry to every garment. Our studio operates on the foundational belief that bespoke tailoring is a deeply personal journey, translating your individual persona into fabric and form.
                </p>
                <p>
                  From hand-selected premium European fabrics to rigorous crafting techniques preserved over generations, we ensure that every creation stands as a testament to timeless elegance, durability, and a fit that feels like a second skin.
                </p>
              </div>

              {/* Decorative element replacing the image */}
              <div className="flex items-center justify-between pt-6 opacity-60">
                <span className="uppercase tracking-widest text-xs text-[#C8A96B] font-semibold">Est. 1994</span>
                <div className="flex-1 border-t border-dashed border-[#1F5C56] mx-8"></div>
                <Scissors size={20} className="text-[#C8A96B]" />
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + (idx * 0.1) }}
                  className="bg-[#1F5C56] p-8 rounded-[2rem] flex flex-col justify-between h-[220px] hover:bg-[#C8A96B] group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="text-[#C8A96B] group-hover:text-[#0F4A46] transition-colors">{stat.icon}</div>
                  <div>
                    <h4 className="text-4xl font-serif mb-2 group-hover:text-[#0F4A46] transition-colors">{stat.value}</h4>
                    <p className="text-xs uppercase tracking-widest text-[#C7D2C8] group-hover:text-[#0F4A46]/70 leading-relaxed transition-colors">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 md:py-40 px-4 md:px-8 bg-[#F5F3EE]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#0F4A46]"></div>
              <span className="uppercase tracking-widest text-xs font-semibold text-[#0F4A46]">Lookbook</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#0F4A46] leading-none">
              Featured<br />Creations.
            </h2>
          </motion.div>
          <MagneticButton className="hidden md:flex border border-[#0F4A46] px-8 py-4 rounded-full text-[#0F4A46] hover:bg-[#0F4A46] hover:text-[#F5F3EE] transition-colors duration-500 text-xs uppercase tracking-widest">
            View All Work
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 70, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`${item.colSpan} relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden group cursor-pointer`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover origin-center scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F4A46]/90 via-[#0F4A46]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col items-start md:translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">

                <div className="overflow-hidden mb-4">
                  <span className="inline-block px-4 py-1.5 bg-[#C8A96B] text-[#0F4A46] font-bold text-[10px] uppercase tracking-widest md:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#F5F3EE] transition-colors duration-500 group-hover:text-[#C8A96B]">
                  {item.title}
                </h3>

                <div className="flex items-center gap-4 mt-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  <div className="w-12 h-[1px] bg-[#C8A96B]"></div>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#C8A96B] font-semibold flex items-center gap-2">
                    View Details <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 md:py-40 bg-[#C7D2C8] overflow-hidden flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-serif text-[#0F4A46] mb-4">Client Voices</h2>
        <p className="text-[#0F4A46]/70 text-lg uppercase tracking-widest font-medium">Stories of Elegance</p>
      </motion.div>

      {/* Marquee effect */}
      <div className="relative w-full flex overflow-x-hidden skew-y-[-2deg] bg-[#F5F3EE] py-12 border-y border-[#0F4A46]/10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap gap-8 px-4 w-[max-content]"
        >
          {[...reviews, ...reviews, ...reviews].map((review, idx) => (
            <div key={idx} className="w-[300px] md:w-[450px] inline-flex flex-col whitespace-normal">
              <div className="flex gap-1 mb-4 text-[#C8A96B]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xl md:text-2xl font-serif italic text-[#0F4A46] mb-8 leading-snug">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={review.img} className="w-12 h-12 rounded-full object-cover border border-[#C8A96B]" />
                <div>
                  <h4 className="font-semibold text-[#0F4A46] text-sm">{review.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#1F5C56]">Verified Client</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-[#0F4A46] text-[#F5F3EE] pt-24 md:pt-40 pb-12 rounded-t-[2rem] md:rounded-t-[3rem] -mt-10 relative z-20">
      <div className="container mx-auto px-4 md:px-8">

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-7xl font-serif text-[#C8A96B] mb-8 leading-none">
              Start Your <br />Journey.
            </h2>
            <p className="text-[#C7D2C8] text-lg font-light max-w-md mb-12">
              Step into our studio and experience the luxury of truly bespoke tailoring. We measure more than just dimensions; we measure style.
            </p>

            <div className="space-y-8 border-t border-[#1F5C56] pt-12">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#0F4A46] transition-all duration-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-1">New York Studio</h4>
                  <p className="text-[#C7D2C8] text-sm">124 Savile Row Ave, NY 10012</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#0F4A46] transition-all duration-500">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-1">Direct Line</h4>
                  <p className="text-[#C7D2C8] text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#1F5C56] p-8 md:p-12 rounded-[2rem]"
          >
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 bg-[#0F4A46] text-[#C8A96B] rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h4 className="text-4xl font-serif mb-4 text-[#F5F3EE]">Request Received</h4>
                <p className="text-[#C7D2C8]">Our master tailor will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between gap-8">
                <div className="space-y-8">
                  <input required type="text" className="w-full bg-transparent border-b border-[#C7D2C8]/30 py-4 text-lg focus:outline-none focus:border-[#C8A96B] transition-colors placeholder:text-[#C7D2C8]/50" placeholder="Your Name" />
                  <input required type="email" className="w-full bg-transparent border-b border-[#C7D2C8]/30 py-4 text-lg focus:outline-none focus:border-[#C8A96B] transition-colors placeholder:text-[#C7D2C8]/50" placeholder="Email Address" />
                  <select className="w-full bg-transparent border-b border-[#C7D2C8]/30 py-4 text-lg focus:outline-none focus:border-[#C8A96B] transition-colors text-[#F5F3EE]/80 appearance-none">
                    <option className="bg-[#0F4A46]">Bespoke Suit</option>
                    <option className="bg-[#0F4A46]">Wedding Attire</option>
                    <option className="bg-[#0F4A46]">Alterations</option>
                  </select>
                </div>
                <button
                  disabled={formState === 'submitting'}
                  className="w-full py-6 bg-[#C8A96B] text-[#0F4A46] text-sm uppercase tracking-widest font-bold hover:bg-[#F5F3EE] transition-colors duration-500 rounded-xl"
                >
                  {formState === 'submitting' ? 'Processing...' : 'Submit Request'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center pt-24 border-t border-[#1F5C56]"
        >
          <h2 className="text-[12vw] font-serif font-bold text-[#F5F3EE]/5 tracking-tighter leading-none mb-[-4vw]">
            TAHIR HUSSAIN
          </h2>
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-12 text-[#C7D2C8] text-xs uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} TH STUDIOS.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#C8A96B] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#C8A96B] transition-colors">Facebook</a>
            </div>
            <p>Made With Perfection</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#C8A96B] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'), { offset: -100 });
      });
    });

    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#F5F3EE] min-h-screen selection:bg-[#C8A96B] selection:text-[#0F4A46]">
      <GlobalStyles />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}