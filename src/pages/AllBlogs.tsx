import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogData } from "@/data/blogData";
import { ArrowRight, Calendar, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";


const AllBlogs = () => {
  // Scroll en haut au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-secondary/5 min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
         <br />
         <br />
         <br />
         <br />
         <br />
            {/* Titre et retour */}
            <div className="mb-12">
                <a href="./#blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                </a>
                <br />
                <br />
                <br />
                <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
                    Tous nos Conseils & Articles
                </h1>
            </div>

            {/* Grille de TOUS les articles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogData.map((post) => (
                    <article key={post.id} className="bg-background border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group">
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
                                <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
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