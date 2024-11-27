import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts } from "../api/post";
import { useAuth } from "../auth/AuthProvider";
import { Usuario } from "./Perfil";
import { getUsuario } from "../api/usuario";

interface Post {
  id: string;
  titulo: string;
  autorNombre: string;
  contenido: string;
  fechaCreacion: number;
}

const PaginatioPost: React.FC = () => {
  const { carreraId } = useParams<{ carreraId: string }>();
  const { usuarioId } = useAuth();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [posts, setposts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 3;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getUsuario(usuarioId);
        setUsuario(response?.data);

        // Llama al backend con `page` y `limit`
        const data = await getPosts(page, limit, carreraId);
        setposts(data.content as Post[]);
        setTotalPages(data.totalPages); // Guarda el total de páginas
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setposts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [page]); // Cambia cuando la página actual cambia

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1); // Avanza a la siguiente página
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1); // Retrocede a la página anterior
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Todas las Publicaciones</h2>
      {loading ? (
        <p>Cargando posts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4"
              //onClick={() => navigate(`/posts/${post.id}`)}
            >
              <div className="flex items-center mb-4">
                <img
                  src={usuario?.perfilUrl || "/sinPerfil.png"}
                  alt="Perfil"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{post.autorNombre}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(post.fechaCreacion).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-4">
                {post.titulo}
              </h3>
              <div className="border p-3 rounded bg-gray-50 text-gray-600 text-sm max-h-32 overflow-y-auto">
                <p>{post.contenido}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={page >= totalPages - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatioPost;
