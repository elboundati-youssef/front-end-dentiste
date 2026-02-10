import { useRef, useEffect } from 'react';
import { ArrowDown, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import image2 from "@/assets/images/compressed/DSC09094-CT.jpg";
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
      className="relative h-screen lg:min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-32 pb-20 lg:py-0"
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <img
          src={image2}
          alt="Centre Dentaire Al Boughaz Tanger - Cabinet moderne sur l'Avenue Moulay Youssef près de la Mosquée Badr"
          className="w-full h-full object-cover"
          width={1280}
          height={720}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 container mx-auto px-6 lg:px-12 text-center"
      >
        {/* Tagline - ÉNORME sur mobile */}
        <div ref={taglineRef} className="flex items-center justify-center gap-6 mb-8 lg:mb-8">
          <Star className="w-7 h-7 lg:w-4 lg:h-4 text-primary fill-primary" />
          
          <span className="text-2xl lg:text-sm font-bold lg:font-medium tracking-[0.2em] lg:tracking-[0.3em] uppercase text-gradient">
            Soins Dentaires Premium au Cœur de Tanger
          </span>
          
          <Star className="w-7 h-7 lg:w-4 lg:h-4 text-primary fill-primary" />
        </div>

        {/* Main Heading - TRÈS ÉNORME sur mobile */}
        <h1
          ref={headingRef}
          className="font-serif text-[5.5rem] leading-[1] md:text-9xl lg:text-8xl xl:text-7xl font-bold lg:font-medium text-foreground mb-10 lg:mb-8 lg:leading-tight"
        >
          Retrouvez la confiance,<br />
          <span className="text-gradient block mt-4 lg:mt-2 lg:inline"> d'un sourire éclatant</span>
        </h1>

         {/* Subtitle - ÉNORME sur mobile, texte naturel sans br forcés */}
        <p
          ref={subtitleRef}
          className="max-w-4xl mx-auto text-[2.8rem] leading-snug lg:text-xl text-muted-foreground mb-12 lg:mb-12 lg:leading-relaxed font-medium lg:font-normal"
        >
          {/* Desktop : avec sauts de ligne */}
          <span className="hidden lg:inline">
            Vous recherchez l'excellence dentaire à Tanger ?<br />
            À deux pas de la Mosquée Badr, le Dr Amine Khanboubi déploie<br />
            au sein du Centre Dentaire Al Boughaz les meilleures technologies
            et une expertise<br /> internationale en implantologie et orthodontie pour transformer votre sourire.
          </span>
          {/* Mobile : texte fluide sans br */}
          <span className="lg:hidden">
            Vous recherchez <br />l'excellence dentaire à Tanger ?<br /> À deux pas de la Mosquée Badr,<br /> le Dr Amine Khanboubi déploie au sein <br /> du Centre Dentaire Al Boughaz <br />les meilleures technologies et une expertise internationale en implantologie et orthodontie pour transformer<br /> votre sourire.
          </span>
        </p>

        {/* CTA Buttons - DOUBLE TAILLE et VERTICAUX sur mobile */}
        <div ref={ctaRef} className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-6 lg:gap-4">
          <a
            href="#contact"
            className="w-full lg:w-auto group relative px-16 py-8 lg:px-8 lg:py-4 bg-gradient-gold text-primary-foreground font-medium overflow-hidden transition-all duration-500 hover:shadow-glow rounded lg:rounded-none"
          >
            <span className="relative z-10 text-4xl lg:text-base font-bold">
              Commencer ma Transformation
            </span>
            
            <div className="absolute inset-0 bg-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-gradient text-4xl lg:text-base">
              Commencer ma Transformation
            </span>
          </a>
          
          <a
            href="#services"
            className="w-full lg:w-auto px-16 py-8 lg:px-8 lg:py-4 border-2 lg:border border-foreground/20 text-foreground font-medium hover:border-primary hover:text-primary transition-all duration-300 rounded lg:rounded-none text-4xl lg:text-base"
          >
            <span className="group-hover:text-gradient transition-colors font-bold lg:font-medium">Explorer nos Soins</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator - DOUBLE TAILLE sur mobile */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-80"
      >
        <div className="flex flex-col items-center gap-5 lg:gap-2 text-muted-foreground">
          <span className="text-2xl lg:text-xs tracking-[0.3em] uppercase font-medium">Défiler</span>
          <ArrowDown className="w-16 h-16 lg:w-4 lg:h-4 animate-bounce" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hero-line absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block origin-top" />
      <div className="hero-line absolute top-1/3 right-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block origin-top" />
    </section>
  );
};