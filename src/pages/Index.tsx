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
// 1. Import de Helmet pour gérer le SEO
import { Helmet } from 'react-helmet-async';
import { Blog } from '@/components/Blog';

const Index = () => {
  return (
    <div className="smooth-scroll">
      {/* 2. Configuration SEO pour la page d'accueil */}
      <Helmet>
        {/* Le titre qui apparaît dans l'onglet du navigateur et sur Google */}
        <title>Cabinet Dentaire Tanger - Dr. Elboundati | Urgences & Esthétique</title>
        
        {/* La description sous le titre dans les résultats Google */}
        <meta 
          name="description" 
          content="Votre dentiste de confiance à Tanger. Soins dentaires complets : implants, orthodontie, blanchiment et urgences. Prenez rendez-vous en ligne pour un sourire éclatant." 
        />
        
        {/* Mots-clés pour aider (moins important qu'avant mais utile) */}
        <meta name="keywords" content="dentiste tanger, cabinet dentaire maroc, urgence dentaire tanger, implantologie, blanchiment des dents, orthodontie tanger" />
        
        {/* Pour que le lien soit joli quand on le partage sur WhatsApp/Facebook */}
        <meta property="og:title" content="Cabinet Dentaire Tanger - Dr. Elboundati" />
        <meta property="og:description" content="Soins dentaires d'excellence à Tanger. Prenez rendez-vous aujourd'hui." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Gallery />
        <Testimonials />
        <Blog />  {/* <--- AJOUTE-LE ICI */}
        <CTA />
        {/* Ton composant Contact qui est relié à Laravel */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;