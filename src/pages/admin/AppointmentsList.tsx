import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../api/axios";
import {
  Calendar,
  Phone,
  Mail,
  User,
  Loader2,
  AlertCircle,
  ArrowRight,
  Search,       // Nouveau
  ChevronLeft,  // Nouveau
  ChevronRight, // Nouveau
  X             // Nouveau (pour effacer la date)
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

const AppointmentsList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  // --- NOUVEAUX ÉTATS POUR RECHERCHE ET PAGINATION ---
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (err) {
      setError("Impossible de charger les rendez-vous.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Reset la page à 1 si on change la recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchDate]);

  const goToDetails = (id: number) => {
    navigate(`/admin/rendez-vous/${id}`);
  };

  // --- LOGIQUE DE FILTRAGE ---
  const filteredAppointments = appointments.filter((app) => {
    const matchesName = app.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    // Comparaison de date (seulement si une date est sélectionnée)
    const matchesDate = searchDate 
        ? app.preferred_date.startsWith(searchDate) 
        : true;
    
    return matchesName && matchesDate;
  });

  // --- LOGIQUE DE PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // --- HELPERS VISUELS ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
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
      
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl lg:text-4xl font-serif font-bold text-white">
          Rendez-vous
        </h1>
        <p className="text-slate-400 text-2xl lg:text-base font-light">
          Cliquez sur un rendez-vous pour voir la fiche complète.
        </p>
      </div>

      {/* --- BARRE DE RECHERCHE (NOM + DATE) --- */}
      <div className="bg-[#04192a] p-6 lg:p-4 rounded-[2rem] lg:rounded-2xl border border-slate-800/60 flex flex-col lg:flex-row gap-4 lg:gap-3 shadow-lg">
        {/* Recherche par Nom */}
        <div className="flex items-center gap-4 lg:gap-3 flex-1 bg-slate-900/50 p-4 lg:p-2 rounded-xl border border-slate-800">
            <Search className="text-slate-500 w-8 h-8 lg:w-5 lg:h-5" />
            <input
            type="text"
            placeholder="Rechercher par nom..."
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-600 text-2xl lg:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Recherche par Date */}
        <div className="flex items-center gap-4 lg:gap-3 bg-slate-900/50 p-4 lg:p-2 rounded-xl border border-slate-800 relative">
            <Calendar className="text-slate-500 w-8 h-8 lg:w-5 lg:h-5" />
            <input
                type="date"
                className="bg-transparent border-none outline-none text-white text-2xl lg:text-base date-icon-white"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
            />
            {searchDate && (
                <button 
                    onClick={() => setSearchDate("")}
                    className="p-1 hover:bg-slate-700 rounded-full text-slate-400 transition-colors"
                >
                    <X className="w-6 h-6 lg:w-4 lg:h-4" />
                </button>
            )}
        </div>
      </div>

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
        ) : filteredAppointments.length === 0 ? (
          <div className="p-40 lg:p-20 text-center text-slate-500">
            <Calendar className="w-24 h-24 lg:w-12 lg:h-12 mx-auto mb-6 text-slate-700" />
            <p className="text-3xl lg:text-lg">Aucun rendez-vous trouvé.</p>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW */}
            <div className="lg:hidden space-y-8 p-4">
              {currentAppointments.map((app) => (
                <div 
                  key={app.id} 
                  onClick={() => goToDetails(app.id)}
                  className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-700/50 flex flex-col gap-6 active:scale-95 transition-transform cursor-pointer relative group"
                >
                  <div className="absolute top-8 right-8 text-slate-600 group-hover:text-primary transition-colors">
                    <ArrowRight className="w-8 h-8" />
                  </div>

                  <div className="flex items-start">
                    <span className={`px-5 py-2 rounded-full text-lg font-bold border ${getStatusColor(app.status)}`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-3xl mb-2 flex items-center gap-3">
                        <User className="w-6 h-6 text-primary" />
                        {app.full_name}
                    </h3>
                    <p className="text-slate-400 text-xl flex items-center gap-3">
                      <Calendar className="w-5 h-5" /> 
                      {new Date(app.preferred_date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-bold uppercase text-slate-500 tracking-wider">
                    <th className="p-6">Patient</th>
                    <th className="p-6">Email</th>
                    <th className="p-6">Téléphone</th>
                    <th className="p-6">Service & Date</th>
                    <th className="p-6">Statut</th>
                    <th className="p-6 text-right">Détails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentAppointments.map((app) => (
                    <tr 
                        key={app.id} 
                        onClick={() => goToDetails(app.id)}
                        className="group hover:bg-slate-800/30 transition-colors cursor-pointer"
                    >
                      <td className="p-6 font-bold text-white">
                        {app.full_name}
                      </td>
                      
                      <td className="p-6 text-slate-400 text-sm">
                         <span className="flex items-center gap-2">
                            <Mail className="w-3 h-3"/> {app.email}
                         </span>
                      </td>

                      <td className="p-6 text-slate-400 text-sm font-mono">
                         <span className="flex items-center gap-2">
                            <Phone className="w-3 h-3"/> {app.phone}
                         </span>
                      </td>

                      <td className="p-6">
                        <div className="flex flex-col">
                            <span className="text-primary font-bold">{app.service}</span>
                            <span className="text-slate-500 text-xs mt-1">
                                {new Date(app.preferred_date).toLocaleDateString('fr-FR')}
                            </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                      </td>
                      <td className="p-6 text-right text-slate-600 group-hover:text-primary transition-colors">
                        <ArrowRight className="w-5 h-5 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- CONTROLES DE PAGINATION --- */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 py-8 lg:py-6 border-t border-slate-800/50">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-4 lg:p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 lg:w-5 lg:h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 lg:w-8 lg:h-8 rounded-lg font-bold text-lg lg:text-sm transition-all ${
                        currentPage === i + 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-4 lg:p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-6 h-6 lg:w-5 lg:h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;