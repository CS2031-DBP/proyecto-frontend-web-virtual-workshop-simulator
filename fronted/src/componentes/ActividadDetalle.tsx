import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActividadById } from "../api/actividades";
import { useAuth } from "../auth/AuthProvider"; 

interface ActividadDetalle {
  id: string;
  nombre: string;
  nameUsuario: string;
  perfilUsuario: string;
  tipo: "REUNION" | "QUIZZ";
  enlace: string | null;
  fecha: string;
  fechaActividad: string;
}

const ActividadDetalle: React.FC = () => {
  const { actividadId } = useParams<{ actividadId: string }>();
  const { usuarioId } = useAuth(); 
  const [actividad, setActividad] = useState<ActividadDetalle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividad = async () => {
      if (!actividadId || !usuarioId) return; 

      setLoading(true);
      setError(null);

      try {
        const data = await getActividadById(usuarioId, actividadId);
        setActividad(data);
      } catch (err) {
        console.error("Error al obtener los detalles de la actividad:", err);
        setError("No se pudieron cargar los detalles de la actividad.");
      } finally {
        setLoading(false);
      }
    };

    fetchActividad();
  }, [actividadId, usuarioId]);

  if (loading) return <p className="text-center text-gray-600">Cargando detalles de la actividad...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Detalles de la Actividad
      </h1>

      {actividad ? (
        <div className="flex border rounded-lg shadow-lg bg-blue-50 p-6">
          <div className="w-2/3 pr-6">
            <p className="absolute top-4 right-6 text-sm text-gray-500 italic">
              Creado: {new Date(actividad.fecha).toLocaleString()}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={actividad.perfilUsuario || "/sinPerfil.png"}
                alt={`${actividad.nameUsuario}'s profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Creado por: {actividad.nameUsuario}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-blue-700">Titulo: {actividad.nombre}</h2>
            </div>
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
            <div className="mb-6">
              <p className="text-lg">
                <span className="font-semibold text-gray-700">Se realizará el día:</span>{" "}
                {new Date(actividad.fechaActividad).toLocaleString()}
              </p>
            </div>
            <div className="mt-6">
              {actividad.enlace ? (
                <a
                  href={actividad.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Abrir enlace de la actividad
                </a>
              ) : (
                <p className="text-gray-500 italic">No hay enlace disponible.</p>
              )}
            </div>
          </div>
          <div className="w-1/3">
            <img
              src="/actividad.jpeg"
              alt="Imagen adicional"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No se encontraron detalles para esta actividad.</p>
      )}
    </div>
  );
};

export default ActividadDetalle;
