import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { postPost } from "../api/post";
import { Usuario } from "./Perfil";
import { FaUserCircle, FaHeading, FaPenAlt } from "react-icons/fa";

interface CrearPostProps {
  usuario: { id: string; nombre: string; perfilUrl?: string }; // Define el tipo de usuario
}

const CrearPost: React.FC<CrearPostProps> = ({usuario}) => {
  const { carreraId } = useParams<{ carreraId: string }>();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await postPost(usuario.id, carreraId, titulo, contenido); 
      setTitulo("");
      setContenido("");
    } catch (err) {
      setError("Error al crear el post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center mb-4">
        <img
          src={usuario.perfilUrl || "/sinPerfil.png"}
          alt="Perfil"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-sm font-medium">{usuario?.nombre || "Usuario"}</p>
          <p className="text-gray-500 text-xs">Crea una nueva publicación</p>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-semibold text-gray-700 flex items-center"
          >
            <FaHeading className="mr-2 text-blue-500" />
            Título
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Escribe el título aquí"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contenido"
            className="block text-sm font-semibold text-gray-700 flex items-center"
          >
            <FaPenAlt className="mr-2 text-blue-500" />
            Contenido
          </label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={6}
            placeholder="Escribe el contenido aquí"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Creando..." : "Crear Post"}
        </button>
      </form>
    </div>
  );

};

export default CrearPost;
