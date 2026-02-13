import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import {
  FileText,
  CalendarCheck,
  AlertCircle, // Icône pour "En attente"
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Loader2,
  Calendar,
  User,
  Clock
} from "lucide-react";

// Interfaces
interface BlogPost {
  id: number;
  title: string;
  category: string;
  created_at: string;
}

interface Appointment {
  id: number;
  full_name: string;
  service: string;
  preferred_date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

const Dashboard: React.FC = () => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : { name: "Admin" };

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Récupération parallèle pour optimiser le temps de chargement
        const [blogsRes, appointmentsRes] = await Promise.all([
            api.get("/blogs"),
            api.get("/appointments")
        ]);

        setPosts(blogsRes.data);
        setAppointments(appointmentsRes.data);

      } catch (error) {
        console.error("Erreur stats dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // --- LOGIQUE MÉTIER ---

  // 1. Calcul des RDV en attente (Status = pending)
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'pending').length;

  // 2. Calcul des Prochains RDV (Futurs uniquement, triés par date)
  const upcomingAppointments = appointments
    .filter(app => {
        // On ne garde que les dates >= aujourd'hui (00:00:00)
        const today = new Date();
        today.setHours(0,0,0,0);
        return new Date(app.preferred_date) >= today;
    }) 
    .sort((a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime()) // Tri du plus proche au plus lointain
    .slice(0, 3); // On garde les 3 premiers
// 2. Calcul des RDV Confirmés (NOUVEAU)
  const confirmedAppointmentsCount = appointments.filter(a => a.status === 'confirmed').length;
  // Statistiques
  const stats = [
    {
      title: "Articles Publiés",
      value: posts.length.toString().padStart(2, "0"),
      icon: FileText,
      color: "text-amber-400",
      bgIcon: "bg-amber-400/10",
      border: "border-amber-400/20",
      trend: "Total",
    },
   {
      // --- MODIFICATION ICI : RDV Confirmés au lieu de Total ---
      title: "RDV Confirmés",
      value: confirmedAppointmentsCount.toString().padStart(2, "0"),
      icon: CalendarCheck,
      color: "text-blue-400",
      bgIcon: "bg-blue-400/10",
      border: "border-blue-400/20",
      trend: "Validés", // Changé de "Reçus" à "Validés"
    },
    {
      // --- MODIFICATION : "En Attente" au lieu de Catégories ---
      title: "En Attente",
      value: pendingAppointmentsCount.toString().padStart(2, "0"),
      icon: AlertCircle, 
      color: "text-red-400",
      bgIcon: "bg-red-400/10",
      border: "border-red-400/20",
      trend: "À traiter",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#030712]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 space-y-12 lg:space-y-8 pb-10">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-4">
        <div>
          <h1 className="text-5xl lg:text-5xl font-serif font-bold text-white mb-2">
            Bonjour, <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">{user.name}</span>
          </h1>
          <p className="text-3xl lg:text-lg text-slate-400 font-light">
            Voici les performances d'aujourd'hui.
          </p>
        </div>

        <Link
          to="/admin/blogs/create"
          className="w-full lg:w-auto group flex items-center justify-center gap-4 lg:gap-2 bg-slate-800 hover:bg-slate-700 text-white px-10 py-8 lg:px-6 lg:py-3 rounded-2xl lg:rounded-xl border-2 lg:border border-slate-700 transition-all shadow-xl"
        >
          <Plus className="w-10 h-10 lg:w-5 lg:h-5 text-primary group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-bold text-3xl lg:text-base">Nouvel Article</span>
        </Link>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#04192a] p-10 lg:p-6 rounded-[2.5rem] lg:rounded-2xl border-2 lg:border border-slate-800/60 relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8 lg:mb-4 relative z-10">
              <div className={`p-4 lg:p-3 rounded-xl ${stat.bgIcon} ${stat.border} border-2 lg:border`}>
                <stat.icon className={`w-8 h-8 lg:w-6 lg:h-6 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-2 text-xl lg:text-xs font-bold text-slate-500 bg-slate-900/50 px-4 py-2 lg:px-2 lg:py-1 rounded-full border lg:border border-slate-800">
                <TrendingUp className="w-5 h-5 lg:w-3 lg:h-3 text-primary" />
                {stat.trend}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-slate-400 text-xl lg:text-xs font-bold uppercase tracking-widest mb-2 lg:mb-1">
                {stat.title}
              </h3>
              <p className="text-7xl lg:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
        
        {/* COLONNE GAUCHE : CTA RÉDACTION */}
        <div className="lg:col-span-2 bg-[#04192a] p-12 lg:p-10 rounded-[2.5rem] lg:rounded-3xl border-2 lg:border border-slate-800/60 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-4 lg:gap-2 px-6 py-2 rounded-full bg-amber-500/10 border-2 lg:border border-amber-500/20 text-amber-400 text-2xl lg:text-xs font-bold uppercase mb-8 lg:mb-6">
              <Sparkles className="w-6 h-6 lg:w-3 lg:h-3" /> Espace Rédaction
            </div>
            <h2 className="text-6xl lg:text-4xl font-serif font-bold text-white mb-8 lg:mb-4 leading-tight">
              Partagez votre expertise
            </h2>
            <p className="text-slate-400 text-4xl lg:text-lg leading-relaxed max-w-2xl lg:max-w-xl mb-16 lg:mb-8">
              Publiez des cas cliniques ou des conseils pour rassurer vos futurs
              patients à Tanger.
            </p>
            <Link
              to="/admin/blogs/create"
              className="inline-flex items-center justify-center gap-6 lg:gap-2 bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-400 text-slate-900 px-12 py-8 lg:px-8 lg:py-4 rounded-2xl lg:rounded-xl font-bold text-3xl lg:text-lg w-full lg:w-auto hover:shadow-glow transition-all"
            >
              <Plus className="w-8 h-8 lg:w-5 lg:h-5" />
              Rédiger un article
            </Link>
          </div>
        </div>

        {/* COLONNE DROITE : PROCHAINS RENDEZ-VOUS */}
        <div className="bg-[#04192a] rounded-[2.5rem] lg:rounded-3xl border-2 lg:border border-slate-800/60 p-10 lg:p-6 flex flex-col shadow-xl">
          <h3 className="text-white font-serif font-bold text-4xl lg:text-xl mb-10 lg:mb-6 flex items-center gap-3">
            <Calendar className="w-8 h-8 lg:w-5 lg:h-5 text-primary" />
            Prochains RDV
          </h3>
          
          <div className="flex-1 space-y-6 lg:space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((app) => (
                <Link
                  to={`/admin/rendez-vous/${app.id}`}
                  key={app.id}
                  className="flex items-center justify-between p-6 lg:p-4 rounded-2xl lg:rounded-xl bg-slate-900/50 border-2 lg:border border-slate-800 hover:border-primary/50 transition-all group"
                >
                  <div className="pr-4">
                    {/* Nom du Patient */}
                    <h4 className="text-white text-3xl lg:text-base font-bold line-clamp-1 mb-2 flex items-center gap-2">
                      <User className="w-6 h-6 lg:w-4 lg:h-4 text-slate-500" />
                      {app.full_name}
                    </h4>
                    
                    {/* Service & Date */}
                    <div className="flex flex-col gap-1">
                        <span className="text-primary text-xl lg:text-xs font-bold uppercase tracking-wider">
                            {app.service}
                        </span>
                        <span className="text-slate-400 text-lg lg:text-xs flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(app.preferred_date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
                        </span>
                    </div>
                  </div>
                  <ArrowRight className="w-10 h-10 lg:w-4 lg:h-4 text-slate-600 group-hover:text-white transition-colors" />
                </Link>
              ))
            ) : (
              <p className="text-slate-500 text-3xl lg:text-base text-center py-10">
                Aucun rendez-vous à venir.
              </p>
            )}
          </div>

          <Link
            to="/admin/rendez-vous"
            className="mt-12 lg:mt-6 text-center text-4xl lg:text-sm text-slate-400 hover:text-white transition-colors py-8 lg:py-2 border-t-2 lg:border-t border-slate-800 font-bold lg:font-normal"
          >
            Voir le calendrier complet
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;