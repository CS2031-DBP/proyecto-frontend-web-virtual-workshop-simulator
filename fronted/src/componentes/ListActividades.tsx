import React, { useEffect, useState } from "react";
import { MdTask } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { gettActividades } from "../api/actividades";

export interface Actividad {
  id: string;
  nombre: string;
  enlace:string
}

interface ListCursoProps {
  onCursoClick: (id: string) => void; 
}

const ListActividades: React.FC<ListCursoProps> = ({onCursoClick}) => {

  const { cursoId } = useParams<{ cursoId: string }>();
  const { usuarioId } = useAuth();
  const [actividades, setActividad] = useState<Actividad[]>([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActividad = async () => {
      if (!cursoId) {
        setError("No se ha proporcionado un ID de carrera.");
        return;
      }
      
      setLoading(true); 
      setError(null); 
      
      try {
        const response = await gettActividades(cursoId);
        if (response && response.data) {
          setActividad(response.data as Actividad[]); 
        }
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setError("Ocurrió un error al cargar los cursos.");
        setActividad([]); 
      } finally {
        setLoading(false); 
    };
  }

  fetchActividad();
  }, [cursoId]);

  const handleNombreClick = (id: string) => {
    navigate(`/actividades/${id}`); 
  };

  const handleEnlaceClick = (url: string) => {
    window.open(url, "_blank");
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Lista de Actividades</h2>
      {loading && <p>Cargando actividades...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && actividades.length === 0 ? (
        <p className="text-center text-gray-500">No existen actividades creadas.</p>
      ) : (
        <div className="border rounded shadow-md p-4 max-h-96 overflow-y-auto">
          {actividades.map((actividad) => (
            <div
              key={actividad.id}
              className="border-b py-2 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition duration-200"
            >
              <MdTask size={24} className="text-blue-900" />
              <p
                className="flex-1 text-lg font-medium text-gray-600 hover:underline"
                onClick={() => handleNombreClick(actividad.id)}
              >
                {actividad.nombre}
              </p>


              {actividad.enlace && (
                <FaExternalLinkAlt
                  size={20}
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEnlaceClick(actividad.enlace)}
                  title="Abrir enlace"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default ListActividades;
