import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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

const EditPost: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    // États du formulaire
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // 1. CHARGER LES DONNÉES ACTUELLES
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/blogs/${id}`);
                const post = response.data;
                setTitle(post.title);
                setCategory(post.category);
                setContent(post.content);
                if (post.image) {
                    setPreview(post.image); 
                }
            } catch (error) {
                console.error("Erreur de récupération", error);
                alert("Impossible de charger l'article.");
                navigate('/admin/blogs');
            } finally {
                setFetching(false);
            }
        };
        fetchPost();
    }, [id, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                alert("L'image est trop lourde (Max 4MB)");
                return;
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };

    // 2. ENVOYER LES MODIFICATIONS
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('content', content);
        formData.append('_method', 'PUT'); 
        
        if (image) {
            formData.append('image', image);
        }

        try {
            await api.post(`/blogs/${id}`, formData); 
            alert("Article mis à jour avec succès !");
            navigate('/admin/blogs');
        } catch (error: any) {
            console.error("Erreur mise à jour", error);
            alert("Erreur lors de la mise à jour.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#030712]">
                <Loader2 className="w-20 h-20 lg:w-10 lg:h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-700 max-w-7xl mx-auto pb-32 lg:pb-20 px-4">
            
            {/* --- HEADER --- */}
            <div className="flex items-center gap-6 lg:gap-4 mb-12 lg:mb-8 mt-10">
                <Link 
                    to="/admin/blogs" 
                    className="p-6 lg:p-3 rounded-3xl lg:rounded-xl bg-[#04192a] border-2 lg:border border-slate-800 text-slate-400 hover:text-white transition-all"
                >
                    <ArrowLeft className="w-10 h-10 lg:w-6 lg:h-6" />
                </Link>
                <div>
                    <h1 className="text-6xl lg:text-4xl font-serif font-bold text-white">
                        Modifier l'article
                    </h1>
                    <p className="text-3xl lg:text-base text-slate-400 mt-2">ID : #{id}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-3 gap-12 lg:gap-8">
                
                {/* 1. CONTENU (Titre + Texte) */}
                <div className="lg:col-span-2 space-y-10 lg:space-y-6 order-1">
                    <div className="bg-[#04192a] p-10 lg:p-8 rounded-[3rem] lg:rounded-3xl border-2 lg:border border-slate-800/60 shadow-xl">
                        
                        {/* Titre XXL */}
                        <div className="mb-10 lg:mb-6">
                            <label className="block text-2xl lg:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 lg:mb-2">Titre</label>
                            <div className="relative">
                                <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-10 h-10 lg:w-5 lg:h-5" />
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full pl-20 pr-6 py-8 lg:py-3 bg-[#2d4253] border-2 lg:border border-slate-700 rounded-[1.5rem] lg:rounded-xl text-white text-4xl lg:text-base outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contenu XXL */}
                        <div>
                            <label className="block text-2xl lg:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 lg:mb-2">Contenu</label>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                className="w-full p-8 lg:p-4 bg-[#2d4253] border-2 lg:border border-slate-700 rounded-[1.5rem] lg:rounded-xl text-slate-200 text-3xl lg:text-base outline-none transition-all resize-y leading-relaxed"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* 2. IMAGE (Positionnée avant les boutons sur mobile) */}
                <div className="space-y-10 lg:space-y-6 order-2">
                    <div className="bg-[#04192a] p-10 lg:p-8 rounded-[3rem] lg:rounded-3xl border-2 lg:border border-slate-800/60 shadow-xl">
                        <h3 className="text-3xl lg:text-lg text-white font-bold mb-8 lg:mb-4 flex items-center gap-4 lg:gap-2">
                            <ImageIcon className="w-8 h-8 lg:w-5 lg:h-5 text-blue-400" />
                            Couverture
                        </h3>

                        <div className="relative w-full aspect-video rounded-[1.5rem] lg:rounded-xl bg-[#2d4253] border-4 lg:border-2 border-dashed border-slate-700 flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-colors group">
                            {preview ? (
                                <>
                                    <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
                                    <button 
                                        type="button" 
                                        onClick={removeImage} 
                                        className="absolute top-4 right-4 p-4 bg-red-500 text-white rounded-2xl shadow-2xl"
                                    >
                                        <X className="w-8 h-8 lg:w-4 lg:h-4" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="w-20 h-20 lg:w-10 lg:h-10 text-slate-600 mb-4" />
                                    <p className="text-3xl lg:text-sm text-slate-500 font-bold text-center px-4">Appuyez pour modifier l'image</p>
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

                    {/* 3. CONFIGURATION & BOUTON SAUVEGARDER */}
                    <div className="bg-[#04192a] p-10 lg:p-8 rounded-[3rem] lg:rounded-3xl border-2 lg:border border-slate-800/60 shadow-xl order-3">
                        <h3 className="text-3xl lg:text-lg text-white font-bold mb-8 lg:mb-4 flex items-center gap-4 lg:gap-2">
                            <Layout className="w-8 h-8 lg:w-5 lg:h-5 text-primary" /> Configuration
                        </h3>
                        
                        <div className="mb-10 lg:mb-6">
                            <label className="block text-xl lg:text-xs font-bold text-slate-500 uppercase mb-4 lg:mb-2 tracking-wider">Catégorie</label>
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-8 lg:p-3 bg-[#2d4253] border-2 lg:border border-slate-700 rounded-[1.5rem] lg:rounded-xl text-white text-3xl lg:text-base cursor-pointer appearance-none outline-none"
                                required
                            >
                                <option value="" disabled>Choisir...</option>
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
                                    ENREGISTRER
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditPost;