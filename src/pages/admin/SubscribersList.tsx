import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Mail,
  Trash2,
  Search,
  Calendar,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Copy
} from "lucide-react";

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

const SubscribersList: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // États pour recherche et pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // On en affiche un peu plus car c'est juste du texte

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/newsletter");
      setSubscribers(response.data);
    } catch (err) {
      setError("Impossible de charger les abonnés.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Fonction de suppression (Optionnel : nécessite une route DELETE côté Laravel)
  const handleDelete = async (id: number) => {
    if(!window.confirm("Voulez-vous supprimer cet email de la liste ?")) return;
    
    try {
      await api.delete(`/newsletter/${id}`);
      setSubscribers(subscribers.filter(s => s.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  // Copier l'email dans le presse-papier
  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    alert("Email copié !");
  };

  // --- FILTRAGE & PAGINATION ---
  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubscribers = filteredSubscribers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="animate-in fade-in duration-700 space-y-12 lg:space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl lg:text-4xl font-serif font-bold text-white">
          Abonnés Newsletter
        </h1>
        <p className="text-slate-400 text-2xl lg:text-base font-light">
          Gérez la liste des personnes inscrites à vos actualités.
        </p>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="bg-[#04192a] p-6 lg:p-4 rounded-[2rem] lg:rounded-2xl border border-slate-800/60 shadow-lg">
        <div className="flex items-center gap-4 lg:gap-3 bg-slate-900/50 p-4 lg:p-2 rounded-xl border border-slate-800">
            <Search className="text-slate-500 w-8 h-8 lg:w-5 lg:h-5" />
            <input
              type="text"
              placeholder="Rechercher un email..."
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-600 text-2xl lg:text-base"
              value={searchTerm}
              onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page quand on cherche
              }}
            />
        </div>
      </div>

      {/* TABLEAU */}
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
        ) : filteredSubscribers.length === 0 ? (
          <div className="p-40 lg:p-20 text-center text-slate-500">
            <Mail className="w-24 h-24 lg:w-12 lg:h-12 mx-auto mb-6 text-slate-700" />
            <p className="text-3xl lg:text-lg">Aucun abonné trouvé.</p>
          </div>
        ) : (
          <>
            {/* VERSION DESKTOP */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-bold uppercase text-slate-500 tracking-wider">
                    <th className="p-6">Email</th>
                    <th className="p-6">Date d'inscription</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentSubscribers.map((sub) => (
                    <tr key={sub.id} className="group hover:bg-slate-800/30 transition-colors">
                      <td className="p-6 font-bold text-white text-lg lg:text-base">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary">
                                <Mail className="w-5 h-5" />
                            </div>
                            {sub.email}
                        </div>
                      </td>
                      
                      <td className="p-6 text-slate-400 text-sm">
                         <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-600"/> 
                            {new Date(sub.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                         </span>
                      </td>

                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <button 
                                onClick={() => copyToClipboard(sub.email)}
                                title="Copier l'email"
                                className="p-3 lg:p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                            >
                                <Copy className="w-6 h-6 lg:w-5 lg:h-5" />
                            </button>
                            <button 
                                onClick={() => handleDelete(sub.id)}
                                title="Supprimer"
                                className="p-3 lg:p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                            >
                                <Trash2 className="w-6 h-6 lg:w-5 lg:h-5" />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
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

export default SubscribersList;