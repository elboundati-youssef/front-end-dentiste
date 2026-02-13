import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // <--- 1. Import SEO
import { blogData } from "@/data/blogData";
import api from "@/api/axios";
import { ArrowRight, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import defaultBlogImage from "@/assets/images/compressed/DSC09094-CT.jpg";

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
  const [dbPosts, setDbPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');

        const formattedPosts = response.data.map((post: ApiPost) => ({
          id: post.id,
          title: post.title,
          category: post.category,
          date: new Date(post.created_at).toLocaleDateString('fr-FR'),
          image: post.image || defaultBlogImage, // Image par défaut si aucune n'est fournie
          excerpt: post.content.replace(/<[^>]+>/g, '').substring(0, 100) + "...",
          isDatabase: true
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

  const allPosts = [...dbPosts, ...blogData];
  const currentUrl = window.location.href; // Pour le lien canonique

  return (
    <>
      {/* --- 2. INTÉGRATION SEO --- */}
      <Helmet>
        <title>Nos Conseils & Actualités Dentaires | Dr. Khanboubi Tanger</title>
        <meta
          name="description"
          content="Retrouvez tous les articles, conseils et actualités du cabinet dentaire Dr. Khanboubi à Tanger. Prévention, esthétique, implants et soins pour toute la famille."
        />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph (Facebook/LinkedIn) */}
        <meta property="og:type" content="blog" />
        <meta property="og:title" content="Le Blog Dentaire - Dr. Khanboubi Tanger" />
        <meta property="og:description" content="Conseils d'experts pour votre santé bucco-dentaire. Découvrez nos derniers articles." />
        <meta property="og:image" content={defaultBlogImage} /> {/* Image générique du blog */}
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Cabinet Dentaire Al Boughaz" />

        {/* Données Structurées (Schema.org pour une page de collection) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "headline": "Nos Conseils & Actualités Dentaires",
            "description": "Retrouvez tous les articles et conseils du cabinet Dr. Khanboubi à Tanger.",
            "url": currentUrl,
            "provider": {
              "@type": "Dentist",
              "name": "Dr. Amine Khanboubi",
              "image": "/Dentist_logo-03.svg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Avenue Moulay Youssef",
                "addressLocality": "Tanger",
                "addressCountry": "MA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "35.7767", // À ajuster selon votre position exacte
                "longitude": "-5.8126"
              }
            }
          })}
        </script>
      </Helmet>

      <Header />
      <main className="pt-24 pb-16 bg-secondary/5 min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="pt-12 mb-12">
            <Link to="/#blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-10 lg:mb-8 transition-colors text-2xl lg:text-base gap-3 lg:gap-2 font-medium group">
              <ArrowLeft className="w-8 h-8 lg:w-4 lg:h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>

            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mt-4">
              Tous nos Conseils et Articles
            </h1>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl">
              Explorez notre bibliothèque de ressources pour mieux comprendre votre santé dentaire et découvrir nos traitements.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          )}

          {/* Grille de TOUS les articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post, index) => (
              <article key={`${post.id}-${index}`} className="bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <Link to={`/blog/${post.id}`} className="block h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded shadow-md">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4 text-primary" />
                      <time>{post.date}</time>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 line-clamp-3 flex-1 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-border">
                      <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                        Lire l'article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
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