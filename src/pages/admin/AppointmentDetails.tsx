import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  AlertCircle,
  MessageSquare,
  Sparkles
} from "lucide-react";

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

const AppointmentDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Récupérer les détails
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/appointments/${id}`);
        setAppointment(response.data);
      } catch (err) {
        setError("Rendez-vous introuvable.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // Actions
  const updateStatus = async (newStatus: string) => {
    try {
      await api.put(`/appointments/${id}/status`, { status: newStatus });
      setAppointment(prev => prev ? { ...prev, status: newStatus as any } : null);
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const deleteAppointment = async () => {
    if (!window.confirm("Supprimer définitivement ce rendez-vous ?")) return;
    try {
      await api.delete(`/appointments/${id}`);
      navigate('/admin/rendez-vous'); // Retour à la liste
    } catch (err) {
      alert("Erreur suppression");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  if (error || !appointment) return <div className="p-10 text-center text-red-400">{error}</div>;

  // Helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
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
    <div className="animate-in slide-in-from-right duration-500 pb-20">
      
      {/* HEADER DE NAVIGATION */}
      <div className="flex items-center gap-6 lg:gap-4 mb-12 lg:mb-8">
        <button 
          onClick={() => navigate('/admin/rendez-vous')}
          className="p-4 lg:p-3 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors text-white"
        >
          <ArrowLeft className="w-8 h-8 lg:w-5 lg:h-5" />
        </button>
        <div>
          <h1 className="text-4xl lg:text-3xl font-serif font-bold text-white">
            Détails Rendez-vous #{appointment.id}
          </h1>
          <p className="text-slate-400 text-lg lg:text-sm mt-1">
            Reçu le {new Date(appointment.created_at).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'})}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8">
        
        {/* COLONNE GAUCHE : INFO PRINCIPALE */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* CARTE PATIENT */}
            <div className="bg-[#04192a] p-10 lg:p-8 rounded-[2.5rem] lg:rounded-3xl border border-slate-800/60 shadow-xl">
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-8 border-b border-slate-800 pb-4">
                    Informations Patient
                </h2>
                <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                    <div className="w-24 h-24 lg:w-20 lg:h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-slate-300 border border-slate-600 shadow-inner">
                        <User className="w-10 h-10 lg:w-8 lg:h-8" />
                    </div>
                    <div className="space-y-4 lg:space-y-2 flex-1">
                        <h3 className="text-4xl lg:text-2xl font-serif font-bold text-white">
                            {appointment.full_name}
                        </h3>
                        <div className="flex flex-col lg:flex-row lg:gap-8 gap-4 text-xl lg:text-base text-slate-400">
                            <span className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary"/> {appointment.email}</span>
                            <span className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary"/> {appointment.phone}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CARTE MESSAGE */}
            <div className="bg-[#04192a] p-10 lg:p-8 rounded-[2.5rem] lg:rounded-3xl border border-slate-800/60 shadow-xl">
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-6 border-b border-slate-800 pb-4">
                    Message du patient
                </h2>
                <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50">
                    <div className="flex gap-4">
                        <MessageSquare className="w-8 h-8 text-slate-600 flex-shrink-0" />
                        <p className="text-2xl lg:text-lg text-slate-300 italic leading-relaxed">
                            "{appointment.message || "Aucun message spécifique."}"
                        </p>
                    </div>
                </div>
            </div>

        </div>

        {/* COLONNE DROITE : STATUT & ACTIONS */}
        <div className="space-y-8">
            
            {/* CARTE RDV */}
            <div className="bg-[#04192a] p-10 lg:p-8 rounded-[2.5rem] lg:rounded-3xl border border-slate-800/60 shadow-xl">
                <div className="mb-8">
                    <span className={`inline-block px-6 py-2 rounded-full text-lg lg:text-sm font-bold border ${getStatusColor(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                    </span>
                </div>

                <div className="space-y-8 lg:space-y-6">
                    <div>
                        <span className="text-slate-500 uppercase text-xs font-bold tracking-wider">Date souhaitée</span>
                        <div className="flex items-center gap-4 mt-2">
                            <Calendar className="w-8 h-8 text-primary" />
                            <span className="text-3xl lg:text-2xl font-bold text-white">
                                {new Date(appointment.preferred_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                            </span>
                            <span className="text-xl lg:text-lg text-slate-500 font-medium">
                                {new Date(appointment.preferred_date).getFullYear()}
                            </span>
                        </div>
                    </div>

                    <div>
                        <span className="text-slate-500 uppercase text-xs font-bold tracking-wider">Type de soin</span>
                        <div className="flex items-center gap-4 mt-2">
                            <Sparkles className="w-8 h-8 text-amber-400" />
                            <span className="text-2xl lg:text-xl font-bold text-white">
                                {appointment.service}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-[#04192a] p-8 lg:p-6 rounded-[2.5rem] lg:rounded-3xl border border-slate-800/60 shadow-xl flex flex-col gap-4">
                <button 
                    onClick={() => updateStatus('confirmed')}
                    disabled={appointment.status === 'confirmed'}
                    className="w-full py-6 lg:py-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 rounded-2xl font-bold text-xl lg:text-base transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <CheckCircle className="w-6 h-6" /> Confirmer
                </button>
                
                <button 
                    onClick={() => updateStatus('cancelled')}
                    disabled={appointment.status === 'cancelled'}
                    className="w-full py-6 lg:py-3 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-white border border-amber-500/20 rounded-2xl font-bold text-xl lg:text-base transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <XCircle className="w-6 h-6" /> Annuler
                </button>

                <div className="h-px bg-slate-800 my-2"></div>

                <button 
                    onClick={deleteAppointment}
                    className="w-full py-6 lg:py-3 bg-slate-800 hover:bg-red-500 text-slate-400 hover:text-white border border-slate-700 hover:border-red-500 rounded-2xl font-bold text-xl lg:text-base transition-all flex items-center justify-center gap-3"
                >
                    <Trash2 className="w-6 h-6" /> Supprimer
                </button>
            </div>

        </div>

      </div>
    </div>
  );
};

export default AppointmentDetails;