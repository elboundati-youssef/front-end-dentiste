import { useRef, useEffect } from 'react';
import { ArrowDown, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.8'
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 80, clipPath: 'inset(100% 0% 0% 0%)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2 },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: 200,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Content fade out on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });

      // Floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Decorative lines animation
      gsap.fromTo(
        '.hero-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      // --- MODIFICATION MOBILE : Hauteur réduite (85vh) + padding ajusté ---
      className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-20 pb-10 lg:py-0"
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
          alt="Centre Dentaire Al Boughaz Tanger - Cabinet moderne sur l'Avenue Moulay Youssef près de la Mosquée Badr"
          className="w-full h-full object-cover"
        />
      </div>

{/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 container mx-auto px-6 lg:px-12 text-center"
      >
        {/* Tagline : text-sm sur mobile (au lieu de xs) */}
        <div ref={taglineRef} className="flex items-center justify-center gap-3 mb-4 lg:mb-8">
          <Star className="w-3 h-3 lg:w-4 lg:h-4 text-primary fill-primary" />
          
          <span className="text-sm lg:text-sm font-medium tracking-[0.2em] lg:tracking-[0.3em] uppercase text-gradient">
            Soins Dentaires Premium au Cœur de Tanger
          </span>
          
          <Star className="w-3 h-3 lg:w-4 lg:h-4 text-primary fill-primary" />
        </div>

        {/* Main Heading : text-6xl sur mobile (au lieu de 4xl) -> TRÈS GROS */}
        <h1
          ref={headingRef}
          className="font-serif text-6xl md:text-7xl lg:text-8xl xl:text-7xl font-medium text-foreground mb-6 lg:mb-8 leading-tight"
        >
          Retrouvez la confiance,<br />
          <span className="text-gradient block mt-2 lg:inline"> d’un sourire éclatant</span>
        </h1>

        {/* Subtitle : text-xl sur mobile (au lieu de base) */}
        <p
          ref={subtitleRef}
          className="max-w-4xl mx-auto text-xl lg:text-xl text-muted-foreground mb-8 lg:mb-12"
        >
          Vous recherchez l'excellence dentaire à Tanger ?<br />
          À deux pas de la Mosquée Badr, le Dr Amine Khanboubi déploie<br />
          au sein du Centre Dentaire Al Boughaz les meilleures technologies
          et une expertise<br /> internationale en implantologie et orthodontie pour transformer votre sourire.
        </p>

        {/* CTA Buttons : Padding (px-10 py-5) et Texte (text-xl) augmentés pour mobile */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5 lg:gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto group relative px-10 py-5 lg:px-8 lg:py-4 bg-gradient-gold text-primary-foreground font-medium overflow-hidden transition-all duration-500 hover:shadow-glow rounded lg:rounded-none"
          >
            {/* Texte Bouton 1 : text-xl */}
            <span className="relative z-10 text-xl lg:text-base font-bold">
              Commencer ma Transformation
            </span>
            
            <div className="absolute inset-0 bg-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-gradient">
              Commencer ma Transformation
            </span>
          </a>
          
          <a
            href="#services"
            className="w-full sm:w-auto px-10 py-5 lg:px-8 lg:py-4 border border-foreground/20 text-foreground font-medium hover:border-primary hover:text-primary transition-all duration-300 rounded lg:rounded-none text-xl lg:text-base"
          >
            <span className="group-hover:text-gradient transition-colors">Explorer nos Soins</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator : Visible sur mobile et agrandi (w-8 h-8) */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-80"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-[0.3em] uppercase">Défiler</span>
          <ArrowDown className="w-8 h-8 lg:w-4 lg:h-4 animate-bounce" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hero-line absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block origin-top" />
      <div className="hero-line absolute top-1/3 right-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block origin-top" />
    </section>
  );
};