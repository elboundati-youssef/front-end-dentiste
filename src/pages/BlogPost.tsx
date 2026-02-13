import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import essentiel pour le SEO
import { blogData } from "@/data/blogData"; // Assure-toi que ce chemin est correct
import api from "@/api/axios"; 
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import defaultBlogImage from "@/assets/images/compressed/DSC09094-CT.jpg";

// Définition d'une interface pour le type Post (facultatif mais recommandé)
interface PostType {
  id: number | string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: string;
  author: string;
  excerpt?: string;
  tags?: string[];
}

const BlogPost = () => {
  const { id } = useParams();
  
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(false);

      if (!id) return;

      // 1. Chercher dans les données STATIQUES (fichier local)
      const staticPost = blogData.find((p) => String(p.id) === String(id));

      if (staticPost) {
        // On adapte le post statique au format attendu
        setPost({
            ...staticPost,
            date: staticPost.date || new Date().toLocaleDateString('fr-FR'),
            excerpt: staticPost.content.replace(/<[^>]+>/g, '').substring(0, 160) + "..."
        });
        setLoading(false);
        return;
      }

      // 2. Chercher dans l'API (Base de données)
      try {
        const response = await api.get(`/blogs/${id}`);
        const apiData = response.data;

        setPost({
          id: apiData.id,
          title: apiData.title,
          category: apiData.category,
          date: new Date(apiData.created_at).toLocaleDateString('fr-FR'),
          // Image par défaut si aucune image n'est fournie par l'API
          image: apiData.image || defaultBlogImage,
          content: apiData.content,
          author: "Dr. Amine Khanboubi",
          // Génération automatique de la meta description (SEO)
          excerpt: apiData.content.replace(/<[^>]+>/g, '').substring(0, 160) + "...",
          tags: apiData.tags || [] // Si tu as des tags dans ton API
        });
      } catch (err) {
        console.error("Erreur chargement article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    window.scrollTo(0, 0); // Remonter en haut de page au chargement
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

  // URL actuelle pour le lien canonique
  const currentUrl = window.location.href;

  return (
    <>
      {/* --- CONFIGURATION SEO (META TAGS) --- */}
      <Helmet>
        {/* Titre de l'onglet */}
        <title>{post.title} | Dr. Khanboubi - Dentiste Tanger</title>
        
        {/* Description pour Google */}
        <meta name="description" content={post.excerpt || `Lisez notre article sur ${post.title}.`} />
        <link rel="canonical" href={currentUrl} />

        {/* Facebook / Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Cabinet Dentaire Al Boughaz" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />

        {/* Données Structurées (JSON-LD) pour Google Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": [post.image],
            "datePublished": new Date().toISOString(), // Idéalement, utilise la vraie date ISO
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Cabinet Dentaire Al Boughaz",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ton-site.com/logo.png" // Remplace par ton vrai logo
              }
            },
            "description": post.excerpt
          })}
        </script>
      </Helmet>

      <Header />
      
      <main className="pb-20 lg:pb-16 bg-background">
        
        {/* --- HERO SECTION (Image & Titre) --- */}
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
                <time>{post.date}</time>
              </div>
              <div className="hidden lg:block w-1.5 h-1.5 bg-primary rounded-full" />
              <div className="flex items-center gap-3 lg:gap-2">
                <User className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
                {post.author}
              </div>
            </div>
          </div>
        </div>

        {/* --- CORPS DE L'ARTICLE --- */}
        <article className="container mx-auto px-6 lg:px-12 py-16 lg:py-12 max-w-4xl">
          
          <Link to="/#blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-12 lg:mb-8 transition-colors text-2xl lg:text-base gap-3 lg:gap-2 font-medium group">
            <ArrowLeft className="w-8 h-8 lg:w-4 lg:h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux articles
          </Link>

          {/* Injection du contenu HTML riche */}
          <div 
            className="
              text-muted-foreground
              /* Styles pour le contenu généré */
              [&>h3]:text-4xl lg:[&>h3]:text-2xl 
              [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-foreground
              [&>h3]:mt-12 [&>h3]:mb-6
              
              [&>p]:text-3xl lg:[&>p]:text-lg 
              [&>p]:leading-relaxed 
              [&>p]:mb-8
              
              [&>ul]:list-disc [&>ul]:pl-6 lg:[&>ul]:pl-5
              [&>ul]:mb-8 [&>ul]:space-y-4
              
              [&>ul>li]:text-3xl lg:[&>ul>li]:text-lg
              [&>ul>li]:leading-relaxed
              [&>ul>li]:marker:text-primary 
              
              [&>p>strong]:text-foreground [&>p>strong]:font-semibold
            "
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          
          {/* --- TAGS (Si disponibles) --- */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 lg:mt-10 pt-10 border-t border-border flex flex-wrap gap-3">
              {post.tags.map((tag: string) => (
                <span key={tag} className="bg-secondary/50 text-secondary-foreground px-4 py-2 text-xl lg:text-sm rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* --- ENCART CONTACT --- */}
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