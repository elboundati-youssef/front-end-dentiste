import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogData } from "@/data/blogData";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogData.find((p) => p.id === id);

  // Scroll en haut de page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return <div className="text-center py-20">Article introuvable</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero de l'article */}
        <div className="relative h-[400px] w-full overflow-hidden">
             <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/60" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <span className="bg-primary px-3 py-1 text-sm font-medium uppercase tracking-wider mb-4 rounded">
                    {post.category}
                </span>
                <h1 className="font-serif text-3xl md:text-5xl max-w-4xl leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 mt-6 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Par Dr. Amine Khanboubi
                    </div>
                </div>
             </div>
        </div>

        {/* Contenu de l'article */}
        <article className="container mx-auto px-6 lg:px-12 py-12 max-w-4xl">
            <Link to="/#blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux articles
            </Link>

            {/* Injection du contenu HTML - TAILLE AUGMENTÉE ICI */}
            <div 
                className="prose prose-xl md:prose-2xl prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:text-lg md:prose-p:text-xl prose-li:text-muted-foreground prose-li:text-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />
            
            {/* Signature / CTA */}
            <div className="mt-16 p-8 bg-secondary/10 rounded-lg border border-border">
                <h3 className="font-serif text-2xl mb-4">Besoin d'un avis personnalisé ?</h3>
                <p className="text-muted-foreground mb-6 text-lg">
                    Prenez rendez-vous au cabinet pour discuter de votre situation spécifique.
                </p>
                <a href="..#contact" className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-foreground transition-colors">
                    Prendre Rendez-vous
                </a>
            </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;