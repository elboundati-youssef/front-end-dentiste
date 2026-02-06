import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sam Nigrasco',
    
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'Je suis patient du Dr. Amine depuis plus de 10 ans. Même après avoir passé trois ans hors du Maroc, il a été la première personne vers qui je me suis tourné pour une urgence dentaire. Il m\'a reçu sur l\'Avenue Moulay Youssef dans un délai très court et a terminé le traitement en une semaine avec un professionnalisme exemplaire. Dr. Khanboubi est véritablement dévoué à ses patients. Hautement recommandé !',
    rating: 5,
  },
  {
    name: 'Najlae Laaroussi',
    
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    content: ' Je tiens à vous remercier de rendre chaque visite si confortable, surtout pour quelqu\'un comme moi qui avait un véritable traumatisme des dentistes. J\'ai énormément apprécié votre gentillesse et le temps que vous avez pris pour tout m\'expliquer et simplifier chaque étape. Cela m\'a permis de mieux comprendre ma santé bucco-dentaire et, aujourd\'hui, je n\'ai plus peur. Tout cela grâce à votre soutien et votre accompagnement. ❤️🥰 Merci infiniment pour le magnifique sourire que vous m\'avez donné ! 😁❤️🦷',
    rating: 5,
  },
  {
    name: 'Sophie Wagner',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    content: 'After years of being self-conscious about my teeth, I finally have the smile I\'ve always wanted. The Invisalign treatment was seamless, and the results exceeded my expectations.',
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

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-card hidden lg:block" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
  ref={ref}
  initial={{ opacity: 0, x: -60 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  {/* 1. Sous-titre avec lignes dorées */}
  <div className="inline-flex items-center gap-3 mb-6">
    <div className="w-12 h-px bg-primary" />
    <span className="text-sm font-medium tracking-[0.3em] uppercase text-gradient">
      Témoignages
    </span>
    <div className="w-12 h-px bg-primary" />
  </div>

  {/* 2. Grand Titre */}
  <h2 className="font-serif text-2xl lg:text-4xl xl:text-6xl font-medium text-foreground mb-6 leading-tight">
    Ce que nos patients
    <br />
    <span className="text-gradient">disent de nous</span>
  </h2>

  {/* 3. Description */}
  <p className="text-muted-foreground text-lg lg:text-xl mb-12 leading-relaxed">
    Ne vous contentez pas de nous croire sur parole. Écoutez ce que nos patients satisfaits disent de leur expérience au Centre Dentaire Al Boughaz.
  </p>


            {/* Navigation */}
            <div className="flex items-center gap-4">
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
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
