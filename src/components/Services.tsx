import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { servicesData } from "@/data/servicesData";

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 lg:py-32 bg-card relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          {/* Sous-titre */}
          <div className="inline-flex items-center gap-4 mb-8 lg:gap-3 lg:mb-6">
            <div className="w-20 lg:w-12 h-px bg-primary" />
            <span className="text-xl lg:text-sm font-bold lg:font-medium tracking-[0.3em] uppercase text-gradient">
              Services Dentaires
            </span>
            <div className="w-20 lg:w-12 h-px bg-primary" />
          </div>

          {/* Grand Titre */}
          <h2 className="font-serif text-6xl lg:text-5xl xl:text-7xl font-bold lg:font-medium text-foreground mb-10 lg:mb-6 leading-tight">
            Services dentaires 
            <br />
            <span className="text-gradient">Et esthétique du sourire</span>
          </h2>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-muted-foreground text-2xl lg:text-xl leading-relaxed font-medium lg:font-normal">
            De la prévention à la chirurgie dentaire complexe, nous offrons une
            gamme complète de traitements pour votre santé dentaire.
          </p>
        </motion.div>

        {/* Services Grid */}
        {/* Mobile: 1 colonne (grid-cols-1) + Grand écart (gap-12) */}
        {/* Desktop: 3 colonnes (lg:grid-cols-3) + Écart normal (lg:gap-8) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 w-full">
          
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              // Mobile: shadow-2xl pour détacher la carte GÉANTE
              className="group relative overflow-hidden bg-background shadow-2xl lg:shadow-none rounded-xl lg:rounded-none"
            >
              <Link to={`/service/${service.id}`} className="block h-full">
                  
                  {/* Image : Plus haute sur mobile (h-80 = 320px) pour l'effet "Grand" */}
                  <div className="relative h-80 lg:h-64 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={`Cabinet Dentaire Tanger - ${service.title}`}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>

                  {/* Content : Padding agrandi sur mobile (p-10) */}
                  <div className="relative p-10 lg:p-8">
                    
                    {/* Icone : GÉANTE sur mobile (w-20 h-20) */}
                    <div className="w-20 h-20 lg:w-14 lg:h-14 flex items-center justify-center bg-primary/10 text-primary mb-8 lg:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 rounded-full lg:rounded-none">
                      {/* Taille icône interne : w-10 h-10 */}
                      <service.icon className="w-10 h-10 lg:w-7 lg:h-7" />
                    </div>

                    {/* Titre : GÉANT sur mobile (text-4xl) */}
                    <h3 className="font-serif text-4xl lg:text-2xl font-bold lg:font-medium text-foreground mb-6 lg:mb-3">
                      {service.title}
                    </h3>

                    {/* Description : text-xl sur mobile */}
                    <p className="text-muted-foreground text-xl lg:text-base mb-8 lg:mb-6 leading-relaxed line-clamp-3 font-medium lg:font-normal">
                      {service.description}
                    </p>
                    
                    {/* Lien : Agrandis sur mobile */}
                    <span className="inline-flex items-center gap-3 text-xl lg:text-base text-primary font-bold lg:font-medium group-hover:gap-4 transition-all duration-300">
                      En savoir plus
                      <ArrowRight className="w-6 h-6 lg:w-4 lg:h-4" />
                    </span>
                  </div>

                  {/* Hover Border (Desktop uniquement) */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none hidden lg:block" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};