import React, { useState } from 'react'
import { createCurso } from '../api/curso';

interface CrearCursoFormProps {
  carreraId: string;
  onCursoCreado: () => void; // Callback para actualizar la lista de cursos
}

const CrearCarrera: React.FC<CrearCursoFormProps> = ({ carreraId, onCursoCreado })=> {

  const [nombreCurso, setNombreCurso] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [creandoCurso, setCreandoCurso] = useState<boolean>(false);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombreCurso.trim()) {
      setError("El nombre del curso es obligatorio.");
      return;
    }

    setCreandoCurso(true);
    setError(null);

    try {
      await createCurso(nombreCurso, carreraId); // Llamada a la API para crear el curso
      setNombreCurso(""); // Limpia el campo de texto
      onCursoCreado(); // Llama a la función para actualizar los cursos
    } catch (error) {
      setError("Hubo un error al crear el curso. Intenta nuevamente.");
      console.error("Error al crear el curso", error);
    } finally {
      setCreandoCurso(false);
    }
  };


  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Crear Nuevo Curso</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombreCurso}
          onChange={(e) => setNombreCurso(e.target.value)}
          placeholder="Nombre del curso"
          className="border rounded px-4 py-2 mb-2 w-full"
        />
        <button
          type="submit"
          disabled={creandoCurso}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {creandoCurso ? "Creando..." : "Crear Curso"}
        </button>
      </form>
    </div>
  );
}

export default CrearCarrera
