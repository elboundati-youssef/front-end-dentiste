import api, { STORAGE_URL } from './api';

// 1. On définit à quoi ressemble un article pour React
export interface BlogPost {
    id: number;
    title: string;
    category: string;
    image: string;
    excerpt: string;
    content?: string; // Le contenu complet (optionnel pour la liste)
    date: string;
}

// 2. Le service qui gère les appels
export const blogService = {

    // A. Récupérer TOUS les articles
    getAll: async (): Promise<BlogPost[]> => {
        try {
            const response = await api.get('/blogs');
            const data = response.data; // Les données brutes de Laravel

            // On transforme les données pour qu'elles soient jolies dans React
            return data.map((item: any) => ({
                id: item.id,
                title: item.title,
                category: item.category,
                // Si l'image commence par http, on la garde, sinon on ajoute l'URL du storage
                image: item.image 
                    ? (item.image.startsWith('http') ? item.image : `${STORAGE_URL}${item.image}`) 
                    : "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80", // Image par défaut
                // On coupe le texte s'il est trop long pour l'extrait
                excerpt: item.content ? item.content.substring(0, 100) + "..." : "",
                // On formate la date (ex: 15 février 2026)
                date: new Date(item.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                })
            }));
        } catch (error) {
            console.error("Erreur API Blog:", error);
            return []; // Renvoie une liste vide si erreur
        }
    },

    // B. Récupérer les 3 DERNIERS (pour l'Accueil)
    getLatest: async (): Promise<BlogPost[]> => {
        const allPosts = await blogService.getAll();
        return allPosts.slice(0, 3); // On garde juste les 3 premiers
    },

    // C. Récupérer UN article par son ID (pour la page de lecture)
    getById: async (id: string | number): Promise<BlogPost | null> => {
        try {
            const response = await api.get(`/blogs/${id}`);
            const item = response.data;

            return {
                id: item.id,
                title: item.title,
                category: item.category,
                image: item.image 
                    ? (item.image.startsWith('http') ? item.image : `${STORAGE_URL}${item.image}`) 
                    : "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
                excerpt: item.content ? item.content.substring(0, 100) + "..." : "",
                content: item.content, // Ici on a tout le texte
                date: new Date(item.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                })
            };
        } catch (error) {
            console.error("Article introuvable:", error);
            return null;
        }
    }
};