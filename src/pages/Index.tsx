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

const Index = () => {
  return (
    <div className="smooth-scroll">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Gallery />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
