import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api/post";

interface Post {
  id: string;
  titulo: string;
  autorNombre: string;
  contenido: string;
  fechaCreacion: number;
}

const PaginatioPost: React.FC = () => {

  const [posts, setposts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 4; 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getPosts(skip, limit);
        setposts(data.content as Post[]);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setposts([]);
      }finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [skip]);

  const handleNext = () => {
    setSkip(skip + limit);
  };

  const handlePrevious = () => {
    if (skip >= limit) {
      setSkip(skip - limit);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Todos las Publicaciones</h2>
      {loading ? (
        <p>Cargando posts...</p>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
            <div
            key={post.id}
            className="border rounded shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/posts/${post.id}`)}
            >
            <div className="relative">
                <img
                    src={"/bienvenida.png"}
                    alt={post.titulo}
                    className="w-full h-48 object-cover rounded-t"
                />
                <div className="absolute top-2 right-2 bg-white text-gray-800 text-sm font-medium px-2 py-1 rounded">
                    {new Date(post.fechaCreacion).toLocaleDateString()}
                </div>
            </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{post.titulo}</h3>
                    <p className="text-gray-500 text-sm mb-2">Por {post.autorNombre}</p>
                    <p className="text-gray-600 text-sm">{post.contenido.slice(0, 100)}...</p>
                </div>
            </div>
            ))}
        </div>)}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={skip === 0}
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatioPost;