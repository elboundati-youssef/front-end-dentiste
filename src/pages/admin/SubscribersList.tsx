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
  Copy,
  Send, // Nouvelle icône
  CheckCircle // Nouvelle icône
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
  
  // États pour la liste
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- NOUVEAUX ÉTATS POUR L'ENVOI ---
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");

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

  // --- FONCTION D'ENVOI DE NEWSLETTER ---
  const handleSendNewsletter = async () => {
    if (!messageContent.trim()) {
      alert("Veuillez écrire un message avant d'envoyer.");
      return;
    }

    if (!window.confirm(`Confirmer l'envoi de ce message à ${subscribers.length} abonnés ?`)) {
        return;
    }

    setIsSending(true);
    setSendStatus("idle");

    try {
      // Assurez-vous d'avoir créé la route POST /newsletter/send dans Laravel
      await api.post("/newsletter/send", { content: messageContent });
      setSendStatus("success");
      setMessageContent(""); // Vider le champ
      setTimeout(() => setSendStatus("idle"), 5000); // Reset message succès
    } catch (err) {
      console.error(err);
      setSendStatus("error");
      alert("Erreur lors de l'envoi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (id: number) => {
    if(!window.confirm("Voulez-vous supprimer cet email de la liste ?")) return;
    try {
      await api.delete(`/newsletter/${id}`);
      setSubscribers(subscribers.filter(s => s.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

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
          Newsletter et Abonnés
        </h1>
        <p className="text-slate-400 text-2xl lg:text-base font-light">
          Envoyez des nouvelles et gérez vos inscrits.
        </p>
      </div>

      {/* --- NOUVELLE SECTION : ÉCRIRE UN MESSAGE --- */}
      <div className="bg-[#04192a] p-8 lg:p-6 rounded-[2.5rem] lg:rounded-2xl border border-slate-800/60 shadow-xl relative overflow-hidden">
        
        {/* Titre de section */}
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Send className="w-6 h-6" />
            </div>
            <h2 className="text-3xl lg:text-xl font-bold text-white">Envoyer une Newsletter</h2>
        </div>

        {/* Zone de texte */}
        <div className="relative mb-6">
            <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Écrivez votre message ici..."
                className="w-full h-64 lg:h-40 bg-slate-900/50 border border-slate-700 rounded-2xl p-6 lg:p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none text-xl lg:text-base leading-relaxed"
            />
        </div>

        {/* Actions & Feedback */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Indicateur de statut */}
            <div className="flex-1">
                {sendStatus === "success" && (
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg animate-in fade-in slide-in-from-left">
                        <CheckCircle className="w-5 h-5" />
                        <span>Newsletter envoyée avec succès ! (Traitement en arrière-plan)</span>
                    </div>
                )}
                {sendStatus === "error" && (
                     <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>Erreur lors de l'envoi. Vérifiez la console.</span>
                    </div>
                )}
            </div>

            {/* Bouton d'envoi */}
            <button
                onClick={handleSendNewsletter}
                disabled={isSending || subscribers.length === 0}
                className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-primary to-amber-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
                {isSending ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Envoi en cours...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-6 h-6" />
                        <span>Envoyer à {subscribers.length} abonnés</span>
                    </>
                )}
            </button>
        </div>
      </div>

      {/* --- SECTION LISTE (Code existant avec recherche) --- */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white pl-2 border-l-4 border-primary">Liste des Inscrits</h3>
        
        {/* Barre de recherche */}
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
                    setCurrentPage(1);
                }}
                />
            </div>
        </div>

        {/* Tableau */}
        <div className="bg-[#04192a] rounded-[3rem] lg:rounded-3xl border border-slate-800/60 overflow-hidden shadow-2xl p-4 lg:p-0">
            {loading ? (
            <div className="p-40 lg:p-20 flex flex-col items-center justify-center text-slate-500">
                <Loader2 className="w-24 h-24 lg:w-10 lg:h-10 animate-spin mb-6 lg:mb-4 text-primary" />
                <p className="text-3xl lg:text-base">Chargement...</p>
            </div>
            ) : filteredSubscribers.length === 0 ? (
            <div className="p-40 lg:p-20 text-center text-slate-500">
                <Mail className="w-24 h-24 lg:w-12 lg:h-12 mx-auto mb-6 text-slate-700" />
                <p className="text-3xl lg:text-lg">Aucun abonné trouvé.</p>
            </div>
            ) : (
            <>
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
                                <button onClick={() => copyToClipboard(sub.email)} className="p-3 lg:p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors">
                                    <Copy className="w-6 h-6 lg:w-5 lg:h-5" />
                                </button>
                                <button onClick={() => handleDelete(sub.id)} className="p-3 lg:p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                                    <Trash2 className="w-6 h-6 lg:w-5 lg:h-5" />
                                </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                {/* Pagination (inchangée) */}
                {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 py-8 lg:py-6 border-t border-slate-800/50">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-4 lg:p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-6 h-6 lg:w-5 lg:h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i + 1} onClick={() => paginate(i + 1)} className={`w-10 h-10 lg:w-8 lg:h-8 rounded-lg font-bold ${currentPage === i + 1 ? "bg-primary text-primary-foreground" : "bg-slate-800 text-slate-400"}`}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-4 lg:p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRight className="w-6 h-6 lg:w-5 lg:h-5" />
                    </button>
                </div>
                )}
            </>
            )}
        </div>
      </div>
    </div>
  );
};

export default SubscribersList;