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
            ? 'bg-background/95 backdrop-blur-md border-b-2 border-primary/20' // Bordure plus visible
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          {/* HAUTEUR MOBILE AUGMENTÉE : h-32 (128px) */}
          <div className="flex items-center justify-between h-32 lg:h-24">

            {/* --- LOGO GÉANT & GRAS --- */}
            <a href="#home" className="relative z-50 flex items-center min-w-[220px]">
              <img
                src="/logo.png"
                alt="Centre Dentaire Al Boughaz"
                // scale-150 : Zoom x1.5
                // drop-shadow-lg : Ombre pour effet de volume/gras
                className="h-32 md:h-36 lg:h-44 w-auto object-contain transform scale-150 origin-left drop-shadow-lg"
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

              {/* --- BOUTON TÉLÉPHONE MOBILE (VISIBLE & GRAS) --- */}
              {/* lg:hidden signifie visible uniquement sur mobile/tablette */}
              <a
                href="tel:+212539355133"
                className="flex lg:hidden items-center justify-center w-14 h-14 bg-primary/10 rounded-full hover:bg-primary transition-colors"
              >
                {/* strokeWidth={3} = TRAIT GRAS */}
                <Phone strokeWidth={3} className="w-8 h-8 text-primary hover:text-white" />
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

              {/* --- BOUTON MENU GÉANT & GRAS --- */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="relative z-50 w-16 h-16 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Open menu"
              >
                {/* w-10 h-10 (40px) + strokeWidth={3} = GÉANT ET GRAS */}
                <Menu strokeWidth={3} className="w-10 h-10 lg:w-6 lg:h-6" />
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

            {/* --- BOUTON FERMER (X) GÉANT --- */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-16 h-16 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
            >
              {/* X très gras et grand */}
              <X strokeWidth={3} className="w-12 h-12 lg:w-8 lg:h-8" />
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
                        <span className="text-xl font-bold text-primary">
                          0{index + 1}
                        </span>

                        {/* --- TEXTE DU MENU GÉANT (text-6xl) ET GRAS (font-bold) --- */}
                        <span className="font-serif text-6xl sm:text-7xl lg:text-7xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {link.name}
                        </span>

                      </a>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:w-[400px] bg-card p-8 lg:p-12 flex flex-col justify-end"
              >
                <div className="space-y-8">
                  <div>
                    <p className="text-base font-semibold text-muted-foreground mb-2">Adresse</p>
                    <p className="text-foreground text-lg">
                      Avenue Moulay Youssef, n°69.<br />
                      Tanger, Maroc.
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-muted-foreground mb-2">Contact</p>
                    <p className="text-foreground text-lg font-bold">
                      +212 5 39 35 51 33
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