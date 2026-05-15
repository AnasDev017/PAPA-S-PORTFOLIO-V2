import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Menu, X, Scissors, MapPin, Phone, Mail,
  Star, ArrowRight,
  CheckCircle2, Clock, Award
} from 'lucide-react';
import Lenis from 'lenis';

const Instagram = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Facebook = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

// Custom Colors
const colors = {
  primary: '#0F4A46',
  secondary: '#1F5C56',
  sage: '#C7D2C8',
  cream: '#F5F3EE',
  gold: '#C8A96B',
};

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

const stats = [
  { label: 'Years Experience', value: '30+', icon: <Clock size={24} /> },
  { label: 'Perfect Fits', value: '10k+', icon: <Scissors size={24} /> },
  { label: 'Awards Won', value: '15', icon: <Award size={24} /> },
];

const portfolioItems = [
  {
    id: 1,
    title: 'Bespoke Navy Suit',
    category: 'Custom Suit',
    desc: 'Hand-stitched Italian wool with custom silk lining.',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Bridal Elegance',
    category: 'Wedding Gown',
    desc: 'Intricate lace detailing and perfect silhouette adjustment.',
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Classic Tuxedo',
    category: 'Formal Wear',
    desc: 'Precision tailoring for black-tie perfection.',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Vintage Blazer Restoration',
    category: 'Luxury Alteration',
    desc: 'Restoring life to a classic heritage piece.',
    img: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Summer Linen Collection',
    category: 'Bespoke Suit',
    desc: 'Lightweight, perfectly draped for warm climates.',
    img: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Executive Overcoat',
    category: 'Winter Wear',
    desc: 'Cashmere blend overcoat with structured shoulders.',
    img: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800'
  }
];

