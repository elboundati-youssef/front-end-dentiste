import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Clock, Shield } from 'lucide-react';
import img1 from "@/assets/images/compressed/DSC01770-C.webp";
import img2 from "@/assets/images/compressed/DSC09122-C.webp";

const stats = [
  { icon: Award, value: '10+', label: "Ans d'Expérience \n en Chirurgie Dentaire" },
  { icon: Users, value: '8K+', label: 'Patients Satisfaits à Tanger' },
  { icon: Clock, value: '20K+', label: 'Soins et Interventions Réalisés' },
  { icon: Shield, value: '100%', label: 'Stérilisation et Protocoles \n de Sécurité' },
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
                src={img2}
                alt="Intervention de blanchiment dentaire au Centre Al Boughaz Tanger"
                className="w-full aspect-[4/5] object-cover rounded shadow-lg"
              />
            </div>
            {/* Ajustement de la position pour mobile (-bottom-4 au lieu de -8) */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8 w-2/3 z-20 shadow-card image-zoom">
              <img
                src={img1}
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
<div className="inline-flex items-center gap-6 mb-8 mx-auto lg:mx-0">
  {/* Lignes dorées plus longues sur mobile (w-16 au lieu de w-8) */}
  <div className="w-16 h-px bg-primary" />
  <span className="text-base lg:text-xs font-bold tracking-[0.3em] uppercase text-gradient">
    À Propos du Cabinet
  </span>
  <div className="w-16 h-px bg-primary" />
</div>

{/* 2. Titre Principal (Passé de text-1xl à text-5xl sur mobile) */}
<h2 className="font-serif text-5xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-10 leading-tight">
  Plus qu'un Cabinet dentaire,
  <br />
  <span className="text-gradient">une Signature de Soins à Tanger.</span>
</h2>
            
             <p className="text-muted-foreground text-2xl lg:text-lg mb-12 leading-relaxed font-medium">
  Situé sur l’avenue Moulay Youssef, le Centre Dentaire Al Boughaz <br /> a été conçu comme un sanctuaire dédié à la santé et à l’esthétique <br /> de votre sourire. <br /> Notre vision dépasse la dentisterie conventionnelle : nous croyons <br />en une approche globale où la haute technologie rencontre le confort absolu.
</p>

            <p className="text-muted-foreground text-2xl lg:text-base mb-16 leading-relaxed font-medium">
  Dans un cadre moderne et apaisant, nous avons investi dans les dernières innovations numériques (Scanner 3D, Laser) pour garantir des diagnostics d'une précision chirurgicale et des traitements d'une douceur inégalée.<br /> Ici, chaque patient est unique, et chaque sourire est une œuvre d'art <br /> que nous protégeons.
</p>

            {/* Stats */}
<div className="grid grid-cols-2 gap-8 md:gap-8 mt-12">
  {stats.map((stat, index) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
      // Mobile: Colonne centrée | Desktop: Reste en ligne (flex-row)
      className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-4 text-center md:text-left"
    >
      {/* CERCLE ICONE : w-24 sur Mobile | Retour w-12 sur PC (lg) */}
      <div className="w-24 h-24 lg:w-12 lg:h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full shrink-0">
        {/* ICONE : w-12 sur Mobile | Retour w-6 sur PC (lg) */}
        <stat.icon strokeWidth={2.5} className="w-12 h-12 lg:w-6 lg:h-6 lg:stroke-2" />
      </div>
      
      <div>
        {/* CHIFFRE : text-5xl sur Mobile | Retour text-3xl sur PC (lg) */}
        <div className="font-serif text-5xl lg:text-3xl font-bold lg:font-semibold text-foreground mb-2 lg:mb-0">
          {stat.value}
        </div>
        
        {/* LABEL : text-xl sur Mobile | Retour text-sm sur PC (lg) */}
        <div className="text-xl lg:text-sm text-muted-foreground leading-tight whitespace-pre-line font-medium lg:font-normal">
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