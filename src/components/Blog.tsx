import { useRef, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { blogData } from '@/data/blogData';

gsap.registerPlugin(ScrollTrigger);

export const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null); // Nouveau ref pour le bouton

  // On prend les 3 premiers articles pour l'accueil
  const posts = blogData.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation Header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', }
        }
      );

      // Animation Cartes
      gsap.fromTo('.blog-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: postsRef.current, start: 'top 75%', }
        }
      );

      // Animation Bouton "Voir plus" (NOUVEAU)
      gsap.fromTo(buttonRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: postsRef.current, start: 'bottom 90%', }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* En-tête */}
       <div ref={headerRef} className="text-center mb-16 lg:mb-20">
  {/* 1. Sous-titre avec lignes dorées et marge ajustée */}
  <div className="inline-flex items-center gap-3 mb-6">
    <div className="w-12 h-px bg-primary" />
    <span className="text-xl lg:text-sm font-bold lg:font-medium tracking-[0.3em] uppercase text-gradient">
      Blog Dentaire Tanger
    </span>
    <div className="w-12 h-px bg-primary" />
  </div>

  {/* 2. Grand Titre */}
  <h2 className="font-serif text-6xl lg:text-5xl xl:text-7xl font-bold lg:font-medium text-foreground mb-8 lg:mb-6 leading-tight">
    Derniers conseils 
    <br />
    <span className="text-gradient">Et articles</span>
  </h2>

  {/* 3. Description agrandie */}
  <p className="max-w-2xl mx-auto text-muted-foreground text-2xl lg:text-xl leading-relaxed font-medium lg:font-normal">
    Les conseils du Dr. Amine Khanboubi pour votre santé bucco-dentaire.
  </p>
</div>

        {/* Grille des Articles */}
 {/* Grille des Articles : Style GÉANT sur Mobile */}
        {/* Mobile: 1 colonne (grid-cols-1) + Grand écart (gap-12) */}
        {/* Desktop: 3 colonnes (lg:grid-cols-3) + Écart normal (lg:gap-8) */}
        <div ref={postsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-16 lg:mb-16 w-full"> 
          {posts.map((post) => (
            <article 
              key={post.id} 
              // Mobile: shadow-2xl + rounded-xl pour détacher la carte
              // Desktop: Style original (border, hover shadow)
              className="blog-card group bg-background border border-border/50 lg:border-border overflow-hidden shadow-2xl lg:shadow-none lg:hover:shadow-lg transition-all duration-300 rounded-xl lg:rounded-none"
            >
              <Link to={`/blog/${post.id}`} className="block h-full">
                  
                  {/* Image : Plus haute sur mobile (h-80 = 320px) */}
                  <div className="relative h-80 lg:h-64 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={`${post.title} - Dr Khanboubi Tanger`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Badge Catégorie : Agrandis sur mobile */}
                    <div className="absolute top-6 left-6 lg:top-4 lg:left-4 bg-primary text-primary-foreground px-4 py-2 lg:px-3 lg:py-1 text-sm lg:text-xs font-bold lg:font-medium uppercase tracking-wider shadow-md">
                      {post.category}
                    </div>
                  </div>

                  {/* Contenu : Padding GÉANT sur mobile (p-10) */}
                  <div className="p-10 lg:p-8">
                    
                    {/* Date : Agrandie */}
                    <div className="flex items-center gap-3 lg:gap-2 text-lg lg:text-sm text-muted-foreground mb-6 lg:mb-4 font-medium lg:font-normal">
                      <Calendar className="w-5 h-5 lg:w-4 lg:h-4" />
                      <time>{post.date}</time>
                    </div>
                    
                    {/* Titre : GÉANT (text-4xl) */}
                    <h3 className="font-serif text-4xl lg:text-xl font-bold lg:font-medium text-foreground mb-6 lg:mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    {/* Extrait : text-xl sur mobile */}
                    <p className="text-muted-foreground text-xl lg:text-base mb-8 lg:mb-6 line-clamp-3 font-medium lg:font-normal leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Lien "Lire" : Agrandis */}
                    <span className="inline-flex items-center gap-3 text-xl lg:text-sm text-primary font-bold lg:font-medium group-hover:gap-4 transition-all">
                      Lire l'article <ArrowRight className="w-6 h-6 lg:w-4 lg:h-4" />
                    </span>
                  </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bouton "Voir tous les articles" : GÉANT sur mobile */}
        <div ref={buttonRef} className="text-center w-full">
            <Link 
                to="/blog" 
                // Mobile: w-full + px-10 py-6 + text-2xl
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 lg:gap-2 px-10 py-6 lg:px-8 lg:py-4 border-2 lg:border border-foreground/20 text-foreground font-bold lg:font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group rounded-xl lg:rounded-none text-2xl lg:text-base"
            >
                Voir tous les articles
                <ArrowRight className="w-6 h-6 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </section>
  );
};