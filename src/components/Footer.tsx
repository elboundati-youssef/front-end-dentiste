import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Esthétique Dentaire', href: '#services' },
    { name: 'Soins Préventifs', href: '#services' },
    { name: 'Orthodontie', href: '#services' },
    { name: 'Implants Dentaires', href: '#services' },
    { name: 'Dentisterie Pédiatrique', href: '#services' },
  ],
  company: [
    { name: 'À Propos', href: '#about' },
    { name: 'Galerie', href: '#gallery' },
    { name: 'Blog', href: '#blog' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
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
    <footer className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block mb-6">
              <span className="font-serif text-3xl font-semibold text-foreground">
                Centre Dentaire Al Boughaz
              </span>
            </a>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              Découvrez des soins dentaires de classe mondiale dans un environnement moderne et confortable. 
              Votre sourire est notre passion.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 flex items-center justify-center border border-border text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-foreground mb-6">Nos Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-foreground mb-6">Le Centre</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-foreground mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Inscrivez-vous pour recevoir nos conseils dentaires.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Centre Dentaire Al Boughaz. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-foreground hover:text-background transition-colors duration-300 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};