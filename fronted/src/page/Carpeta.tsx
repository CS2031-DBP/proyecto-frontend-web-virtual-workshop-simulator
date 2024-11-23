import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListCursos from "../componentes/ListCursos";
import Navbar from "../componentes/Navbar";
import PaginatioPost from "../componentes/PaginationPost";

const Carpeta: React.FC = () => {
  const navigate = useNavigate();
  const { carreraId } = useParams<{ carreraId: string }>();
  console.log("CARPETA: ", carreraId);
  return (

    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenido Principal */}
      <div className="flex flex-1 mt-[70px]"> {/* Ajustamos el margen para evitar superposición con el Navbar */}
        {/* Panel Izquierdo */}
        <aside className="w-1/4 border-r p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Carreras</h2>
          {carreraId && <ListCursos />}
        </aside>

        {/* Panel Derecho */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <PaginatioPost /> {/* Aquí se renderearán los detalles de perfil o cursos */}
        </main>
      </div>
    </div>
  );
};

export default Carpeta;
