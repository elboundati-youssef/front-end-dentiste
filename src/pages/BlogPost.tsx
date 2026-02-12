import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogData } from "@/data/blogData";
import api from "@/api/axios"; // N'oubliez pas d'importer l'API
import { ArrowLeft, Calendar, User, Clock, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BlogPost = () => {
  const { id } = useParams();
  
  // États pour gérer l'article (qu'il vienne du fichier ou de l'API)
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(false);

      if (!id) return;

      // 1. D'abord chercher dans les données STATIQUES (fichier)
      // IMPORTANT : On convertit en String pour éviter les erreurs (1 !== "1")
      const staticPost = blogData.find((p) => String(p.id) === String(id));

      if (staticPost) {
        setPost(staticPost);
        setLoading(false);
        return;
      }

      // 2. Si pas trouvé, chercher dans l'API (Base de données)
      try {
        const response = await api.get(`/blogs/${id}`);
        const apiData = response.data;

        // On formate les données de la DB pour l'affichage
        setPost({
          id: apiData.id,
          title: apiData.title,
          category: apiData.category,
          date: new Date(apiData.created_at).toLocaleDateString('fr-FR'),
          image: apiData.image || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
          content: apiData.content,
          author: "Dr. Amine Khanboubi",
          readTime: "3 min"
        });
      } catch (err) {
        console.error("Erreur chargement article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-20 h-20 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article introuvable</h1>
          <Link to="/#blog" className="text-primary hover:underline text-2xl">
            Retourner au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="pb-20 lg:pb-16 bg-background">
        
        {/* --- HERO DE L'ARTICLE --- */}
        <div className="relative h-[600px] lg:h-[500px] w-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <span className="bg-primary px-4 py-2 lg:px-3 lg:py-1 text-xl lg:text-sm font-bold uppercase tracking-wider mb-6 lg:mb-4 rounded shadow-lg">
              {post.category}
            </span>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-6xl font-bold mb-8 lg:mb-6 leading-tight max-w-5xl">
              {post.title}
            </h1>

            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mt-2 text-xl lg:text-base text-white/90 font-medium">
              <div className="flex items-center gap-3 lg:gap-2">
                <Calendar className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
                {post.date}
              </div>
              <div className="hidden lg:block w-1.5 h-1.5 bg-primary rounded-full" />
              <div className="flex items-center gap-3 lg:gap-2">
                <User className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
                {post.author}
              </div>
              
            </div>
          </div>
        </div>

        {/* --- CONTENU DE L'ARTICLE --- */}
        <article className="container mx-auto px-6 lg:px-12 py-16 lg:py-12 max-w-4xl">
          
          <Link to="/#blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-12 lg:mb-8 transition-colors text-2xl lg:text-base gap-3 lg:gap-2 font-medium group">
            <ArrowLeft className="w-8 h-8 lg:w-4 lg:h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux articles
          </Link>

          {/* Corps du texte (HTML injecté) */}
          {/* ICI : Design "Massive Mobile" mais NEUTRE (pas de couleurs forcées, pas de bg) */}
          <div 
            className="
              /* COULEUR DE BASE : Celle du site (gris clair ou foncé selon le thème) */
              text-muted-foreground
              
              /* TITRES H3 : Très grands sur mobile, couleur normale */
              [&>h3]:text-4xl lg:[&>h3]:text-2xl 
              [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-foreground
              [&>h3]:mt-12 [&>h3]:mb-6

              /* PARAGRAPHES P : Très grands sur mobile */
              [&>p]:text-3xl lg:[&>p]:text-lg 
              [&>p]:leading-relaxed 
              [&>p]:mb-8

              /* LISTES (UL) : Puces simples */
              [&>ul]:list-disc [&>ul]:pl-6 lg:[&>ul]:pl-5
              [&>ul]:mb-8 [&>ul]:space-y-4

              /* ÉLÉMENTS DE LISTE (LI) */
              [&>ul>li]:text-3xl lg:[&>ul>li]:text-lg
              [&>ul>li]:leading-relaxed
              [&>ul>li]:marker:text-primary /* Juste la puce en couleur */

              /* GRAS (STRONG) */
              [&>p>strong]:text-foreground [&>p>strong]:font-semibold
            "
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          
          {/* Tags */}
          {post.tags && (
            <div className="mt-16 lg:mt-10 pt-10 border-t border-border flex flex-wrap gap-3">
              {post.tags.map((tag: string) => (
                <span key={tag} className="bg-secondary/50 text-secondary-foreground px-4 py-2 text-xl lg:text-sm rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Encart Contact */}
          <div className="mt-16 lg:mt-12 bg-card p-10 lg:p-10 rounded-2xl border border-primary/20 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-8 text-center lg:text-left">
              <div className="w-24 h-24 lg:w-20 lg:h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30 flex-shrink-0">
                <User className="w-12 h-12 lg:w-10 lg:h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-4xl lg:text-2xl font-bold text-foreground mb-4 lg:mb-2">
                  Besoin d'un avis personnalisé ?
                </h3>
                <p className="text-muted-foreground text-2xl lg:text-base leading-relaxed mb-8 lg:mb-0">
                  Le Dr. Khanboubi vous reçoit sur l'Avenue Moulay Youssef.
                </p>
              </div>
              <a 
                href="/#contact" 
                className="w-full lg:w-auto bg-gradient-gold text-primary-foreground px-10 py-6 lg:px-8 lg:py-3 rounded-xl font-bold text-2xl lg:text-base hover:shadow-glow transition-all transform hover:-translate-y-1 text-center"
              >
                Prendre Rendez-vous
              </a>
            </div>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;