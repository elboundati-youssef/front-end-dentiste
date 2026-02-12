import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogData } from "@/data/blogData"; // Vos données statiques
import api from "@/api/axios"; // Votre configuration API
import { ArrowRight, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Interface pour les données de l'API
interface ApiPost {
  id: number;
  title: string;
  category: string;
  created_at: string;
  image?: string;
  content: string;
}

const AllBlogs = () => {
  // État pour stocker les articles de la base de données
  const [dbPosts, setDbPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Scroll en haut
    window.scrollTo(0, 0);

    // 2. Récupérer les articles depuis le Backend
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs'); // Assurez-vous que cette route existe en public ou admin
        
        // On formate les données de l'API pour qu'elles ressemblent aux données statiques
        const formattedPosts = response.data.map((post: ApiPost) => ({
          id: post.id, // Garde l'ID numérique
          title: post.title,
          category: post.category,
          date: new Date(post.created_at).toLocaleDateString('fr-FR'), // Formater la date
          // Image par défaut si pas d'image dans la DB
          image: post.image || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80", 
          // Créer un extrait à partir du contenu HTML (on enlève les balises)
          excerpt: post.content.replace(/<[^>]+>/g, '').substring(0, 100) + "...",
          isDatabase: true // Petit marqueur pour savoir d'où ça vient (optionnel)
        }));

        setDbPosts(formattedPosts);
      } catch (error) {
        console.error("Erreur chargement blog", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 3. Fusionner : Articles DB en premier + Articles Statiques ensuite
  const allPosts = [...dbPosts, ...blogData];

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-secondary/5 min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">

          <br /><br /><br /><br />

          {/* Titre et retour */}
          <div className="mb-12">
            <a href="/#blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-10 lg:mb-8 transition-colors text-2xl lg:text-base gap-3 lg:gap-2">
              <ArrowLeft className="w-8 h-8 lg:w-4 lg:h-4" />
              Retour à l'accueil
            </a>
            
            <br /><br />
            
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
              Tous nos Conseils et Articles
            </h1>
          </div>

          {/* Loader si chargement en cours */}
          {loading && (
            <div className="flex justify-center py-20">
               <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          )}

          {/* Grille de TOUS les articles (DB + Static) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post, index) => (
              <article key={`${post.id}-${index}`} className="bg-background border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group">
                {/* IMPORTANT : 
                    Si c'est un article DB (id numérique), lien vers /blog/db/:id (à créer)
                    Si c'est un article statique (id string), lien vers /blog/:id 
                    Pour l'instant on utilise le lien standard, assurez-vous que BlogPost gère les deux types d'ID.
                */}
                <Link to={`/blog/${post.id}`} className="block h-full">
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
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <time>{post.date}</time>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Lire la suite <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllBlogs;