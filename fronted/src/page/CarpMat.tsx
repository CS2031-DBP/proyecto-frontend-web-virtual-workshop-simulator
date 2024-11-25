import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import ListActividades from "../componentes/ListActividades";
import SubirMaterial from "../componentes/SubirMateriales";
import PaginatioMaterial from "../componentes/PaginatioMaterial";

const CarpMat: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToSubirMaterial = () => {
    navigate("/curso/material/subir");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenido Principal */}
      <div className="flex flex-1 mt-[70px]"> {/* Ajustamos el margen para evitar superposición con el Navbar */}
        {/* Panel Izquierdo */}
        <aside className="w-1/4 border-r p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Actividades</h2>
          <ListActividades />
        </aside>

        {/* Panel Derecho */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleNavigateToSubirMaterial}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Subir Material
            </button>
          </div>
          <PaginatioMaterial />
        </main>

      </div>
    </div>
  );
};

export default CarpMat;
