import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BlogPost, blogService } from '@/services/blog';


gsap.registerPlugin(ScrollTrigger);

export const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Charger les articles
    const loadPosts = async () => {
      const data = await blogService.getLatest();
      // On prend seulement les 3 derniers pour l'accueil
      setPosts(data.slice(0, 3));
    };
    loadPosts();
  }, []);

  useEffect(() => {
    // Animation GSAP (identique à tes autres sections)
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
  }, [posts]); // Relancer l'anim quand les posts sont chargés

  return (
    <section ref={sectionRef} id="blog" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* En-tête de section */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
              Notre Actualité
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Derniers Conseils & <span className="text-primary">Articles</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Restez informé des dernières avancées dentaires et découvrez nos conseils pour garder un sourire éclatant.
          </p>
        </div>

        {/* Grille des Articles */}
        <div ref={postsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="blog-card group bg-background border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                
                <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <a href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                  Lire l'article <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};