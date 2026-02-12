import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { 
    Save, 
    Image as ImageIcon, 
    ArrowLeft, 
    X, 
    Loader2, 
    Layout, 
    FileText 
} from 'lucide-react';

const CreatePost: React.FC = () => {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category || !content) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            await api.post('/blogs', formData); 
            alert("Article publié avec succès !");
            navigate('/admin/blogs');
        } catch (error) {
            console.error("Erreur upload", error);
            alert("Erreur lors de la publication.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-700 max-w-7xl mx-auto pb-32 lg:pb-20 px-4">
            
            {/* HEADER */}
            <div className="flex items-center gap-6 lg:gap-4 mb-12 lg:mb-8 mt-10">
                <Link 
                    to="/admin/blogs" 
                    className="p-6 lg:p-3 rounded-3xl lg:rounded-xl bg-[#04192a] border-2 lg:border border-slate-800 text-slate-400 hover:text-white transition-all"
                >
                    <ArrowLeft className="w-10 h-10 lg:w-6 lg:h-6" />
                </Link>
                <div>
                    <h1 className="text-6xl lg:text-4xl font-serif font-bold text-white">
                        Nouvel Article
                    </h1>
                    <p className="text-3xl lg:text-base text-slate-400 mt-2">Rédigez du contenu pour vos patients.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-3 gap-12 lg:gap-8">
                
                {/* 1. CONTENU (Titre + Texte) */}
                <div className="lg:col-span-2 space-y-10 lg:space-y-6 order-1">
                    <div className="bg-[#04192a] p-10 lg:p-8 rounded-[3rem] lg:rounded-3xl border-2 lg:border border-slate-800/60 shadow-xl">
                        <div className="mb-10 lg:mb-6">
                            <label className="block text-2xl lg:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 lg:mb-2">
                                Titre de l'article <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-10 h-10 lg:w-5 lg:h-5" />
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ex: Les avantages des implants"
                                    className="w-full pl-20 pr-6 py-8 lg:py-3 bg-[#2d4253] border-2 lg:border border-slate-700 rounded-[1.5rem] lg:rounded-xl text-white text-4xl lg:text-base outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-2xl lg:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 lg:mb-2">
                                Contenu de l'article <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={12}
                                placeholder="Écrivez ici..."
                                className="w-full p-8 lg:p-4 bg-[#2d4253] border-2 lg:border border-slate-700 rounded-[1.5rem] lg:rounded-xl text-slate-200 text-3xl lg:text-base outline-none transition-all resize-y leading-relaxed"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. IMAGE (Order 2 sur mobile pour être AVANT le bouton publier) */}
                <div className="space-y-10 lg:space-y-6 order-2">
                    <div className="bg-[#04192a] p-10 lg:p-8 rounded-[3rem] lg:rounded-3xl border-2 lg:border border-slate-800/60 shadow-xl">
                        <h3 className="text-3xl lg:text-lg text-white font-bold mb-8 lg:mb-4 flex items-center gap-4 lg:gap-2">
                            <ImageIcon className="w-8 h-8 lg:w-5 lg:h-5 text-blue-400" />
                            Couverture
                        </h3>

                        <div className="relative w-full aspect-video rounded-[1.5rem] lg:rounded-xl bg-[#2d4253] border-4 lg:border-2 border-dashed border-slate-700 flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-colors group">
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-4 right-4 p-4 bg-red-500 text-white rounded-2xl"
                                    >
                                        <X className="w-8 h-8 lg:w-4 lg:h-4" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="w-20 h-20 lg:w-10 lg:h-10 text-slate-600 mb-4" />
                                    <p className="text-3xl lg:text-sm text-slate-500 font-bold">Appuyez pour ajouter</p>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* 3. CONFIGURATION (Order 3 sur mobile - Contient le bouton final) */}
                    <div className="bg-[#04192a] p-10 lg:p-8 rounded-[3rem] lg:rounded-3xl border-2 lg:border border-slate-800/60 shadow-xl order-3">
                        <h3 className="text-3xl lg:text-lg text-white font-bold mb-8 lg:mb-4 flex items-center gap-4 lg:gap-2">
                            <Layout className="w-8 h-8 lg:w-5 lg:h-5 text-primary" />
                            Détails
                        </h3>
                        
                        <div className="mb-10 lg:mb-6">
                            <label className="block text-xl lg:text-xs font-bold text-slate-500 uppercase mb-4 lg:mb-2">Catégorie</label>
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-8 lg:p-3 bg-[#2d4253] border-2 lg:border border-slate-700 rounded-[1.5rem] lg:rounded-xl text-white text-3xl lg:text-base outline-none focus:border-primary transition-colors cursor-pointer appearance-none"
                            >
                                <option value="" disabled>Choisir une catégorie</option>
                                <option value="Esthétique">Esthétique Dentaire</option>
                                <option value="Implantologie">Implantologie</option>
                                <option value="Orthodontie">Orthodontie</option>
                                <option value="Soins">Soins Généraux</option>
                                <option value="Conseils">Conseils & Prévention</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-10 lg:py-4 rounded-[1.5rem] lg:rounded-xl bg-gradient-gold text-slate-900 font-black lg:font-bold text-4xl lg:text-lg hover:shadow-glow transition-all active:scale-95 flex items-center justify-center gap-4 lg:gap-2 shadow-2xl shadow-yellow-500/20"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin w-10 h-10 lg:w-5 lg:h-5" />
                            ) : (
                                <>
                                    <Save className="w-10 h-10 lg:w-5 lg:h-5" />
                                    PUBLIER L'ARTICLE
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;