import api from './api';

// Définition du type de données (Optionnel mais recommandé en TS)
export interface AppointmentData {
    full_name: string;
    email: string;
    phone: string;
    preferred_date: string;
    service: string;
    message: string;
    terms_accepted: boolean;
}

export const appointmentService = {
    // Fonction pour créer un rendez-vous
    create: async (data: AppointmentData) => {
        const response = await api.post('/appointments', data);
        return response.data;
    }
    
    // Tu pourras ajouter d'autres fonctions ici plus tard...
    // getAll: async () => { ... }
};