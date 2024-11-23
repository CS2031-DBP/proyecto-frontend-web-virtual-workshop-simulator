import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListCursos from "../componentes/ListCursos";

const Carpeta: React.FC = () => {
  const navigate = useNavigate();
  const { carreraId } = useParams<{ carreraId: string }>(); 
  return (
    <div className="flex h-screen">
      {/* Panel Izquierdo */}
      <aside className="w-1/4 border-r p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Cursos</h2>
        {carreraId && <ListCursos id={carreraId} />}
      </aside>

      <main className="flex-1 p-6">
        POSTS DE ACUERDO A CADA CARRERA{/* Aquí se renderearán los detalles de perfil o cursos */}
      </main>
    </div>
  );
};

export default Carpeta;
