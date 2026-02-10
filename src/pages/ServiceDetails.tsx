import { useEffect } from "react"; // 1. Import nécessaire pour le scroll
import { useParams, Link } from "react-router-dom";
import { servicesData } from "@/data/servicesData";
import { ArrowLeft, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ServiceDetails = () => {
  const { id } = useParams();
  const service = servicesData.find((s) => s.id === id);

  // 2. CORRECTION UX : Remonter en haut de page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service introuvable</h2>
          <Link to="/#services" className="text-primary hover:underline">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  // 3. CORRECTION REACT : Assigner l'icône à une variable avec Majuscule
  const Icon = service.icon;

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Section Hero du Service */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <img 
                    src={service.image} 
                    alt={`Traitement ${service.title} - Centre Dentaire Tanger`} // SEO Amélioré
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center justify-center p-5 lg:p-3 bg-primary/20 backdrop-blur-sm rounded-full mb-8 lg:mb-6">
                <Icon className="w-16 h-16 lg:w-8 lg:h-8 text-primary" />
              </div>
                  {/* Titre - AGRANDI sur mobile */}
              <h1 className="font-serif text-6xl md:text-6xl lg:text-6xl mb-6 lg:mb-4">{service.title}</h1>
                </motion.div>
            </div>
        </section>

         {/* Détails - AGRANDIS sur mobile */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-12">

            {/* Bouton retour - AGRANDI sur mobile */}
            <a
              href="/#services"
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-10 lg:mb-8 transition-colors text-2xl lg:text-base gap-3 lg:gap-2"
            >
              <ArrowLeft className="w-8 h-8 lg:w-4 lg:h-4" />
              Retour à l'accueil
            </a>

            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Texte - AGRANDI sur mobile */}
              <div>
                <h2 className="font-serif text-5xl lg:text-3xl text-foreground mb-8 lg:mb-6">
                  À propos de ce soin
                </h2>
                <p className="text-3xl lg:text-lg text-muted-foreground leading-relaxed mb-8 lg:mb-6">
                  {service.description}
                </p>
                <div className="prose prose-lg text-muted-foreground">
                  <p className="text-2xl lg:text-base leading-relaxed">{service.details}</p>
                </div>
              </div>

              {/* Carte RDV - AGRANDIE sur mobile */}
              <div className="bg-card p-10 lg:p-8 rounded-lg border border-border lg:sticky lg:top-32">
                <h3 className="font-serif text-4xl lg:text-2xl mb-6 lg:mb-4">
                  Intéressé par ce soin ?
                </h3>
                <p className="text-muted-foreground mb-8 lg:mb-6 text-2xl lg:text-base leading-relaxed">
                  Prenez rendez-vous dès aujourd'hui au Centre Dentaire Al Boughaz.
                </p>
                <a
                  href="/#contact"
                  className="w-full flex items-center justify-center gap-4 lg:gap-2 bg-primary text-primary-foreground py-7 lg:py-4 rounded font-medium hover:bg-foreground transition-all text-3xl lg:text-base"
                >
                  <Calendar className="w-10 h-10 lg:w-5 lg:h-5" />
                  Prendre Rendez-vous
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default ServiceDetails;