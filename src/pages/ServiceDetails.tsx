import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { servicesData } from "@/data/servicesData";
import { ArrowLeft, Calendar, CheckCircle, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ServiceDetails = () => {
  const { id } = useParams();
  const service = servicesData.find((s) => s.id === id);

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

  const Icon = service.icon;

  return (
    <>
      <Header />
      <main className="pt-20">
        
        {/* HERO SECTION */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <img 
                    src={service.image} 
                    alt={`Traitement ${service.title} - Centre Dentaire Tanger`}
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
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-6xl mb-6 lg:mb-4">{service.title}</h1>
                </motion.div>
            </div>
        </section>

        {/* CONTENU */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-12">

            {/* Bouton retour */}
            <a
              href="/#services"
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-10 lg:mb-8 transition-colors text-2xl lg:text-base gap-3 lg:gap-2"
            >
              <ArrowLeft className="w-8 h-8 lg:w-4 lg:h-4" />
              Retour à l'accueil
            </a>

            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* COLONNE GAUCHE : Description structurée */}
              <div>
                <h2 className="font-serif text-4xl lg:text-3xl text-foreground mb-6">
                  À propos de ce soin
                </h2>
                
                {/* 1. INTRODUCTION */}
                <p className="text-2xl lg:text-lg text-muted-foreground leading-relaxed mb-8">
                  {service.intro}
                </p>

                {/* 2. LISTE DES AVANTAGES (BÉNÉFICES) */}
                {service.benefits && (
                    <div className="bg-secondary/5 p-8 rounded-2xl border border-border mb-10">
                        <h3 className="font-serif text-2xl lg:text-xl mb-6 flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-primary" />
                            Pourquoi choisir ce traitement ?
                        </h3>
                        <ul className="space-y-4">
                            {service.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-4 text-xl lg:text-base text-muted-foreground">
                                    <span className="w-2 h-2 mt-2.5 rounded-full bg-primary shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* 3. L'AVIS DE L'EXPERT */}
                {service.expert_advice && (
                    <div className="border-l-4 border-primary pl-6 py-2">
                        <h3 className="font-serif text-2xl lg:text-lg font-bold mb-3 flex items-center gap-2 text-foreground">
                            <UserCheck className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
                            L'expertise du Dr Khanboubi
                        </h3>
                        <p className="text-xl lg:text-lg text-muted-foreground italic">
                            "{service.expert_advice}"
                        </p>
                    </div>
                )}
              </div>

              {/* COLONNE DROITE (Sticky CTA) */}
              <div className="relative">
                  <div className="bg-card p-8 rounded-2xl border border-border shadow-lg lg:sticky lg:top-32">
                    <h3 className="font-serif text-2xl mb-4 text-center">
                      Prenez le premier pas
                    </h3>
                    <p className="text-muted-foreground text-center mb-8">
                      Vous souhaitez en savoir plus sur le traitement <strong>{service.title}</strong> ?
                    </p>
                    
                    <div className="space-y-4">
                        <a
                          href="/#contact"
                          className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <Calendar className="w-5 h-5" />
                          Prendre Rendez-vous
                        </a>
                        
                        <div className="text-center text-sm text-muted-foreground mt-4">
                            ou appelez-nous au <br/>
                            <a href="tel:+212539355133" className="text-foreground font-bold hover:text-primary text-lg">+212 5 39 35 51 33</a>
                        </div>
                    </div>
                  </div>
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