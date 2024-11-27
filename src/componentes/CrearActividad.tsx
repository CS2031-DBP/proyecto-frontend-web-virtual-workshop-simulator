import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActividadRequest, createActividad } from "../api/actividades";
import { useAuth } from "../auth/AuthProvider";

interface CrearActividadProps {
  cursoId: string;
}
const CrearActividad: React.FC<CrearActividadProps> = ({ cursoId }) => {
  const { usuarioId } = useAuth();
  const navigate = useNavigate();

  const [actividad, setActividad] = useState<ActividadRequest>({
    nombre: "",
    tipo: "REUNION",
    fechaActividad: "",
    hora: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log(cursoId, "CURSOID COMPONENTE");
      const actividadCreada = await createActividad(usuarioId, cursoId, actividad);
      console.log("Actividad creada con éxito", actividadCreada);

      navigate(`/curso/${cursoId}`);
    } catch (error) {
        console.log(error);
      setError("Hubo un error al crear la actividad.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setActividad((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Actividad</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre de la Actividad
          </label>
          <input
            type="text"
            id="nombre"
            value={actividad.nombre}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tipo" className="block text-sm font-medium">
            Tipo de Actividad
          </label>
          <select
            id="tipo"
            value={actividad.tipo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          >
            <option value="REUNION">Reunión</option>
            <option value="QUIZZ">Quiz</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="fechaActividad" className="block text-sm font-medium">
            Fecha de la Actividad
          </label>
          <input
            type="date"
            id="fechaActividad"
            value={actividad.fechaActividad}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hora" className="block text-sm font-medium">
            Hora de la Actividad
          </label>
          <input
            type="time"
            id="hora"
            value={actividad.hora}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Actividad"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearActividad;
