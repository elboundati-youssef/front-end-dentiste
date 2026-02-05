import { useEffect } from "react"; // 1. Import pour gérer le moment du chargement
import { useLocation } from "react-router-dom"; // 2. Import pour lire l'URL (le #contact)
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
  // 3. On récupère le "hash" de l'URL (ex: #contact ou #services)
  const { hash } = useLocation();

  // 4. Ce code s'active quand la page charge
  useEffect(() => {
    if (hash) {
      // On attend 100ms que la page soit prête, puis on scroll
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div className="smooth-scroll">
      {/* Configuration SEO mise à jour avec vos données */}
      <Helmet>
        {/* Title Tag */}
        <title>Dentiste Tanger | Centre Dentaire Al Boughaz | Av. Moulay Youssef</title>
        
        {/* Meta Description */}
        <meta 
          name="description" 
          content="Cabinet dentaire du Dr. Amine Khanboubi à Tanger. Expert en implants, facettes et blanchiment dentaire. Situé Avenue Moulay Youssef, près de la Mosquée Badr." 
        />
        
        {/* Keywords */}
        <meta 
          name="keywords" 
          content="dentiste tanger, cabinet dentaire tanger, blanchiment dentaire tanger, facettes dentaires maroc, implants dentaires tanger, urgence dentaire tanger, avenue moulay youssef tanger" 
        />
        
        {/* Open Graph (Social Media) - Mis à jour pour correspondre */}
        <meta property="og:title" content="Dentiste Tanger | Centre Dentaire Al Boughaz" />
        <meta property="og:description" content="Expert en implants, facettes et blanchiment dentaire à Tanger. Dr. Amine Khanboubi." />
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
        <Blog />
        <CTA />
        {/* Formulaire relié au backend */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;