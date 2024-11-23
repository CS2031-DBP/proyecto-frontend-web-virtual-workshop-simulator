import React from "react";
import { useNavigate } from "react-router-dom";
import ListCarreras from "../componentes/ListCarreras";
import Perfil from "../componentes/Perfil";
import Navbar from "../componentes/Navbar";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenido Principal */}
      <div className="flex flex-1 mt-[70px]"> {/* Ajustamos el margen para evitar superposición con el Navbar */}
        {/* Panel Izquierdo */}
        <aside className="w-1/4 border-r p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Carreras</h2>
          <ListCarreras onCarreraClick={(id) => navigate(`/carrera/${id}`)} />
        </aside>

        {/* Panel Derecho */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Perfil /> {/* Aquí se renderearán los detalles de perfil o cursos */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
