import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import lucmanImg from "../assets/images/Lucman Bounoider.png";
import photonull from "../assets/images/photo null.jpg";

const testimonials = [
  {
    id: 1,
    name: 'Lucman Bounoider',
    image: lucmanImg,
    content: 'Je vous avoue que j’ai généralement peur des Dentiste, mais avec le Dr. Amine c’est juste incroyable j’ai surmonté ma phobie et en plus de ça il est très compréhensif il explique très bien il ne juge pas, petit plus il parle français. Je vous le recommande fortement !!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sam Nigrasco',
    image: photonull,
    content: 'Je suis patient du Dr. Amine depuis plus de 10 ans. Même après avoir passé trois ans hors du Maroc, il a été la première personne vers qui je me suis tourné pour une urgence dentaire. Professionnalisme exemplaire. Dr. Khanboubi est véritablement dévoué à ses patients.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Najlae Laaroussi',
    image: photonull,
    content: 'Je tiens à vous remercier de rendre chaque visite si confortable. J\'ai énormément apprécié votre gentillesse et le temps que vous avez pris pour tout m\'expliquer. Cela m\'a permis de mieux comprendre ma santé bucco-dentaire et, aujourd\'hui, je n\'ai plus peur.',
    rating: 5,
  },
];

const AUTOPLAY_DELAY = 6000; // 6 secondes par slide

export const Testimonials = () => {
  // 1. Ref pour l'animation d'entrée du texte (reste identique)
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });

  // 2. NOUVEAU : Ref pour surveiller si la section est visible à l'écran (pour l'autoplay)
  const sectionRef = useRef(null);
  const isSectionVisible = useInView(sectionRef, { amount: 0.3 }); // Active quand 30% est visible

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // --- LOGIQUE AUTO-PLAY INTELLIGENTE ---
  useEffect(() => {
    // STOP SI :
    // 1. L'utilisateur a mis en pause (souris dessus)
    // 2. OU SI la section n'est pas visible (!isSectionVisible)
    if (isPaused || !isSectionVisible) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, isSectionVisible]); // On ajoute isSectionVisible aux dépendances

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Boutons de navigation
  const NavigationButtons = ({ className = "" }) => (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        onClick={prevTestimonial}
        className="w-14 h-14 flex items-center justify-center border border-border text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextTestimonial}
        className="w-14 h-14 flex items-center justify-center border border-border text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} // 3. On attache la ref ici pour surveiller la section
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-card hidden lg:block" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* GAUCHE : Textes */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -60 }}
            animate={isTextInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-4 mb-8 lg:gap-3 lg:mb-6">
              <div className="w-20 lg:w-12 h-px bg-primary" />
              <span className="text-xl lg:text-sm font-bold lg:font-medium tracking-[0.3em] uppercase text-gradient">
                Témoignages
              </span>
              <div className="w-20 lg:w-12 h-px bg-primary" />
            </div>

            <h2 className="font-serif text-6xl lg:text-4xl xl:text-6xl font-bold lg:font-medium text-foreground mb-10 lg:mb-6 leading-tight">
              Ce que nos patients
              <br />
              <span className="text-gradient">disent de nous</span>
            </h2>

            <p className="text-muted-foreground text-2xl lg:text-xl mb-14 lg:mb-12 leading-relaxed font-medium lg:font-normal">
              Ne vous contentez pas de nous croire sur parole. Écoutez ce que nos patients satisfaits disent de leur expérience au Centre Dentaire Al Boughaz.
            </p>
            
            <NavigationButtons className="hidden lg:flex" />
          </motion.div>

          {/* DROITE : Carte interactive avec Animation */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isTextInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            // --- INTERACTION : STOP & GO ---
            onMouseEnter={() => setIsPaused(true)}  // Souris entre (PC)
            onMouseLeave={() => setIsPaused(false)} // Souris sort (PC)
            onTouchStart={() => setIsPaused(true)}  // Doigt touche (Mobile)
            onTouchEnd={() => setIsPaused(false)}   // Doigt lève (Mobile)
          >
            {/* AnimatePresence permet d'animer la sortie de l'ancien slide */}
            <div className="bg-card relative shadow-2xl rounded-sm overflow-hidden min-h-[500px] lg:min-h-[400px] flex flex-col justify-center">
                
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="p-12 lg:p-12"
                    >
                        <Quote className="w-20 h-20 lg:w-12 lg:h-12 text-primary/20 mb-8 lg:mb-6" />
                        
                        <div className="flex items-center gap-2 lg:gap-1 mb-8 lg:mb-6">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-8 h-8 lg:w-5 lg:h-5 text-primary fill-primary" />
                            ))}
                        </div>

                        <p className="text-foreground text-2xl lg:text-xl leading-relaxed mb-10 lg:mb-8 font-serif">
                            "{testimonials[currentIndex].content}"
                        </p>

                        <div className="flex items-center gap-6 lg:gap-4">
                            <img
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name}
                            className="w-20 h-20 lg:w-14 lg:h-14 object-cover"
                            />
                            <div>
                            <div className="font-bold text-foreground text-2xl lg:text-lg">
                                {testimonials[currentIndex].name}
                            </div>
                            <div className="text-muted-foreground text-xl lg:text-sm">Patient vérifié</div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* --- BARRE DE PROGRESSION --- */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-muted">
                    {/* La barre s'anime SEULEMENT si ce n'est pas en pause ET si la section est visible */}
                    {!isPaused && isSectionVisible && (
                        <motion.div
                            key={currentIndex}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                            className="h-full bg-gradient-gold"
                        />
                    )}
                    {/* Feedback visuel de pause */}
                    {isPaused && (
                        <div className="h-full bg-primary/50 w-full animate-pulse" />
                    )}
                </div>

            </div>

            {/* Bordure décorative décalée */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/30 -z-10" />

          </motion.div>

          {/* Navigation Mobile */}
          <div className="mt-10 lg:mt-8 flex justify-center lg:hidden">
            <NavigationButtons />
          </div>
        </div>
      </div>
    </section>
  );
};