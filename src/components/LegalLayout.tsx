import React from 'react';
import { Link } from 'react-router-dom'; // Pour la navigation
import { ArrowLeft } from 'lucide-react'; // L'icône flèche

interface LegalLayoutProps {
  title: string;
  date: string;
  children: React.ReactNode;
}

export const LegalLayout = ({ title, date, children }: LegalLayoutProps) => {
  return (
    <div className="pt-32 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">

        {/* --- BOUTON RETOUR À L'ACCUEIL --- */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-10 group"
        >
          <div className="p-2 rounded-full bg-slate-800 group-hover:bg-primary/10 border border-slate-700 group-hover:border-primary/20 transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-medium text-lg">Retour à l'accueil</span>
        </Link>

        {/* Titre de la page */}
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {title}
        </h1>
        
        {/* Date de mise à jour */}
        <p className="text-muted-foreground mb-12 border-b border-border pb-8">
          Dernière mise à jour : <span className="text-primary">{date}</span>
        </p>

        {/* Contenu du texte juridique */}
        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          {children}
        </div>
        
      </div>
    </div>
  );
};