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
        <div ref={postsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"> {/* Ajout de mb-16 pour l'espace */}
          {posts.map((post) => (
            <article key={post.id} className="blog-card group bg-background border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              <Link to={`/blog/${post.id}`} className="block h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={`${post.title} - Dr Khanboubi Tanger`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <time>{post.date}</time>
                    </div>
                    
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Lire l'article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bouton Voir Plus (NOUVEAU) */}
        <div ref={buttonRef} className="text-center">
            <Link 
                to="/blog" // Ce lien pointera vers une nouvelle page listant tous les articles
                className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 text-foreground font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group"
            >
                Voir tous les articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </section>
  );
};