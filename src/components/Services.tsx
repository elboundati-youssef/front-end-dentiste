import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // Import important
import { servicesData } from "@/data/servicesData"; // On utilise les données partagées

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
  {/* 1. Sous-titre avec les lignes dorées */}
  <div className="inline-flex items-center gap-3 mb-6">
    <div className="w-12 h-px bg-primary" />
    <span className="text-sm font-medium tracking-[0.3em] uppercase text-gradient">
      Services Dentaires
    </span>
    <div className="w-12 h-px bg-primary" />
  </div>

  {/* 2. Grand Titre Luxueux (Style copié) */}
  <h2 className="font-serif text-4xl lg:text-5xl xl:text-7xl font-medium text-foreground mb-6 leading-tight">
    Services dentaires 
    <br />
    <span className="text-gradient">Et esthétique du sourire</span>
  </h2>

  {/* 3. Description */}
  <p className="max-w-2xl mx-auto text-muted-foreground text-lg lg:text-xl">
    De la prévention à la chirurgie dentaire complexe, nous offrons une
    gamme complète de traitements pour votre santé dentaire.
  </p>
</motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden bg-background"
            >
              {/* Le Lien qui englobe tout ou juste le bouton */}
              <Link to={`/service/${service.id}`} className="block h-full">
                  
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
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

                  {/* Content */}
                  <div className="relative p-8">
                    <div className="w-14 h-14 flex items-center justify-center bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                    
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};