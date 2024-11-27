import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import CrearActividad from "../componentes/CrearActividad";

const CrearActividadPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cursoId = state?.cursoId;

  if (!cursoId) {
    return <p>Error: No se especificó el curso.</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 mt-[70px] justify-center items-center bg-gray-50">
        <div className="w-full max-w-2xl p-4 bg-white shadow-md rounded">
          <CrearActividad cursoId={cursoId} />
        </div>
      </div>
    </div>
  );
};

export default CrearActividadPage;
