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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="cta-circle absolute top-0 left-0 w-96 h-96 border border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="cta-circle absolute bottom-0 right-0 w-[600px] h-[600px] border border-primary-foreground rounded-full translate-x-1/4 translate-y-1/4" />
        <div className="cta-circle absolute top-1/2 left-1/2 w-[800px] h-[800px] border border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
        <h2 className="cta-heading font-serif text-4xl lg:text-5xl xl:text-6xl font-medium text-primary-foreground mb-6 leading-tight">
  Prêt à transformer votre sourire?
</h2>
<p className="text-primary-foreground/80 text-lg lg:text-xl mb-12 max-w-2xl mx-auto">
  Planifiez votre&nbsp;consultation dès&nbsp;aujourd'hui et&nbsp;découvrez comment nous&nbsp;pouvons vous&nbsp;aider à&nbsp;obtenir le&nbsp;sourire dont vous&nbsp;avez toujours&nbsp;rêvé.
</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="cta-button group px-8 py-4 bg-primary-foreground text-primary font-medium inline-flex items-center gap-3 hover:bg-background transition-all duration-300 hover:scale-105"
            >
              Prendre Rendez-vous en Ligne
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="tel:+1234567890"
              className="cta-button px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-medium inline-flex items-center gap-3 hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              +212 5 39 35 51 33
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
