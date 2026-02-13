import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Team } from '@/components/Team';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Blog } from '@/components/Blog';

const Index = () => {
  const location = useLocation();

  // Ce useEffect s'active à chaque changement d'URL (y compris le #)
  useEffect(() => {
    if (location.hash) {
      const scrollToElement = () => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      // Tentative 1 : Immédiate (si la page est déjà là)
      scrollToElement();

      // Tentative 2 : Après 100ms (laisser le temps à React de charger)
      const timer1 = setTimeout(scrollToElement, 100);

      // Tentative 3 : Après 500ms (au cas où il y a des images lourdes qui décalent la page)
      const timer2 = setTimeout(scrollToElement, 500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [location]); // On écoute 'location' complet, c'est plus sûr

  return (
    <div className="smooth-scroll">
      <Helmet>
        <title>Dentiste Tanger | Centre Dentaire Al Boughaz | Av. Moulay Youssef</title>
        <meta name="description" content="Cabinet dentaire du Dr. Amine Khanboubi à Tanger. Expert en implants, facettes et blanchiment dentaire." />
        <meta name="keywords" content="dentiste tanger, cabinet dentaire tanger, blanchiment dentaire tanger, implants dentaires tanger" />

        {/* AJOUT CONSEILLÉ : Lien Canonique */}
        <link rel="canonical" href="https://ton-site.com/" />

        <meta property="og:title" content="Dentiste Tanger | Centre Dentaire Al Boughaz" />
        <meta property="og:description" content="Expert en implants, facettes et blanchiment dentaire à Tanger. Dr. Amine Khanboubi." />
        <meta property="og:type" content="website" />
        {/* AJOUT CONSEILLÉ : Image pour le partage */}
        <meta property="og:image" content="https://ton-site.com/og-image.jpg" />
      </Helmet>

      <Header />
      <main>
        {/* On ajoute des IDs ici pour être sûr que le scroll les trouve */}
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="services"><Services /></section>
        <section id="team"><Team /></section>
        <section id="gallery"><Gallery /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="blog"><Blog /></section>
        <CTA />

        {/* L'ID contact est CRUCIAL ici */}
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;