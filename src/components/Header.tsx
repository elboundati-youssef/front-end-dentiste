import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Accueil', href: '#home' },
  { name: 'À Propos', href: '#about' },
  { name: 'Services Dentaires', href: '#services' },
  { name: 'Notre Équipe', href: '#team' },
 
 
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
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
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
          <a href="#home" className="relative z-50 flex items-center min-w-[200px]">
  <img
    src="/logo.png"
    alt="Centre Dentaire Al Boughaz - Dr Amine Khanboubi"
    className="h-28 md:h-36 lg:h-44 w-auto object-contain transform scale-110 origin-left" 
  />
</a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 line-reveal"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA & Menu Button */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+1234567890"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>+212 [Votre Numéro]</span>
              </a>
              
              <button
                onClick={() => setIsMenuOpen(true)}
                className="relative z-50 w-12 h-12 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 lg:top-8 lg:right-12 w-12 h-12 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Menu Content */}
            <div className="h-full flex flex-col lg:flex-row">
              {/* Navigation Links */}
              <div className="flex-1 flex flex-col justify-center px-8 lg:px-20">
                <nav className="space-y-4 lg:space-y-6">
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
                        className="group flex items-center gap-4"
                      >
                        <span className="text-sm font-medium text-primary">
                          0{index + 1}
                        </span>
                        <span className="font-serif text-4xl lg:text-6xl xl:text-7xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
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
                    <p className="text-sm text-muted-foreground mb-2">Address</p>
                    <p className="text-foreground">
                      Avenue Moulay Youssef,  n°69.3ème étage, Appart 7  (à côté de la Mosquée Badr).<br />
                      Tanger, Maroc.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Contact</p>
                    <p className="text-foreground">
                      +1 (234) 567-890<br />
                      hello@klaas.dental
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Hours</p>
                    <p className="text-foreground">
                      Mon - Fri: 9:00 - 18:00<br />
                      Saturday: 10:00 - 14:00
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
