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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
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
        {/* Tagline */}
        <div ref={taglineRef} className="flex items-center justify-center gap-3 mb-8">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
            Soins Dentaires Premium au Cœur de Tanger
          </span>
          <Star className="w-4 h-4 text-primary fill-primary" />
        </div>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-7xl font-medium text-foreground mb-8 leading-tight"
        >
          Excellence Esthétique et Innovation,<br />
          <span className="text-primary"> au Centre Dentaire Al Boughaz</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12"
        >
          Vous recherchez le meilleur dentiste à Tanger ? Découvrez une expérience de soins bucco-dentaires d'exception sur l’Avenue Moulay Youssef. Le Dr. Amine Khanboubi allie chirurgie dentaire de pointe et attention personnalisée pour créer des sourires sains et éclatants, à deux pas de la Mosquée Badr.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-medium overflow-hidden transition-all duration-500 hover:shadow-glow"
          >
            <span className="relative z-10">Prendre Rendez-vous en Ligne</span>
            <div className="absolute inset-0 bg-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              Prendre Rendez-vous en Ligne
            </span>
          </a>
          <a
            href="#services"
            className="group px-8 py-4 border border-foreground/20 text-foreground font-medium hover:border-primary hover:text-primary transition-all duration-300"
          >
            Explorer nos Soins

          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-[0.3em] uppercase">Défiler</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hero-line absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block origin-top" />
      <div className="hero-line absolute top-1/3 right-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block origin-top" />
    </section>
  );
};
