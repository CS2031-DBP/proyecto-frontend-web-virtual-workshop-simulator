import React from "react";
import { useNavigate } from "react-router-dom";
import ListCarreras from "../componentes/ListCarreras";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Panel Izquierdo */}
      <aside className="w-1/4 border-r p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Carreras</h2>
        <ListCarreras onCarreraClick={(id) => navigate(`/carrera/${id}`)} />
      </aside>

      <main className="flex-1 p-6">
        PERFIL{/* Aquí se renderearán los detalles de perfil o cursos */}
      </main>
    </div>
  );
};

export default Dashboard;
