import axios from 'axios';

// On crée une instance d'Axios avec ta config Laravel
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // L'adresse de ton backend
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;