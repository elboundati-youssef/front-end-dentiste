import axios from 'axios';

// 1. L'adresse de ton API Laravel
export const API_BASE_URL = 'http://127.0.0.1:8000/api';

// 2. L'adresse pour afficher les images (dossier public/storage)
export const STORAGE_URL = 'http://127.0.0.1:8000/storage/';

// Configuration d'Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;