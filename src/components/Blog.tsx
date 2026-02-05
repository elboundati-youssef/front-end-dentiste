import { useRef, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom'; // Import pour la navigation
import { blogData } from '@/data/blogData'; // Import des données statiques

gsap.registerPlugin(ScrollTrigger);

export const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  // On prend les 3 premiers articles
  const posts = blogData.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', }
        }
      );

      gsap.fromTo('.blog-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: postsRef.current, start: 'top 75%', }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* En-tête de section */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
              Blog Dentaire Tanger
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Derniers Conseils & <span className="text-primary">Articles</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Les conseils du Dr. Amine Khanboubi pour votre santé bucco-dentaire.
          </p>
        </div>

        {/* Grille des Articles */}
        <div ref={postsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="blog-card group bg-background border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              
              {/* Le lien englobe toute la carte pour une meilleure ergonomie */}
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

      </div>
    </section>
  );
};