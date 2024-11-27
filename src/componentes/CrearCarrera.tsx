import React, { useState } from 'react'
import { createCarrera } from '../api/carrera';

interface CrearCarreraFormProps {
  onCarreraCreado: () => void;
}

const CrearCarrera: React.FC<CrearCarreraFormProps> = ({onCarreraCreado })=> {

  const [nombreCurso, setNombreCurso] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [creandoCarrera, setCreandoCarrera] = useState<boolean>(false);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombreCurso.trim()) {
      setError("El nombre del curso es obligatorio.");
      return;
    }

    setCreandoCarrera(true);
    setError(null);

    try {
      await createCarrera(nombreCurso);
      setNombreCurso("");
      onCarreraCreado(); 
    } catch (error) {
      setError("Hubo un error al crear el curso. Intenta nuevamente.");
      console.error("Error al crear el curso", error);
    } finally {
        setCreandoCarrera(false);
    }
  };


  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Crear Nuevo Carrera</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombreCurso}
          onChange={(e) => setNombreCurso(e.target.value)}
          placeholder="Nombre de la Carrera"
          className="border rounded px-4 py-2 mb-2 w-full"
        />
        <button
          type="submit"
          disabled={creandoCarrera}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {creandoCarrera ? "Creando..." : "Crear Carrera"}
        </button>
      </form>
    </div>
  );
}

export default CrearCarrera
