import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Smile, // Note: Smile n'était pas utilisé dans ton tableau, j'ai gardé ton import
  Activity,
  Heart,
  Zap,
  Stethoscope,
  Grid,
  Droplets,
  X, // J'ai ajouté l'icône X pour fermer la modal
} from "lucide-react";

// 1. J'ai ajouté un champ "details" pour chaque service
const services = [
  {
    icon: Sparkles,
    title: "Esthétique Dentaire & Facettes",
    description:
      "Redessinez votre sourire avec des facettes en céramique et des soins de dentisterie esthétique pour un résultat naturel.",
    details: "Nos facettes en céramique sont fabriquées sur mesure pour s'adapter parfaitement à votre visage. Ce traitement permet de corriger la forme, la teinte et l'alignement des dents en seulement deux séances. Idéal pour masquer les imperfections et obtenir un 'Hollywood Smile' naturel et durable.",
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80",
  },
  {
    icon: Droplets,
    title: "Blanchiment Dentaire Professionnel",
    description:
      "Éclaircissez vos dents avec notre technologie de blanchiment au laser haute performance.",
    details: "Le blanchiment au fauteuil offre des résultats immédiats. Nous utilisons une technologie laser qui active le gel blanchissant pour gagner jusqu'à 8 teintes en une heure, tout en protégeant vos gencives et l'émail de vos dents.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
  },
  {
    icon: Grid,
    title: "Orthodontie & Aligneurs Invisibles",
    description:
      "Correction de l'alignement dentaire pour enfants et adultes via bagues ou gouttières invisibles.",
    details: "Fini les bagues métalliques disgracieuses. Nous proposons des traitements par aligneurs transparents (type Invisalign) qui sont amovibles et quasi invisibles. Nous traitons également les cas complexes avec des techniques orthodontiques modernes pour enfants et adultes.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
  },
  {
    icon: Stethoscope,
    title: "Implantologie & Prothèses",
    description:
      "Pose d'implants dentaires et solutions de remplacement permanent pour retrouver une fonction masticatoire parfaite.",
    details: "L'implant dentaire est la solution la plus fiable pour remplacer une dent manquante. Notre protocole chirurgical stérile et guidé par imagerie 3D assure une précision maximale et une guérison rapide pour retrouver le confort de mastication.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },
  {
    icon: Heart,
    title: "Dentisterie Pédiatrique (Enfants)",
    description:
      "Soins doux pour enfants afin de prévenir les caries et instaurer une hygiène bucco-dentaire durable.",
    details: "Nous créons un environnement ludique et rassurant pour vos enfants. Nos soins incluent le scellement des sillons, l'éducation à l'hygiène, le soin des caries et le suivi de la croissance des mâchoires pour éviter des problèmes futurs.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
  },
  {
    icon: Zap,
    title: "Urgences Dentaires Tanger",
    description:
      "Soulagement immédiat des douleurs dentaires aiguës sur l'Avenue Moulay Youssef, près de la Mosquée Badr.",
    details: "Rage de dent ? Abcès ? Dent cassée ? Notre service d'urgence vous accueille prioritairement pour soulager la douleur immédiatement. Situé au centre de Tanger, nous sommes équipés pour gérer toutes les urgences bucco-dentaires.",
    image:
      "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&q=80",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // 2. État pour gérer le service sélectionné (pour la modal)
  const [selectedService, setSelectedService] = useState<any>(null);

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
          <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
            Services Dentaires
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground mb-6">
            Services Dentaires et Expertise en Esthétique du Sourire
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            De la prévention à la chirurgie dentaire complexe, nous offrons une
            gamme complète de traitements pour votre santé dentaire.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              // 3. Au clic sur la carte entière, on ouvre la modal
              onClick={() => setSelectedService(service)}
              className="group relative overflow-hidden bg-background cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
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
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* 4. Bouton qui simule un lien mais ouvre la modal */}
                <button
                  className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300 bg-transparent border-none p-0 cursor-pointer"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. MODAL / POPUP pour afficher les détails */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
             {/* Arrière-plan sombre (Backdrop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Contenu de la Modal */}
            <motion.div
              layoutId={`card-${selectedService.title}`} // Animation fluide optionnelle
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-background w-full max-w-2xl rounded-lg shadow-2xl max-h-[90vh] overflow-hidden z-10"
            >
              {/* Image en haut de la modal */}
              <div className="relative h-48 md:h-56">
                <img 
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                
                {/* Bouton Fermer */}
                <button 
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                >
                    <X className="w-6 h-6" />
                </button>
              </div>

              {/* Texte de la modal */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                        <selectedService.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-3xl font-medium text-foreground">
                        {selectedService.title}
                    </h3>
                </div>

                <div className="space-y-4">
                    <p className="text-lg font-medium text-foreground">
                        {selectedService.description}
                    </p>
                    <hr className="border-border" />
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {/* Affiche le texte détaillé ici */}
                        {selectedService.details}
                    </p>
                </div>

                <div className="mt-8 pt-6">
                    <a 
                        href="#contact" 
                        onClick={() => setSelectedService(null)}
                        className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded hover:bg-foreground hover:text-background transition-colors duration-300 inline-flex items-center justify-center gap-2"
                    >
                        Prendre rendez-vous pour ce soin
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};