const reviews = [
  { id: 1, name: 'James Harrington', text: 'The fitting was absolutely perfect. Exceptional craftsmanship and professional service. Michael understood exactly what I needed for my wedding.', rating: 5, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
  { id: 2, name: 'Sarah Jenkins', text: 'I brought in my grandmother\'s vintage dress. He modernized it while keeping its soul intact. A true master of his craft.', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
  { id: 3, name: 'David Chen', text: 'Best bespoke suits in the city. The attention to detail from the initial measurement to the final buttonhole is unmatched.', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
  { id: 4, name: 'Eleanor Vance', text: 'Impeccable service and unparalleled skill. My evening gowns always fit like a dream after visiting this studio.', rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
];

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Great+Vibes&display=swap');
    
    /* Using Lenis for smooth scroll, native scroll-behavior smooth can conflict with Lenis */
    html.lenis { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto !important; }
    .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
    .lenis.lenis-stopped { overflow: hidden; }
    
    body { 
      font-family: 'Inter', sans-serif; 
      background-color: ${colors.cream};
      color: ${colors.primary};
      overflow-x: hidden;
    }
    h1, h2, h3, h4, h5, h6, .font-serif {
      font-family: 'Cormorant Garamond', serif;
    }
    
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: ${colors.cream}; }
    ::-webkit-scrollbar-thumb { background: ${colors.secondary}; border-radius: 5px; }
    ::-webkit-scrollbar-thumb:hover { background: ${colors.primary}; }

    .glass {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
    .glass-dark {
      background: rgba(15, 74, 70, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(200, 169, 107, 0.2);
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}} />
);

const SectionHeader = ({ title, subtitle, light = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="text-center max-w-3xl mx-auto mb-16 px-4"
  >
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className={`h-[1px] w-12 ${light ? 'bg-[#C8A96B]' : 'bg-[#C8A96B]'}`}></div>
      <span className={`uppercase tracking-widest text-sm font-semibold ${light ? 'text-[#C8A96B]' : 'text-[#C8A96B]'}`}>
        Expertise
      </span>
      <div className={`h-[1px] w-12 ${light ? 'bg-[#C8A96B]' : 'bg-[#C8A96B]'}`}></div>
    </div>
    <h2 className={`text-5xl md:text-6xl font-serif mb-6 ${light ? 'text-[#F5F3EE]' : 'text-[#0F4A46]'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl font-light ${light ? 'text-[#C7D2C8]' : 'text-gray-600'}`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl md:text-3xl font-serif font-bold text-[#0F4A46] flex items-center gap-2">
          <Scissors className="text-[#C8A96B] transition-transform duration-500 hover:rotate-180" size={28} />
          <span>M. Tahir</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-wider font-medium text-[#0F4A46] hover:text-[#C8A96B] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#C8A96B] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href="#contact" className="px-6 py-2.5 bg-[#0F4A46] text-[#F5F3EE] rounded-none hover:bg-[#C8A96B] hover:scale-105 transition-all duration-300 text-sm uppercase tracking-widest font-medium shadow-md hover:shadow-xl">
            Book Now
          </a>
        </div>

        <button className="md:hidden text-[#0F4A46]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/20 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-[#0F4A46]"
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="mt-4 px-8 py-3 bg-[#0F4A46] text-[#F5F3EE] text-sm uppercase tracking-widest">
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Reduced wording so it formats perfectly without being too massive
  const title = "CUSTOM TAILORING & ALTERATIONS";
  const splitTitle = title.split("").map((char, index) => (
    <motion.span
      key={index}
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + (index * 0.03), ease: [0.16, 1, 0.3, 1] }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#F5F3EE]">
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[#E8E4D9] rounded-bl-[10rem] -z-10 transform translate-x-10 opacity-70"></div>

      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">

        <motion.div style={{ opacity: opacityParallax }} className="z-10 pt-10 lg:pt-0">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C7D2C8]/50 backdrop-blur-md rounded-full mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse"></span>
            <span className="text-sm font-medium tracking-wider text-[#0F4A46] uppercase">Professional Tailoring Expert</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0F4A46] leading-[1.1] mb-6 flex flex-wrap">
            {splitTitle}
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="text-lg md:text-xl text-[#1F5C56]/80 font-light max-w-xl mb-10 leading-relaxed"
          >
            Crafting perfectly tailored fashion with precision, elegance, and over 30 years of masterful experience.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#portfolio"
              className="px-8 py-4 bg-[#0F4A46] text-[#F5F3EE] uppercase tracking-widest text-sm font-medium flex items-center gap-2 group shadow-lg shadow-[#0F4A46]/30"
            >
              View Portfolio
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-transparent border-[1.5px] border-[#0F4A46] text-[#0F4A46] uppercase tracking-widest text-sm font-medium hover:bg-[#0F4A46] hover:text-[#F5F3EE] transition-colors duration-300"
            >
              Book Consultation
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 h-[60vh] lg:h-[80vh] w-full"
        >
          <div className="absolute inset-0 rounded-t-full rounded-bl-full overflow-hidden shadow-2xl bg-black">
            <div className="w-full h-full bg-[#0F4A46]/10 absolute inset-0 z-10 mix-blend-overlay"></div>
            <motion.img
              style={{ y: yParallax }}
              src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=1000"
              alt="Master Tailor at work"
              className="w-full h-[120%] object-cover object-top -top-[10%] relative"
            />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C8A96B] rounded-[40%] mix-blend-multiply blur-2xl opacity-60"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="absolute top-20 -right-10 w-40 h-40 bg-[#1F5C56] rounded-[30%] mix-blend-multiply blur-3xl opacity-50"
          ></motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            transition={{
              scale: { duration: 0.8, delay: 1.5, type: "spring" },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }
            }}
            className="absolute top-10 -left-10 glass-dark p-6 rounded-2xl hidden md:flex items-center gap-4 shadow-xl"
          >
            <div className="w-12 h-12 bg-[#C8A96B] rounded-full flex items-center justify-center text-[#0F4A46]">
              <Scissors size={24} />
            </div>
            <div>
              <p className="text-[#C8A96B] font-bold text-2xl font-serif">30+</p>
              <p className="text-[#F5F3EE] text-xs uppercase tracking-wider">Years Experience</p>
            </div>
          </motion.div>
        </motion.div>

      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#0F4A46] hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest font-medium opacity-60">Scroll</span>
        <div className="w-[1px] h-12 bg-[#0F4A46]/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-[#0F4A46]"
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const features = [
    "Perfect Fitting Guarantee",
    "Premium Imported Fabrics",
    "Handcrafted Precision",
    "Wedding & Formal Wear"
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0F4A46] text-[#F5F3EE] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#C8A96B 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          title="The Master Tailor"
          subtitle="Merging traditional craftsmanship with contemporary elegance."
          light={true}
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-[#C8A96B]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=800"
                alt="Tailor measuring fabric"
                className="w-full h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s]"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 md:right-10 bg-[#F5F3EE] text-[#0F4A46] p-8 rounded-2xl shadow-2xl hidden md:grid grid-cols-2 gap-6 border-b-4 border-[#C8A96B]">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-[#C8A96B] flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-3xl font-serif font-bold">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <h3 className="text-3xl md:text-4xl font-serif text-[#C8A96B]">Tahir Hussain</h3>
            <p className="text-lg text-[#C7D2C8] font-light leading-relaxed">
              With over three decades of experience apprenticing under Savile Row masters, Tahir brings an unparalleled level of precision and artistry to every garment.
              <br /><br />
              We believe that clothing should not just fit your body, but complement your character. Every stitch is a commitment to quality, ensuring that when you wear our creations, you project absolute confidence and timeless style.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 bg-[#1F5C56]/50 backdrop-blur-md p-4 rounded-xl border border-[#C7D2C8]/10 hover:border-[#C8A96B]/50 transition-colors"
                >
                  <CheckCircle2 className="text-[#C8A96B]" size={20} />
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-8 flex items-center"
            >
              {/* Elegant dynamic signature text using Great Vibes font */}
              <div
                className="text-5xl md:text-7xl font-light tracking-wide text-[#C8A96B]"
                style={{ fontFamily: "'Great Vibes', cursive", transform: 'rotate(-4deg)' }}
              >
                Tahir
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-[#F5F3EE]">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader
          title="Featured Creations"
          subtitle="A curated collection of precision-crafted tailoring projects and custom fashion pieces."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F4A46] via-[#0F4A46]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                <div className="inline-block px-3 py-1 bg-[#C8A96B] text-[#0F4A46] text-xs font-bold uppercase tracking-wider rounded-full mb-3 self-start shadow-sm">
                  {item.category}
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif text-[#F5F3EE] mb-2">{item.title}</h3>
                <p className="text-[#C7D2C8] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                  {item.desc}
                </p>

                <div className="w-0 h-[2px] bg-[#C8A96B] mt-4 group-hover:w-full transition-all duration-[1s] ease-out"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-transparent border-[1.5px] border-[#0F4A46] text-[#0F4A46] uppercase tracking-widest text-sm font-medium hover:bg-[#0F4A46] hover:text-[#F5F3EE] transition-colors duration-300"
          >
            View Full Gallery
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const scrollReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#C7D2C8] overflow-hidden relative">
      <SectionHeader
        title="Client Testimonials"
        subtitle="Read what our distinguished clients have to say about their custom tailoring experience."
      />

      <div className="relative mt-16 pb-12 flex">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#C7D2C8] to-transparent z-10 hidden md:block"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#C7D2C8] to-transparent z-10 hidden md:block"></div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30
          }}
          className="flex gap-8 px-4"
          style={{ width: "max-content" }}
        >
          {scrollReviews.map((review, idx) => (
            <div
              key={idx}
              className="w-[350px] md:w-[450px] bg-[#F5F3EE] p-8 md:p-10 rounded-[2rem] shadow-xl flex-shrink-0 relative group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="absolute -top-6 right-8 text-[#C8A96B] opacity-20 group-hover:scale-110 transition-transform">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>

              <div className="flex gap-1 mb-6 text-[#C8A96B]">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>

              <p className="text-[#0F4A46] font-serif text-xl italic mb-8 relative z-10 leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#C8A96B]" />
                <div>
                  <h4 className="font-bold text-[#0F4A46]">{review.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Verified Client</p>
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
    <section id="contact" className="bg-[#0F4A46] text-[#F5F3EE] pt-24 lg:pt-32 pb-10 rounded-t-[3rem] -mt-12 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 mb-24">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#C8A96B] mb-6">Book Your Fitting</h2>
            <p className="text-[#C7D2C8] mb-12 font-light max-w-md md:text-lg">
              Visit our studio for a personal consultation. Let us discuss your requirements and take precise measurements for your next masterpiece.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="p-4 bg-[#1F5C56]/50 rounded-full text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#0F4A46] transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold mb-1 group-hover:text-[#C8A96B] transition-colors">Studio Location</h4>
                  <p className="text-[#C7D2C8] text-sm">124 Savile Row Avenue<br />Fashion District, NY 10012</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-4 bg-[#1F5C56]/50 rounded-full text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#0F4A46] transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold mb-1 group-hover:text-[#C8A96B] transition-colors">Call Us</h4>
                  <p className="text-[#C7D2C8] text-sm">+1 (555) 123-4567<br />Mon-Sat: 9am - 7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-4 bg-[#1F5C56]/50 rounded-full text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#0F4A46] transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold mb-1 group-hover:text-[#C8A96B] transition-colors">Email</h4>
                  <p className="text-[#C7D2C8] text-sm">bookings@mandersontailors.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#F5F3EE] p-8 md:p-10 lg:p-12 rounded-[2rem] shadow-2xl text-[#0F4A46]"
          >
            <h3 className="text-3xl font-serif font-bold mb-8">Send a Message</h3>

            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 bg-[#0F4A46] text-[#C8A96B] rounded-full flex items-center justify-center mb-6 shadow-xl"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h4 className="text-3xl font-serif font-bold mb-3">Message Sent!</h4>
                <p className="text-gray-600">We will get back to you within 24 hours to confirm your consultation.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#1F5C56]">Full Name</label>
                  <input required type="text" className="w-full bg-transparent border-b-2 border-[#1F5C56]/20 py-2 focus:outline-none focus:border-[#C8A96B] transition-colors placeholder:text-gray-400" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#1F5C56]">Email</label>
                    <input required type="email" className="w-full bg-transparent border-b-2 border-[#1F5C56]/20 py-2 focus:outline-none focus:border-[#C8A96B] transition-colors placeholder:text-gray-400" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#1F5C56]">Service</label>
                    <select className="w-full bg-transparent border-b-2 border-[#1F5C56]/20 py-2 focus:outline-none focus:border-[#C8A96B] transition-colors text-gray-700">
                      <option>Bespoke Suit</option>
                      <option>Alterations</option>
                      <option>Wedding Wear</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#1F5C56]">Message Details</label>
                  <textarea required rows="4" className="w-full bg-transparent border-b-2 border-[#1F5C56]/20 py-2 focus:outline-none focus:border-[#C8A96B] transition-colors resize-none placeholder:text-gray-400" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <button
                  disabled={formState === 'submitting'}
                  type="submit"
                  className="w-full py-5 mt-4 bg-[#0F4A46] text-[#C8A96B] uppercase tracking-widest text-sm font-bold hover:bg-[#1F5C56] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center disabled:opacity-70 rounded-sm"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <div className="border-t border-[#1F5C56] pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif font-bold text-[#C8A96B] flex items-center gap-2">
            <Scissors size={24} />
            <span>M. Tahir.</span>
          </div>
          <p className="text-[#C7D2C8] text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Michael Anderson Tailoring. All rights reserved.
          </p>
          <div className="flex gap-4 text-[#C7D2C8]">
            <a href="#" className="p-2 hover:bg-[#1F5C56] rounded-full hover:text-[#C8A96B] transition-all"><Instagram size={20} /></a>
            <a href="#" className="p-2 hover:bg-[#1F5C56] rounded-full hover:text-[#C8A96B] transition-all"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {

  // Smooth scroll using Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Provide lenis instances to internal links for smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'));
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#F5F3EE] min-h-screen font-sans selection:bg-[#C8A96B] selection:text-[#0F4A46]">
      <GlobalStyles />
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