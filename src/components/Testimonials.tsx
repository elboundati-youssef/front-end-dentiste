import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import lucmanImg from "../assets/images/Lucman Bounoider.png";
import photonull from "../assets/images/photo null.jpg";

const testimonials = [
  {
    name: 'Lucman Bounoider',
    image: lucmanImg,
    content: 'Je vous avoue que j’ai généralement peur des Dentiste, mais avec le Dr. Amine c’est juste incroyable j’ai surmonté ma phobie et en plus de ça il est très compréhensif il explique très bien il ne juge pas, petit plus il parle français, les femmes avec qui il travaille sont juste adorables, même pour la barrière de la langue, on arrive quand même à se faire comprendre je vous le recommande fortement !! Encore merci au docteur amine et son équipe 😊.',
    rating: 5,
  },
  {
    name: 'Sam Nigrasco',
    image: photonull,
    content: 'Je suis patient du Dr. Amine depuis plus de 10 ans. Même après avoir passé trois ans hors du Maroc, il a été la première personne vers qui je me suis tourné pour une urgence dentaire. Il m\'a reçu sur l\'Avenue Moulay Youssef dans un délai très court et a terminé le traitement en une semaine avec un professionnalisme exemplaire. Dr. Khanboubi est véritablement dévoué à ses patients. Hautement recommandé !',
    rating: 5,
  },
  {
    name: 'Najlae Laaroussi',
    image: photonull,
    content: ' Je tiens à vous remercier de rendre chaque visite si confortable, surtout pour quelqu\'un comme moi qui avait un véritable traumatisme des dentistes. J\'ai énormément apprécié votre gentillesse et le temps que vous avez pris pour tout m\'expliquer et simplifier chaque étape. Cela m\'a permis de mieux comprendre ma santé bucco-dentaire et, aujourd\'hui, je n\'ai plus peur. Tout cela grâce à votre soutien et votre accompagnement. ❤️🥰 Merci infiniment pour le magnifique sourire que vous m\'avez donné ! 😁❤️🦷',
    rating: 5,
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Composant Boutons de Navigation (pour éviter la duplication de code)
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
      <span className="ml-4 text-muted-foreground">
        <span className="text-foreground font-medium">{currentIndex + 1}</span>
        {' / '}
        {testimonials.length}
      </span>
    </div>
  );

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-card hidden lg:block" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content (Titres) */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* 1. Sous-titre : Style Galerie (GÉANT sur mobile) */}
<div className="inline-flex items-center gap-4 mb-8 lg:gap-3 lg:mb-6">
  {/* Lignes : w-20 sur mobile | lg:w-12 sur PC */}
  <div className="w-20 lg:w-12 h-px bg-primary" />
  
  {/* Texte : text-xl + Bold sur mobile */}
  <span className="text-xl lg:text-sm font-bold lg:font-medium tracking-[0.3em] uppercase text-gradient">
    Témoignages
  </span>
  
  <div className="w-20 lg:w-12 h-px bg-primary" />
</div>

{/* 2. Grand Titre : Style Galerie (text-6xl sur mobile) */}
<h2 className="font-serif text-6xl lg:text-4xl xl:text-6xl font-bold lg:font-medium text-foreground mb-10 lg:mb-6 leading-tight">
  Ce que nos patients
  <br />
  <span className="text-gradient">disent de nous</span>
</h2>

{/* 3. Description : Ajustée pour suivre la taille (text-2xl sur mobile) */}
<p className="text-muted-foreground text-2xl lg:text-xl mb-14 lg:mb-12 leading-relaxed font-medium lg:font-normal">
  Ne vous contentez pas de nous croire sur parole. Écoutez ce que nos patients satisfaits disent de leur expérience au Centre Dentaire Al Boughaz.
</p>
            {/* --- NAVIGATION DESKTOP (Cachée sur mobile) --- */}
            <NavigationButtons className="hidden lg:flex" />

          </motion.div>

          {/* Right Content - Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 lg:p-12 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-primary/20 mb-6" />
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground text-lg lg:text-xl leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 object-cover"
                />
                <div>
                  <div className="font-medium text-foreground">
                    {testimonials[currentIndex].name}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/30 -z-10" />

           

          </motion.div>
           {/* --- NAVIGATION MOBILE (Visible uniquement sur mobile, en dessous de la carte) --- */}
            <div className="mt-8 flex justify-center lg:hidden">
              <NavigationButtons />
            </div>
        </div>
      </div>
    </section>
  );
};