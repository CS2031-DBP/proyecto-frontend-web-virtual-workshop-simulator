import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActividadById } from "../api/actividades";

interface ActividadDetalle {
  id: number;
  nombre: string;
  nameUsuario: string;
  perfilUsuario: string;
  tipo: "REUNION" | "QUIZZ";
  enlace: string;
  fecha: string;
  fechaActividad: string;
}

const ActividadDetalle: React.FC = () => {
  const { actividadId } = useParams<{ actividadId: string }>();
  const [actividad, setActividad] = useState<ActividadDetalle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividad = async () => {
      if (!actividadId){return;}

      setLoading(true);
      setError(null);

      try {
        //const data = await getActividadById(actividadId);
        // no olvidar ejemplo
        setActividad({
            id: 1,
            nombre: "Reunión de estrategia de marketing",
            nameUsuario: "María López",
            perfilUsuario: "https://via.placeholder.com/150", // Imagen de perfil de prueba
            tipo: "REUNION",
            enlace: "https://example.com",
            fecha: "2024-11-20T10:00:00",
            fechaActividad: "2024-11-25T15:00:00",
          });
      } catch (error) {
        console.error("Error al obtener los detalles de la actividad:", error);
        setError("No se pudieron cargar los detalles de la actividad.");
      } finally {
        setLoading(false);
      }
    };

    fetchActividad();
  }, [actividadId]);

  if (loading) return <p>Cargando detalles de la actividad...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Detalles de la Actividad
      </h1>
  
      {actividad ? (
        <div className="flex border rounded-lg shadow-lg bg-blue-50 p-6">
          {/* Columna de los detalles de la actividad (más grande) */}
          <div className="w-2/3 pr-6">
            {/* Fecha de creación en la esquina superior derecha */}
            <p className="absolute top-4 right-6 text-sm text-gray-500 italic">
              Creado: {new Date(actividad.fecha).toLocaleString()}
            </p>
  
            {/* Parte superior: Nombre del usuario y foto de perfil */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={actividad.perfilUsuario}
                alt={`${actividad.nameUsuario}'s profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Creado por: {actividad.nameUsuario}
                </p>
              </div>
            </div>
  
            {/* Nombre de la actividad */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-blue-700">{actividad.nombre}</h2>
            </div>
  
            {/* Tipo de actividad */}
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-semibold text-gray-700">Tipo:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm text-white ${
                    actividad.tipo === "REUNION" ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {actividad.tipo}
                </span>
              </p>
            </div>
  
            {/* Fecha de la actividad */}
            <div className="mb-6">
              <p className="text-lg">
                <span className="font-semibold text-gray-700">Se realizará el día:</span>{" "}
                {new Date(actividad.fechaActividad).toLocaleString()}
              </p>
            </div>
  
            {/* Enlace */}
            <div className="mt-6">
              {actividad.enlace ? (
                <a
                  href={actividad.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5h6m0 0v6m0-6L10.5 3m0 0H6m4.5 0v6m0-6l-9 9m12 3.5A2.5 2.5 0 0112 17.5M3 14l7 7m-7-7h4.5a2.5 2.5 0 012.5 2.5V21"
                    />
                  </svg>
                  Abrir enlace de la actividad
                </a>
              ) : (
                <p className="text-gray-500 italic">No hay enlace disponible.</p>
              )}
            </div>
          </div>
  
          {/* Columna con la imagen adicional */}
          <div className="w-1/3">
            <img
              src="/actividad.jpeg"
              alt="Imagen adicional"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      ) : (
        <p>No se encontraron detalles para esta actividad.</p>
      )}
    </div>
  );
  
  
};

export default ActividadDetalle;
