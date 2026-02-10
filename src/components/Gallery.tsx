import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Expand, X } from 'lucide-react';

// Traduction des onglets
const tabs = ['Tous', 'Avant & Après', 'Clinique', 'Équipe'];

// Données de la galerie
const galleryItems = [
  { 
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80', 
    category: 'Clinique', 
    span: 'col-span-2 row-span-2',
    alt: 'Cabinet dentaire moderne et salle d\'attente'
  },
  { 
    src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80', 
    category: 'Avant & Après', 
    span: '',
    alt: 'Résultat blanchiment dentaire professionnel'
  },
  { 
    src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80', 
    category: 'Équipe', 
    span: '',
    alt: 'Assistantes dentaires et hygiénistes'
  },
  { 
    src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80', 
    category: 'Avant & Après', 
    span: '',
    alt: 'Pose de facettes dentaires céramique'
  },
  { 
    src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80', 
    category: 'Clinique', 
    span: '',
    alt: 'Technologie dentaire de pointe'
  },
  { 
    src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', 
    category: 'Avant & Après', 
    span: 'col-span-2',
    alt: 'Restaurations dentaires complexes et implants'
  },
];

export const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('Tous');
  
  // État pour gérer l'image sélectionnée (Lightbox)
  const [selectedImage, setSelectedImage] = useState(null);

  // Filtrage
  const filteredItems = activeTab === 'Tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  // Empêcher le scroll quand la lightbox est ouverte
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Sous-titre */}
        <div className="inline-flex items-center gap-4 mb-8 lg:gap-3 lg:mb-6">
    {/* Lignes dorées : w-20 sur mobile | lg:w-12 sur PC */}
    <div className="w-20 lg:w-12 h-px bg-primary" />
    <span className="text-xl lg:text-sm font-bold lg:font-medium tracking-[0.3em] uppercase text-gradient">
      Galerie Photos
    </span>
    <div className="w-20 lg:w-12 h-px bg-primary" />
  </div>

         {/* 2. Titre : Triple Taille sur mobile (text-6xl) | Original sur PC (lg:text-5xl) */}
  <h2 className="font-serif text-6xl lg:text-5xl xl:text-7xl font-bold lg:font-medium text-foreground mb-10 lg:mb-8 leading-tight">
    Découvrez 
    <br />
    <span className="text-gradient">Nos réalisations</span>
  </h2>

        
          {/* Tabs - AGRANDIS sur mobile */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-5 lg:px-6 lg:py-3 text-2xl lg:text-sm font-bold lg:font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-gold text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground border-2 lg:border border-border hover:border-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.src}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              // AJOUT DU CLIC POUR OUVRIR LA LIGHTBOX
              onClick={() => setSelectedImage(item)}
              className={`group relative overflow-hidden cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt ? `${item.alt} - Centre Al Boughaz Tanger` : `Galerie dentaire ${index + 1}`}
                className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay avec icône Expand */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <Expand className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- LIGHTBOX (MODAL PLEIN ÉCRAN) --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Ferme la modal si on clique sur le fond noir
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4 lg:p-10"
          >
           {/* Bouton Fermer - AGRANDI sur mobile */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 lg:top-10 lg:right-10 w-20 h-20 lg:w-12 lg:h-12 flex items-center justify-center bg-background border-2 lg:border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300 rounded-full z-50"
            >
              <X className="w-10 h-10 lg:w-6 lg:h-6" />
            </button>

            {/* Image en Grand */}
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              // Empêche la fermeture si on clique sur l'image elle-même
              onClick={(e) => e.stopPropagation()}
            />
            
           {/* Légende - AGRANDIE sur mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 lg:bottom-10 left-0 right-0 text-center px-6 lg:px-4"
            >
              <p className="text-white/80 text-2xl lg:text-lg font-medium">{selectedImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};