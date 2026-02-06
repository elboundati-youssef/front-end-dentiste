import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Clock, Shield } from 'lucide-react';

const stats = [
  { icon: Award, value: '10+', label: "Ans d'Expérience en Chirurgie Dentaire" },
  { icon: Users, value: '8K+', label: 'Patients Satisfaits à Tanger' },
  { icon: Clock, value: '20K+', label: 'Soins et Interventions Réalisés' },
  { icon: Shield, value: '100%', label: 'Stérilisation et Protocoles de Sécurité' },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* --- MODIFICATION 1 : IMAGES --- */}
          {/* Ajout de 'max-w-md mx-auto' pour limiter la taille sur mobile */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative max-w-md mx-auto lg:max-w-none w-full"
          >
            <div className="relative z-10 image-zoom">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
                alt="Intervention de blanchiment dentaire au Centre Al Boughaz Tanger"
                className="w-full aspect-[4/5] object-cover rounded shadow-lg"
              />
            </div>
            {/* Ajustement de la position pour mobile (-bottom-4 au lieu de -8) */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8 w-2/3 z-20 shadow-card image-zoom">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80"
                alt="Équipe médicale du Dr Amine Khanboubi à Tanger"
                className="w-full aspect-square object-cover rounded border-4 border-background"
              />
            </div>
            <div className="absolute top-8 -left-8 w-24 h-24 border border-primary/30 hidden lg:block" />
          </motion.div>

          {/* --- MODIFICATION 2 : TEXTE --- */}
          <motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 1, delay: 0.2 }}
  className="mt-8 lg:mt-0 text-center lg:text-left"
>
  {/* 1. Sous-titre discret (Lignes dorées plus courtes) */}
  <div className="inline-flex items-center gap-3 mb-4 mx-auto lg:mx-0">
    <div className="w-8 h-px bg-primary" />
    <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
      À Propos du Cabinet
    </span>
    <div className="w-8 h-px bg-primary" />
  </div>
            
            {/* Titre agrandi sur mobile (text-3xl) */}
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-medium text-foreground mb-6 leading-tight">
    Leader de la dentisterie
    <br />
    <span className="text-primary">Moderne et esthétique</span>
  </h2>
            
             <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
  Au Centre&nbsp;Dentaire Al&nbsp;Boughaz, nous sommes convaincus que chaque patient mérite un&nbsp;sourire d'exception. 
  Notre clinique, idéalement située Avenue&nbsp;Moulay&nbsp;Youssef, allie les dernières innovations technologiques 
  à&nbsp;une approche personnalisée pour offrir une&nbsp;expertise de&nbsp;référence au&nbsp;cœur de&nbsp;Tanger.
</p>
            <p className="text-muted-foreground mb-12 leading-relaxed">
  Référence de&nbsp;confiance à&nbsp;proximité immédiate de&nbsp;la&nbsp;Mosquée&nbsp;Badr, nous accompagnons 
  notre patientèle avec des&nbsp;soins d'excellence, allant de&nbsp;la&nbsp;prévention essentielle 
  aux&nbsp;réhabilitations esthétiques les&nbsp;plus&nbsp;complexes.
</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 text-center md:text-left"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full shrink-0">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-semibold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};