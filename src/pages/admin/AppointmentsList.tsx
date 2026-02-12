import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Trash2,
  Phone,
  Mail,
  User,
  Clock,
  MessageSquare,
  Loader2,
  AlertCircle
} from "lucide-react";

// 1. Définition du type Appointment (correspond au backend Laravel)
interface Appointment {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  service: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

const AppointmentsList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 2. Chargement des rendez-vous
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les rendez-vous.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 3. Action : Changer le statut (Confirmer / Annuler)
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      // Optimistic UI update (mise à jour immédiate avant réponse serveur)
      setAppointments(prev => prev.map(app => 
        app.id === id ? { ...app, status: newStatus as any } : app
      ));

      await api.put(`/appointments/${id}/status`, { status: newStatus });
    } catch (err) {
      console.error("Erreur mise à jour statut", err);
      alert("Erreur lors de la mise à jour.");
      fetchAppointments(); // Recharger en cas d'erreur
    }
  };

  // 4. Action : Supprimer
  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) return;

    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  // Fonction utilitaire pour la couleur des badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20'; // pending
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'cancelled': return 'Annulé';
      case 'completed': return 'Terminé';
      default: return 'En attente';
    }
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-12 lg:space-y-8 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl lg:text-4xl font-serif font-bold text-white">
          Rendez-vous
        </h1>
        <p className="text-slate-400 text-2xl lg:text-base font-light">
          Gérez les demandes de consultation.
        </p>
      </div>

      {/* --- CONTENU --- */}
      <div className="bg-[#04192a] rounded-[3rem] lg:rounded-3xl border border-slate-800/60 overflow-hidden shadow-2xl p-4 lg:p-0">
        
        {loading ? (
          <div className="p-40 lg:p-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-24 h-24 lg:w-10 lg:h-10 animate-spin mb-6 lg:mb-4 text-primary" />
            <p className="text-3xl lg:text-base">Chargement...</p>
          </div>
        ) : error ? (
          <div className="p-20 lg:p-10 text-center text-red-400 flex flex-col items-center gap-4 lg:gap-2">
            <AlertCircle className="w-16 h-16 lg:w-8 lg:h-8" />
            <p className="text-2xl lg:text-base">{error}</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-40 lg:p-20 text-center text-slate-500">
            <Calendar className="w-24 h-24 lg:w-12 lg:h-12 mx-auto mb-6 text-slate-700" />
            <p className="text-3xl lg:text-lg">Aucun rendez-vous pour le moment.</p>
          </div>
        ) : (
          <>
            {/* === VERSION MOBILE (CARTES GÉANTES) === */}
            <div className="lg:hidden space-y-8 p-4">
              {appointments.map((app) => (
                <div key={app.id} className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-700/50 flex flex-col gap-6">
                  
                  {/* En-tête Carte */}
                  <div className="flex justify-between items-start">
                    <span className={`px-5 py-2 rounded-full text-lg font-bold border ${getStatusColor(app.status)}`}>
                      {getStatusLabel(app.status)}
                    </span>
                    <span className="text-slate-500 text-lg">#{app.id}</span>
                  </div>

                  {/* Info Client */}
                  <div>
                    <h3 className="text-white font-bold text-3xl mb-2 flex items-center gap-3">
                        <User className="w-6 h-6 text-primary" />
                        {app.full_name}
                    </h3>
                    <div className="space-y-2 text-slate-400 text-xl">
                        <p className="flex items-center gap-3"><Phone className="w-5 h-5" /> {app.phone}</p>
                        <p className="flex items-center gap-3"><Mail className="w-5 h-5" /> {app.email}</p>
                    </div>
                  </div>

                  {/* Info RDV */}
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <p className="text-primary text-xl font-bold uppercase tracking-wider mb-2">{app.service}</p>
                    <p className="text-white text-2xl flex items-center gap-3">
                        <Calendar className="w-6 h-6" />
                        {new Date(app.preferred_date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {app.message && (
                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <p className="text-slate-400 italic text-lg flex gap-2">
                                <MessageSquare className="w-5 h-5 flex-shrink-0 mt-1" />
                                "{app.message}"
                            </p>
                        </div>
                    )}
                  </div>

                  {/* Actions (Boutons géants) */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {/* Confirmer */}
                    <button 
                        onClick={() => handleStatusChange(app.id, 'confirmed')}
                        disabled={app.status === 'confirmed'}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${app.status === 'confirmed' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-emerald-500 hover:text-emerald-500'}`}
                    >
                        <CheckCircle className="w-8 h-8" />
                        <span className="text-xs font-bold uppercase">Valider</span>
                    </button>

                    {/* Annuler */}
                    <button 
                        onClick={() => handleStatusChange(app.id, 'cancelled')}
                        disabled={app.status === 'cancelled'}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${app.status === 'cancelled' ? 'border-red-500/50 bg-red-500/10 text-red-500' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-red-500 hover:text-red-500'}`}
                    >
                        <XCircle className="w-8 h-8" />
                        <span className="text-xs font-bold uppercase">Annuler</span>
                    </button>

                    {/* Supprimer */}
                    <button 
                        onClick={() => handleDelete(app.id)}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-slate-700 bg-slate-800 text-slate-400 hover:border-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                        <Trash2 className="w-8 h-8" />
                        <span className="text-xs font-bold uppercase">Supprimer</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* === VERSION DESKTOP (TABLEAU) === */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-bold uppercase text-slate-500 tracking-wider">
                    <th className="p-6">Patient</th>
                    <th className="p-6">Service & Date</th>
                    <th className="p-6">Message</th>
                    <th className="p-6">Statut</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {appointments.map((app) => (
                    <tr key={app.id} className="group hover:bg-slate-800/30 transition-colors">
                      
                      {/* Patient */}
                      <td className="p-6">
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-base">{app.full_name}</span>
                            <span className="text-slate-500 text-sm flex items-center gap-1"><Mail className="w-3 h-3"/> {app.email}</span>
                            <span className="text-slate-500 text-sm flex items-center gap-1"><Phone className="w-3 h-3"/> {app.phone}</span>
                        </div>
                      </td>

                      {/* Service & Date */}
                      <td className="p-6">
                        <div className="flex flex-col">
                            <span className="text-primary font-bold">{app.service}</span>
                            <span className="text-slate-400 text-sm flex items-center gap-1">
                                <Calendar className="w-3 h-3"/> 
                                {new Date(app.preferred_date).toLocaleDateString('fr-FR')}
                            </span>
                        </div>
                      </td>

                      {/* Message */}
                      <td className="p-6 max-w-xs">
                        <p className="text-slate-400 text-sm italic truncate" title={app.message}>
                            {app.message || "-"}
                        </p>
                      </td>

                      {/* Statut */}
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleStatusChange(app.id, 'confirmed')}
                            title="Confirmer"
                            className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(app.id, 'cancelled')}
                            title="Annuler"
                            className="p-2 rounded-lg text-amber-500 hover:bg-amber-500/10 transition-colors"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(app.id)}
                            title="Supprimer"
                            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;