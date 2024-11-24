import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListCursos from "../componentes/ListCursos";
import Navbar from "../componentes/Navbar";
import PaginatioPost from "../componentes/PaginationPost";
import CrearPost from "../componentes/CrearPost";
import { getUsuario } from "../api/usuario";
import { useAuth } from "../auth/AuthProvider";

const Carpeta: React.FC = () => {
  const { usuarioId } = useAuth(); // Obtener ID del usuario autenticado
  const [usuario, setUsuario] = useState<{ id: string; nombre: string; perfilUrl?: string } | null>(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuario(usuarioId);
        setUsuario({
          id: response.data.id,
          nombre: response.data.nombre,
          perfilUrl: response.data.perfilUrl,
        });
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 mt-[70px]">
        {/* Panel Izquierdo */}
        <aside className="w-1/4 border-r p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Cursos</h2>
          <ListCursos onCursoClick={(id) => navigate(`/curso/${id}`)} />
        </aside>

        {/* Panel Derecho */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="flex justify-center mb-6">
            {usuario && (
              <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <CrearPost usuario={usuario} /> {/* Pasar usuario como prop */}
              </div>
            )}
          </div>
          <PaginatioPost />
        </main>
      </div>
    </div>
  );
};

export default Carpeta;
