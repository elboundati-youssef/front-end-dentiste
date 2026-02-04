import api from './api';

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
}

// Données de test pour voir le design tout de suite
const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Comment garder des dents blanches ?",
    category: "Esthétique",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    excerpt: "Découvrez nos conseils professionnels pour entretenir la blancheur de votre sourire au quotidien.",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "L'importance du détartrage régulier",
    category: "Prévention",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    excerpt: "Pourquoi le détartrage est essentiel non seulement pour vos dents, mais pour votre santé globale.",
    date: "2024-03-10"
  },
  {
    id: 3,
    title: "Implants dentaires : Ce qu'il faut savoir",
    category: "Chirurgie",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    excerpt: "Tout comprendre sur la pose d'implants, la durée de vie et les avantages par rapport aux prothèses.",
    date: "2024-03-05"
  }
];

export const blogService = {
  getLatest: async () => {
    try {
      // Tente d'appeler ton Laravel
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      console.warn("API non disponible, affichage des données de test.");
      return MOCK_POSTS; // Retourne les fausses données si l'API échoue
    }
  }
};