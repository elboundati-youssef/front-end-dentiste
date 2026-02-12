import axios, { InternalAxiosRequestConfig } from 'axios';

/**
 * Configuration de l'instance Axios pour l'API Laravel.
 * Note: Le Content-Type n'est pas défini ici pour permettre à Axios 
 * de le gérer automatiquement, notamment pour l'envoi d'images.
 */
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 5000, // Si pas de réponse après 5 secondes, erreur.
    headers: {
        'Accept': 'application/json'
    }
});

// Intercepteur pour injecter le token d'authentification Bearer
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;