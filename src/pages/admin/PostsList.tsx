import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Eye,
  Calendar,
  AlertCircle,
  Loader2,
  ChevronLeft, // Nouveau
  ChevronRight // Nouveau
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  created_at: string;
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string>("");

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Nombre d'articles par page

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/blogs");
      setPosts(response.data);
    } catch (err) {
      console.error("Erreur de chargement", err);
      setError("Impossible de charger les articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Reset la page à 1 si on utilise la recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      alert("Erreur suppression.");
    }
  };

  // 1. Filtrage global
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 2. Logique de Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="animate-in fade-in duration-700 space-y-12 lg:space-y-8 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 lg:gap-4">
        <div>
          <h1 className="text-5xl lg:text-4xl font-serif font-bold text-white mb-2">
            Gestion des Articles
          </h1>
          <p className="text-slate-400 text-2xl lg:text-base font-light">
            Gérez vos publications.
          </p>
        </div>

        <Link
          to="/admin/blogs/create"
          className="bg-gradient-gold text-slate-900 px-8 py-5 lg:px-6 lg:py-3 rounded-2xl lg:rounded-xl font-bold text-2xl lg:text-base hover:shadow-glow transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 lg:gap-2"
        >
          <Plus className="w-8 h-8 lg:w-5 lg:h-5" />
          Nouvel Article
        </Link>
      </div>

      {/* --- BARRE DE RECHERCHE --- */}
      <div className="bg-[#04192a] p-6 lg:p-4 rounded-[2rem] lg:rounded-2xl border border-slate-800/60 flex items-center gap-4 lg:gap-3 shadow-lg">
        <Search className="text-slate-500 w-8 h-8 lg:w-5 lg:h-5" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-600 text-3xl lg:text-base h-12 lg:h-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- LISTE DES ARTICLES --- */}
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
        ) : filteredPosts.length === 0 ? (
          <div className="p-40 lg:p-20 text-center text-slate-500">
            <p className="text-3xl lg:text-lg mb-4 lg:mb-2">Aucun article trouvé.</p>
          </div>
        ) : (
          <>
            {/* --- VERSION MOBILE (Utilise currentPosts) --- */}
            <div className="lg:hidden space-y-8 p-4">
              {currentPosts.map((post) => (
                <div key={post.id} className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-700/50 flex flex-col gap-6">
                  {/* Image */}
                  <div className="w-full h-56 rounded-3xl overflow-hidden bg-slate-800 border border-slate-700">
                    <img src={post.image || "https://via.placeholder.com/150"} alt="" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Contenu */}
                  <div>
                    <span className="inline-block px-5 py-2 rounded-full text-lg font-bold bg-slate-800 border border-slate-700 text-slate-300 mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-white font-bold text-3xl mb-3 leading-tight line-clamp-2">{post.title}</h3>
                    <div className="flex items-center gap-3 text-slate-400 text-xl mb-6">
                      <Calendar className="w-5 h-5 text-primary" />
                      {new Date(post.created_at).toLocaleDateString("fr-FR")}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 border-t border-slate-700 pt-6">
                    <Link to={`/blog/${post.id}`} target="_blank" className="flex-1 bg-blue-500/10 text-blue-400 py-5 rounded-2xl flex justify-center items-center">
                      <Eye className="w-8 h-8" />
                    </Link>
                    <Link to={`/admin/blogs/edit/${post.id}`} className="flex-1 bg-amber-500/10 text-amber-400 py-5 rounded-2xl flex justify-center items-center">
                      <Edit className="w-8 h-8" />
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="flex-1 bg-red-500/10 text-red-400 py-5 rounded-2xl flex justify-center items-center">
                      <Trash2 className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* --- VERSION DESKTOP (Utilise currentPosts) --- */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-bold uppercase text-slate-500 tracking-wider">
                    <th className="p-6">Article</th>
                    <th className="p-6">Catégorie</th>
                    <th className="p-6">Date</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentPosts.map((post) => (
                    <tr key={post.id} className="group hover:bg-slate-800/30 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                            <img src={post.image || "https://via.placeholder.com/150"} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-1">{post.title}</h3>
                            <span className="text-xs text-slate-500">ID: #{post.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Calendar className="w-4 h-4 text-primary/50" />
                          {new Date(post.created_at).toLocaleDateString("fr-FR")}
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/blog/${post.id}`} target="_blank" className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10">
                            <Eye className="w-5 h-5" />
                          </Link>
                          <Link to={`/admin/blogs/edit/${post.id}`} className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-400/10">
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
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

export default PostsList;