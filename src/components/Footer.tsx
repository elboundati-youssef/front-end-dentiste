import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Esthétique Dentaire', href: '/#services' },
    { name: 'Soins Préventifs', href: '/#services' },
    { name: 'Orthodontie', href: '/#services' },
    { name: 'Implants Dentaires', href: '/#services' },
    { name: 'Dentisterie Pédiatrique', href: '/#services' },
  ],
  company: [
    { name: 'À Propos', href: '/#about' },
    { name: 'Galerie', href: '/#gallery' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Témoignages', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ],
  legal: [
    { name: 'Politique de Confidentialité', href: '#' },
    { name: 'Conditions Générales', href: '#' },
    { name: 'Politique des Cookies', href: '#' },
  ],
};

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border relative">
      {/* Main Footer Content - AGRANDI sur mobile */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Brand & Socials - AGRANDI sur mobile */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <a href="#home" className="inline-block mb-8 lg:mb-6">
              <span className="font-serif text-5xl lg:text-3xl font-semibold text-foreground">
                Centre Dentaire Al Boughaz
              </span>
            </a>
            <p className="text-muted-foreground mb-10 lg:mb-8  leading-relaxed text-2xl lg:text-base ">
              Découvrez des soins dentaires de classe mondiale dans un environnement moderne et confortable à Tanger. 
              Votre sourire est notre passion.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-6 lg:gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-16 h-16 lg:w-11 lg:h-11 flex items-center justify-center border border-border text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-8 h-8 lg:w-5 lg:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links - AGRANDI sur mobile */}
          <div className='hidden lg:block'>
            <h4 className="font-medium text-foreground mb-8 lg:mb-6 text-3xl lg:text-base">Nos Services</h4>
            <ul className="space-y-6 lg:space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-300 text-2xl lg:text-base">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links - AGRANDI sur mobile */}
          <div className='hidden lg:block'>
            <h4 className="font-medium  text-foreground mb-8 lg:mb-6 text-3xl lg:text-base">Le Centre</h4>
            <ul className="space-y-6 lg:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-300 text-2xl lg:text-base">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section - AGRANDI sur mobile */}
          <div className='w-2/3 lg:w-full mx-auto text-center lg:text-left'>
            <h4 className="font-medium text-foreground mb-8 lg:mb-6 text-3xl lg:text-base">Newsletter</h4>
            <p className="text-muted-foreground mb-6 lg:mb-4 text-xl lg:text-sm leading-relaxed">
              Inscrivez-vous pour recevoir nos conseils dentaires.
            </p>
            <form className="flex flex-col gap-5 lg:gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className="px-6 py-5 lg:px-4 lg:py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300 text-xl lg:text-base"
              />
              <button
                type="submit"
                className="px-6 py-5 lg:px-4 lg:py-3 bg-gradient-gold text-primary-foreground font-medium hover:bg-foreground hover:text-background transition-colors duration-300 text-xl lg:text-base"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar - AGRANDI sur mobile */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 py-8 lg:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
            <p className="text-xl lg:text-sm text-muted-foreground">
              © {new Date().getFullYear()} Centre Dentaire Al Boughaz. Tous droits réservés.
            </p>
            <div className="flex items-center gap-8 lg:gap-6">
              {footerLinks.legal.map((link) => (
                <a key={link.name} href={link.href} className="text-xl lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- FLOATING BUTTONS (WhatsApp + ScrollToTop) AGRANDIS sur mobile --- */}
      <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 flex flex-col gap-6 lg:gap-4 z-50">
        
        {/* WhatsApp Floating Button - AGRANDI sur mobile */}
        <motion.a
          href="https://wa.me/212539355133"
          target="_blank"
          rel="noopener noreferrer"
          // MOBILE : w-20 h-20 (80px) -> TRÈS GROS
          // DESKTOP : w-12 h-12 (48px)
          className="w-20 h-20 lg:w-12 lg:h-12 bg-[#25D366] text-white flex items-center justify-center shadow-xl transition-all duration-300 rounded hover:scale-110"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -5 }}
        >
          {/* Icône WhatsApp : w-12 h-12 (48px) sur mobile */}
          <svg viewBox="0 0 24 24" className="w-12 h-12 lg:w-7 lg:h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.439 5.662 1.439h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>

        {/* Scroll To Top Button - AGRANDI sur mobile */}
        <motion.button
          onClick={scrollToTop}
          // MOBILE : w-20 h-20 (80px) -> TRÈS GROS
          className="w-20 h-20 lg:w-12 lg:h-12 bg-gradient-gold text-primary-foreground flex items-center justify-center shadow-xl transition-colors duration-300 rounded hover:bg-foreground hover:text-background"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Flèche : w-10 h-10 sur mobile */}
          <ArrowUp strokeWidth={3} className="w-10 h-10 lg:w-5 lg:h-5" />
        </motion.button>
        
      </div>
    </footer>
  );
};