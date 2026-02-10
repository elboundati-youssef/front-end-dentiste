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
                <h1 className="font-serif text-6xl md:text-6xl lg:text-6xl mb-6 lg:mb-4">
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
            <a href="/#blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-10 lg:mb-8 transition-colors text-2xl lg:text-base gap-3 lg:gap-2"
           >
                <ArrowLeft className="w-8 h-8 lg:w-4 lg:h-4" />
                Retour aux articles
            </a>

            {/* Injection du contenu HTML - TAILLE AUGMENTÉE ICI */}
            <div 
                className="text-3xl lg:text-lg text-muted-foreground leading-relaxed mb-8 lg:mb-6"
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />
            
            {/* Signature / CTA */}
    <div className="bg-card p-10 lg:p-8 rounded-lg border border-border lg:sticky lg:top-32">
                <h3 className="font-serif text-4xl lg:text-2xl mb-6 lg:mb-4">Besoin d'un avis personnalisé ?</h3>
                <p className="text-muted-foreground mb-8 lg:mb-6 text-2xl lg:text-base leading-relaxed">
                    Prenez rendez-vous au cabinet pour discuter de votre situation spécifique.
                </p>
                <a href="/#contact" className="w-full flex items-center justify-center gap-4 lg:gap-2 bg-primary text-primary-foreground py-7 lg:py-4 rounded font-medium hover:bg-foreground transition-all text-3xl lg:text-base">
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