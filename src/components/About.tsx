import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Clock, Shield } from 'lucide-react';

const stats = [
  { icon: Award, value: '10+', label: 'Ans d\'Expérience en Chirurgie' },
  { icon: Users, value: '8K+', label: ' Patients Satisfaits à Tanger' },
  { icon: Clock, value: '20K+', label: 'Soins et Interventions Réalisés' },
  { icon: Shield, value: '100%', label: 'Stérilisation et Protocoles de Sécurité' },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 image-zoom">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
                alt="Intervention de blanchiment dentaire au Centre Al Boughaz Tanger"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-2/3 z-20 shadow-card image-zoom">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80"
                alt="Équipe médicale du Dr Amine Khanboubi à Tanger"
                className="w-full aspect-square object-cover"
              />
            </div>
            {/* Decorative */}
            <div className="absolute top-8 -left-8 w-24 h-24 border border-primary/30 hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              À Propos
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl xl:text-5xl font-medium text-foreground mb-6 leading-tight">
               Leader de la Dentisterie Moderne et de l'Esthétique à Tanger
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
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-semibold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
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
