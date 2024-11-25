import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useParams } from "react-router-dom";
import { MaterialRequestDto, subirMaterial } from "../api/material";

const SubirMaterial: React.FC = () => {
  const { usuarioId } = useAuth();
  const { cursoId } = useParams<{ cursoId: string }>();

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<"PDF" | "VIDEO" | "IMAGEN">("PDF");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !cursoId) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const materialRequest: MaterialRequestDto = {
      usuarioId: Number(usuarioId),
      cursoId: Number(cursoId),
      nombre,
      tipo,
    };

    try {
      const response = await subirMaterial(materialRequest, file);
      setSuccessMessage(`Material "${response.nombre}" subido exitosamente.`);
      setNombre("");
      setFile(null);
    } catch (error) {
      setError("Hubo un error al subir el material. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Subir Material</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre del Material
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tipo" className="block text-sm font-medium">
            Tipo de Material
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "PDF" | "VIDEO" | "IMAGEN")}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          >
            <option value="PDF">PDF</option>
            <option value="VIDEO">Video</option>
            <option value="IMAGEN">Imagen</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium">
            Seleccionar Archivo
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
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
            {loading ? "Subiendo..." : "Subir Material"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubirMaterial;
