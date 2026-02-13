import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import api from "../api/axios"; 
import { LayoutDashboard, FileText, LogOut, User as UserIcon, Loader2, Menu, X, CalendarDays, Mail } from 'lucide-react';
import NotFound from "../pages/NotFound"; 

interface UserData {
    id: number;
    name: string;
    email: string;
}

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // États
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserData | null>(null);
    
    // NOUVEAU : État pour le menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const verifyAccess = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAuthorized(false);
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.get('/user');
                setUser(response.data);
                setIsAuthorized(true);
            } catch (error) {
                console.error("Accès refusé", error);
                setIsAuthorized(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAccess();
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (e) { console.error(e); }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#030712]">
                {/* Loader XXL pour mobile */}
                <Loader2 className="w-20 h-20 lg:w-10 lg:h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthorized) {
        return <NotFound />;
    }

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
        { path: '/admin/rendez-vous', icon: CalendarDays, label: 'Rendez-vous' }, 
        { path: '/admin/blogs', icon: FileText, label: 'Articles Blog' },
        { path: '/admin/newsletter', icon: Mail, label: 'Newsletter' }, 
    ];

    return (
        <div className="flex min-h-screen bg-[#2d4253] font-sans text-slate-200">
            
            {/* --- 1. HEADER MOBILE (Visible uniquement sur Mobile) --- */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-40 bg-[#04192a] z-[60] flex items-center justify-between px-10 border-b border-slate-700 shadow-2xl">
                <div className="flex flex-col">
                     <h2 className="text-5xl font-serif font-bold text-white">Admin</h2>
                     <p className="text-2xl text-primary font-bold uppercase tracking-widest mt-2">Panel</p>
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center border border-slate-600 active:scale-95 transition-transform"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-12 h-12 text-red-400" />
                    ) : (
                        <Menu className="w-12 h-12 text-white" />
                    )}
                </button>
            </div>

            {/* --- 2. SIDEBAR (Plein écran sur Mobile / Fixe à gauche sur Desktop) --- */}
            <aside className={`
                fixed top-0 left-0 h-full z-50 bg-[#04192a] border-r border-slate-800/60 shadow-2xl flex flex-col transition-transform duration-300
                
                /* Mobile: Plein écran (w-full), masqué par défaut (-translate-x-full), Padding énorme */
                w-full ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} pt-40
                
                /* Desktop: Largeur fixe (w-72), toujours visible, Padding normal */
                lg:translate-x-0 lg:w-72 lg:pt-0 lg:block
            `}>
                
                {/* En-tête Sidebar (Caché sur mobile car on a le Header Mobile) */}
                <div className="hidden lg:block p-8 border-b border-slate-800/60">
                    <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200 bg-clip-text text-transparent">
                        Admin Panel
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-2 tracking-[0.2em] uppercase font-bold">
                        Centre Al Boughaz
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-8 lg:p-4 space-y-6 lg:space-y-2 mt-4 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                        return (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu sur mobile au clic
                                className={`group flex items-center gap-6 lg:gap-3 px-8 lg:px-4 py-8 lg:py-3.5 rounded-3xl lg:rounded-xl transition-all duration-300 relative overflow-hidden ${
                                    isActive 
                                    ? 'bg-primary/10 text-primary border-2 lg:border border-primary/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border-2 lg:border border-transparent'
                                }`}
                            >
                                {isActive && <div className="absolute left-0 top-0 bottom-0 w-2 lg:w-1 bg-primary"></div>}
                                
                                {/* Icône XXL Mobile / Normale Desktop */}
                                <item.icon className="w-12 h-12 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:scale-110" />
                                
                                {/* Texte XXL Mobile / Normal Desktop */}
                                <span className="font-bold lg:font-medium text-4xl lg:text-sm tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Pied de page Sidebar */}
                <div className="p-8 lg:p-4 m-8 lg:m-4 rounded-3xl lg:rounded-2xl border border-slate-800/60 bg-[#04192a]">
                    <div className="flex items-center gap-6 lg:gap-3 mb-8 lg:mb-4">
                        <div className="w-20 h-20 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white border border-slate-700 shadow-inner">
                            <UserIcon className="w-10 h-10 lg:w-5 lg:h-5" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-3xl lg:text-sm font-bold text-white truncate">{user?.name}</span>
                            <span className="text-xl lg:text-[10px] text-primary font-bold uppercase">Admin</span>
                        </div>
                    </div>
                    
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-4 lg:gap-2 text-red-400/80 hover:text-red-400 px-4 py-8 lg:py-2.5 text-3xl lg:text-xs font-bold transition-all border-2 lg:border border-red-500/10 rounded-2xl lg:rounded-lg hover:bg-red-500/10 hover:border-red-500/20 group">
                        <LogOut className="w-8 h-8 lg:w-4 lg:h-4 group-hover:-translate-x-1 transition-transform" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* --- 3. CONTENU PRINCIPAL --- */}
            {/* Mobile: pt-48 (pour passer sous le header), ml-0 (pas de sidebar à gauche) */}
            {/* Desktop: pt-12, ml-72 (marge pour sidebar) */}
            <main className="flex-1 ml-0 lg:ml-72 p-8 pt-48 lg:p-12 lg:pt-12 min-h-screen relative overflow-x-hidden">
                <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#030712] to-[#030712] -z-10 pointer-events-none"></div>
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;