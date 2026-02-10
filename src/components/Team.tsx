import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, GraduationCap, Stethoscope, Linkedin, Mail } from 'lucide-react';
import Khanboubi from "@/assets/images/DSC08959-C.jpg";
import cabinet  from "@/assets/images/DSC09092-C.jpg";
export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24"
        >
          <div>
            {/* 1. Sous-titre avec lignes dorées - TAILLE NORMALE */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-sm font-medium tracking-[0.3em] uppercase text-gradient">
                Notre Expertise
              </span>
              <div className="w-12 h-px bg-primary" />
            </div>

            {/* 2. Grand Titre - TAILLE NORMALE */}
            <h2 className="font-serif text-5xl xl:text-7xl font-medium text-foreground mb-6 leading-tight">
              Rencontrez 
              <br />
              <span className="text-gradient">Le Dr. Amine Khanboubi</span>
            </h2>

            {/* 3. Description - AGRANDIE sur mobile */}
            <p className="max-w-2xl text-muted-foreground text-2xl lg:text-xl mt-6 lg:mt-0 leading-relaxed">
              Un parcours d'excellence dédié à la santé et à la beauté de votre sourire à Tanger.
            </p>
          </div>
        </motion.div>

        {/* Layout principal */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">

          {/* Photo docteur - HAUTEUR AGRANDIE sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 group"
          >
              <div className="relative overflow-hidden shadow-2xl">
              <img
                src={Khanboubi}
                alt="Dr. Amine Khanboubi"
                // HAUTEUR MOBILE AGRANDIE : h-[700px] au lieu de h-[500px]
                className="w-full h-[700px] lg:h-[700px] object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
              />
              
              {/* Social icons - AGRANDIS sur mobile */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <a href="#" className="w-16 h-16 lg:w-10 lg:h-10 flex items-center justify-center bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                  <Linkedin className="w-8 h-8 lg:w-4 lg:h-4" />
                </a>

                <a href="#" className="w-16 h-16 lg:w-10 lg:h-10 flex items-center justify-center bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                  <Mail className="w-8 h-8 lg:w-4 lg:h-4" />
                </a>
              </div>

              {/* Badge expérience - AGRANDI sur mobile */}
              <div className="absolute bottom-0 left-0 bg-gradient-gold text-primary-foreground p-10 lg:p-8">
                <p className="font-serif text-7xl lg:text-5xl font-bold mb-3 lg:mb-2">10+</p>
                <p className="text-lg lg:text-sm tracking-widest uppercase">
                  Années d'expérience
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bio docteur - TEXTES AGRANDIS sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <h3 className="font-serif text-4xl lg:text-4xl font-medium text-foreground mb-8 lg:mb-6">
              Une Double Expertise <br/> Internationale : Rabat et Paris.
            </h3>

            <p className="text-muted-foreground text-2xl lg:text-lg leading-relaxed mb-10 lg:mb-8">
              La force du Centre Al Boughaz repose sur le parcours d'excellence<br /> de son fondateur. Le Dr. Amine Khanboubi est un Spécialiste <br />en Orthodontie diplômé de Rabat, une formation de référence garantissant une rigueur clinique et scientifique totale.
            </p>

            {/* Compétences - AGRANDIES sur mobile */}
            <div className="space-y-8 lg:space-y-6 mb-12">

              <div className="flex items-start gap-6 lg:gap-4">
                <div className="w-16 h-16 lg:w-12 lg:h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full flex-shrink-0">
                  <Award className="w-8 h-8 lg:w-6 lg:h-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground text-2xl lg:text-lg mb-2 lg:mb-0">
                    Excellence Clinique
                  </h4>

                  <p className="text-muted-foreground text-xl lg:text-sm leading-relaxed">
                    Maîtrise des protocoles internationaux pour des soins précis et durables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 lg:gap-4">
                <div className="w-16 h-16 lg:w-12 lg:h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full flex-shrink-0">
                  <GraduationCap className="w-8 h-8 lg:w-6 lg:h-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground text-2xl lg:text-lg mb-2 lg:mb-0">
                    Formation Continue
                  </h4>

                  <p className="text-muted-foreground text-xl lg:text-sm leading-relaxed">
                    Actualisation constante des compétences et technologies dentaires.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 lg:gap-4">
                <div className="w-16 h-16 lg:w-12 lg:h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full flex-shrink-0">
                  <Stethoscope className="w-8 h-8 lg:w-6 lg:h-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground text-2xl lg:text-lg mb-2 lg:mb-0">
                    Approche Douce
                  </h4>

                  <p className="text-muted-foreground text-xl lg:text-sm leading-relaxed">
                    Des soins confortables, précis et pratiquement sans douleur.
                  </p>
                </div>
              </div>
            </div>

             {/* Image cabinet - HAUTEUR AGRANDIE sur mobile */}
            <div className="relative h-72 lg:h-64 overflow-hidden image-zoom shadow-lg group">
              <img
                src={cabinet}
                alt="cabinet-dentaire-mosquee-badr-tanger equipement moderne"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};