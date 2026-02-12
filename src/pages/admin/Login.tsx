import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from "../../api/axios";
import { Loader2, Mail, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import cliniqueImage from "@/assets/images/compressed/DSC09118-CT.jpg"; 

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/admin/dashboard');
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setError('Email ou mot de passe incorrect.');
            } else {
                setError('Erreur de connexion au serveur.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-950 font-sans text-white">
            
            {/* PARTIE GAUCHE : FORMULAIRE */}
            {/* Mobile: p-20 | Desktop: p-20 (normal) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-20 lg:p-20 relative bg-[#04192a] border-r border-slate-800">
                
                {/* BOUTON RETOUR */}
                {/* Mobile: top-12 left-12 text-4xl | Desktop: top-8 left-8 text-base */}
                <Link to="/" className="absolute top-12 left-12 lg:top-8 lg:left-8 flex items-center gap-4 lg:gap-2 text-slate-400 hover:text-primary transition-colors">
                    <ArrowLeft className="w-12 h-12 lg:w-5 lg:h-5" />
                    <span className="font-medium text-4xl lg:text-base">Retour au site</span>
                </Link>

                {/* CONTENEUR */}
                <div className="w-full max-w-4xl lg:max-w-md space-y-16 lg:space-y-8">
                    
                    <div className="text-center">
                        {/* ICONE PRINCIPALE */}
                        {/* Mobile: w-40 h-40 | Desktop: w-16 h-16 */}
                        <div className="inline-flex items-center justify-center w-40 h-40 lg:w-16 lg:h-16 rounded-full bg-primary/20 mb-10 lg:mb-6 border-4 lg:border border-primary/30">
                            <ShieldCheck className="w-20 h-20 lg:w-8 lg:h-8 text-primary" />
                        </div>
                        
                        {/* TITRE */}
                        {/* Mobile: text-8xl | Desktop: text-4xl */}
                        <h1 className="text-8xl lg:text-4xl font-serif font-bold text-white mb-6 lg:mb-2">Espace Admin</h1>
                        {/* SOUS-TITRE */}
                        {/* Mobile: text-4xl | Desktop: text-base */}
                        <p className="text-4xl lg:text-base text-slate-400">Connectez-vous pour gérer votre cabinet.</p>
                    </div>

                    {error && (
                        <div className="p-8 lg:p-4 rounded-2xl lg:rounded-lg bg-red-900/20 border-2 lg:border border-red-500/50 text-red-400 text-3xl lg:text-sm flex items-center gap-4 lg:gap-2">
                            <span className="font-bold">Erreur :</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-12 lg:space-y-6">
                        
                        {/* CHAMP EMAIL */}
                        <div className="space-y-4 lg:space-y-2">
                            <label className="text-3xl lg:text-sm font-medium text-slate-300 block">Adresse Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-6 lg:pl-3 flex items-center pointer-events-none text-slate-500">
                                    {/* Icone Mail responsive */}
                                    <Mail className="w-10 h-10 lg:w-5 lg:h-5" />
                                </div>
                                <input 
                                    type="email" 
                                    // Mobile: pl-24 py-10 text-4xl | Desktop: pl-10 py-3 text-base
                                    className="w-full pl-24 lg:pl-10 pr-8 lg:pr-4 py-10 lg:py-3 border-2 lg:border border-slate-700 rounded-2xl lg:rounded-lg focus:ring-4 lg:focus:ring-2 focus:ring-primary outline-none bg-slate-950 text-white placeholder:text-slate-600 text-4xl lg:text-base"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@conceptify.ma"
                                    required
                                />
                            </div>
                        </div>

                        {/* CHAMP PASSWORD */}
                        <div className="space-y-4 lg:space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-3xl lg:text-sm font-medium text-slate-300 block">Mot de passe</label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-6 lg:pl-3 flex items-center pointer-events-none text-slate-500">
                                    {/* Icone Lock responsive */}
                                    <Lock className="w-10 h-10 lg:w-5 lg:h-5" />
                                </div>
                                <input 
                                    type="password" 
                                    // Mobile: pl-24 py-10 text-4xl | Desktop: pl-10 py-3 text-base
                                    className="w-full pl-24 lg:pl-10 pr-8 lg:pr-4 py-10 lg:py-3 border-2 lg:border border-slate-700 rounded-2xl lg:rounded-lg focus:ring-4 lg:focus:ring-2 focus:ring-primary outline-none bg-slate-950 text-white placeholder:text-slate-600 text-4xl lg:text-base"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* BOUTON LOGIN */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            // Mobile: py-10 text-4xl | Desktop: py-3 text-lg
                            className="w-full bg-gradient-gold text-slate-900 py-10 lg:py-3 rounded-2xl lg:rounded-lg font-bold text-4xl lg:text-lg hover:shadow-glow hover:opacity-90 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-4 lg:gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin text-slate-900 w-10 h-10 lg:w-5 lg:h-5" /> : "Se connecter"}
                        </button>
                    </form>
                    
                    <p className="text-center text-2xl lg:text-xs text-slate-600 mt-16 lg:mt-8">
                        Système de gestion sécurisé • Conceptify &copy; 2026
                    </p>
                </div>
            </div>

            {/* PARTIE DROITE : IMAGE (Reste normale sur Desktop, cachée sur mobile) */}
            <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent z-20" />
                
                <img 
                    src={cliniqueImage} 
                    alt="Cabinet Dentaire" 
                    className="w-full h-full object-cover opacity-80"
                />

                <div className="absolute bottom-0 left-0 p-20 z-30 text-white">
                    <h2 className="text-5xl font-serif font-bold mb-6">L'excellence au service de votre sourire.</h2>
                    <p className="text-slate-300 text-xl font-light max-w-lg leading-relaxed">
                        Interface d'administration sécurisée.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;