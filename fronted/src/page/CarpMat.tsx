import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import ListActividades from "../componentes/ListActividades";
import PaginatioMaterial from "../componentes/PaginatioMaterial";

const CarpMat: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const inscrito = state?.inscrito; 
  const { cursoId } = useParams<{ cursoId: string }>();

  const handleNavigateToSubirMaterial = () => {
    navigate("/curso/material/subir", { state: { cursoId } } );
  };

  const handleNavigateToCrearActividad = () => {
    navigate("/curso/actividad/crear", { state: { cursoId } });
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 mt-[70px]">
        <aside className="w-1/4 border-r p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Actividades</h2>
          <ListActividades />
        </aside>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="flex justify-between mb-4">
          {inscrito && (
            <div className="flex justify-evenly mb-4 gap-4">
              <button
                onClick={handleNavigateToCrearActividad}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Crear Actividad
              </button>

              <button
                onClick={handleNavigateToSubirMaterial}
                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition duration-200"
              >
                Subir Material
              </button>
            </div>
          )};
        </div>
          <PaginatioMaterial />
        </main>

      </div>
    </div>
  );
};

export default CarpMat;
