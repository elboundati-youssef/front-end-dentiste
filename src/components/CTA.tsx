import { useRef, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background circles animation
      gsap.fromTo(
        '.cta-circle',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.1,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading reveal
      gsap.fromTo(
        '.cta-heading',
        { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Buttons stagger
      gsap.fromTo(
        '.cta-button',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-gold relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="cta-circle absolute top-0 left-0 w-96 h-96 border border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="cta-circle absolute bottom-0 right-0 w-[600px] h-[600px] border border-primary-foreground rounded-full translate-x-1/4 translate-y-1/4" />
        <div className="cta-circle absolute top-1/2 left-1/2 w-[800px] h-[800px] border border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          
          {/* Titre AGRANDI sur mobile */}
          <h2 className="cta-heading font-serif text-6xl lg:text-5xl xl:text-6xl font-medium text-primary-foreground mb-8 lg:mb-6 leading-tight">
            Prêt à transformer votre sourire?
          </h2>
          
          {/* Description AGRANDIE sur mobile */}
          <p className="text-primary-foreground/80 text-2xl lg:text-xl mb-14 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Planifiez votre&nbsp;consultation dès&nbsp;aujourd'hui et&nbsp;découvrez comment nous&nbsp;pouvons vous&nbsp;aider à&nbsp;obtenir le&nbsp;sourire dont vous&nbsp;avez toujours&nbsp;rêvé.
          </p>

          {/* Boutons AGRANDIS et VERTICAUX sur mobile */}
          <div className="flex flex-row items-stretch lg:items-center justify-center gap-6 lg:gap-4">
            <a
              href="#contact"
              className="cta-button group px-14 py-7 lg:px-8 lg:py-4 bg-primary-foreground text-primary font-medium inline-flex items-center justify-center gap-4 lg:gap-3 hover:bg-background transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl lg:text-base font-bold lg:font-medium">Prendre Rendez-vous</span>
              <ArrowRight className="w-8 h-8 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="tel:+212539355133"
              className="cta-button px-14 py-7 lg:px-8 lg:py-4 border-2 lg:border border-primary-foreground/30 text-primary-foreground font-medium inline-flex items-center justify-center gap-4 lg:gap-3 hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-8 h-8 lg:w-4 lg:h-4" />
              <span className="text-2xl lg:text-base font-bold lg:font-medium">+212 5 39 35 51 33</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};