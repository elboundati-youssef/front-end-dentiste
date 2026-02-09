import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Accueil', href: '/#home' },
  { name: 'À Propos', href: '/#about' },
  { name: 'Services Dentaires', href: '/#services' },
  { name: 'Notre Expertise', href: '/#team' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Contact', href: '/#contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b-2 border-primary/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          {/* HAUTEUR MOBILE : h-36 */}
          <div className="flex items-center justify-between h-36 lg:h-24">

            {/* --- LOGO MOBILE TAILLE RÉDUITE --- */}
            <a href="#home" className="relative z-50 flex items-center min-w-[200px]">
              <img
                src="/logo.png"
                alt="Centre Dentaire Al Boughaz - Dr Amine Khanboubi"
                
                // EXPLICATION DU STYLE COMBINÉ :
                // 1. Base (Mobile) : h-36, scale-[1.8] (MODÉRÉ), drop-shadow-xl
                // 2. PC (lg:)      : lg:h-44, lg:scale-110 (NORMAL), lg:drop-shadow-none
                
                className="
                  w-auto object-contain transform origin-left transition-all duration-300
                  h-36 md:h-40 
                  scale-[1.8] drop-shadow-xl
                  lg:h-44 lg:scale-110 lg:drop-shadow-none
                "
              />
            </a>

            {/* Desktop Navigation (Reste normale) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA + Menu Button */}
            <div className="flex items-center gap-6">

              {/* --- BOUTON TÉLÉPHONE MOBILE DOUBLE TAILLE --- */}
              <a
                href="tel:+212539355133"
                className="flex lg:hidden items-center justify-center w-20 h-20 bg-primary/10 rounded-full hover:bg-primary transition-colors"
              >
                {/* strokeWidth={4} = TRÈS GRAS */}
                <Phone strokeWidth={4} className="w-12 h-12 text-primary hover:text-white" />
              </a>

              {/* Téléphone Desktop (Caché sur mobile) */}
              <a
                href="tel:+212539355133"
                className="hidden lg:flex items-center gap-2 text-sm font-medium group transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                <span className="text-gradient font-bold transition-all duration-300 group-hover:text-white group-hover:[background:none] group-hover:[-webkit-text-fill-color:white]">
                  +212 5 39 35 51 33
                </span>
              </a>

              {/* --- BOUTON MENU DOUBLE TAILLE --- */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="relative z-50 w-20 h-20 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Open menu"
              >
                {/* w-14 h-14 (56px) + strokeWidth={4} = ÉNORME ET TRÈS GRAS */}
                <Menu strokeWidth={4} className="w-14 h-14 lg:w-6 lg:h-6" />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Menu Plein Écran */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background"
          >

            {/* --- BOUTON FERMER (X) DOUBLE TAILLE --- */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-20 h-20 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
            >
              {/* X très gras et double taille */}
              <X strokeWidth={4} className="w-16 h-16 lg:w-8 lg:h-8" />
            </button>

            {/* Menu Content */}
            <div className="h-full flex flex-col lg:flex-row">

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20">
                <nav className="space-y-8 lg:space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center gap-6"
                      >
                        {/* --- NUMÉRO TAILLE RÉDUITE --- */}
                        <span className="text-2xl lg:text-xl font-bold text-primary">
                          0{index + 1}
                        </span>

                        {/* --- TEXTE DU MENU TAILLE RÉDUITE (text-5xl) ET GRAS --- */}
                        <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {link.name}
                        </span>

                      </a>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Contact Info - TEXTE DOUBLE TAILLE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:w-[400px] bg-card p-8 lg:p-12 flex flex-col justify-end"
              >
                <div className="space-y-10 lg:space-y-8">
                  <div>
                    <p className="text-2xl lg:text-base font-semibold text-muted-foreground mb-3 lg:mb-2">Adresse</p>
                    <p className="text-foreground text-3xl lg:text-lg leading-relaxed">
                      Avenue Moulay Youssef, n°69.<br />
                      Tanger, Maroc.
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-base font-semibold text-muted-foreground mb-3 lg:mb-2">Contact</p>
                    <p className="text-foreground text-3xl lg:text-lg leading-relaxed">
                      +212 5 39 35 51 33<br />
                      contact@alboughaz.dental
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl lg:text-base font-semibold text-muted-foreground mb-3 lg:mb-2">Horaires</p>
                    <p className="text-foreground text-3xl lg:text-lg leading-relaxed">
                      Lun - Ven : 09h00 - 18h00<br />
                      Sam : 10h00 - 14h00
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};