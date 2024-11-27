import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import SubirMaterial from "../componentes/SubirMateriales";

const SubirMaterialPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const cursoId = state?.cursoId;


  const handleMaterialSubido = () => {
    navigate(-1); 
  };

  if (!cursoId) {
    return <p>Error: No se especificó el curso.</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenido Principal */}
      <div className="flex flex-1 mt-[70px] justify-center items-center bg-gray-50">
        <div className="w-full max-w-2xl p-4 bg-white shadow-md rounded">
          {/* Pasa cursoId como prop */}
          <SubirMaterial cursoId={cursoId} onMaterialSubido={handleMaterialSubido} />
        </div>
      </div>
    </div>
  );
};

export default SubirMaterialPage;
