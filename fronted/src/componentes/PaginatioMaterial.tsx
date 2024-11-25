import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMateriales } from "../api/material";

export enum TipoMaterial {
  PDF = "PDF",
  VIDEO = "VIDEO",
  IMAGEN = "IMAGEN",
}

interface Material {
  id: string;
  nombre: string;
  urlArchivo: string;
  tipo: TipoMaterial;
  rating: number;
  usuarioNombre: string;
}

const PaginatioMaterial = () => {
  const [materials, setmaterial] = useState<Material[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 4;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getImageForType = (tipo: TipoMaterial): string => {
    switch (tipo) {
      case TipoMaterial.PDF:
        return "/pdf.png"; // Asegúrate de que esta imagen esté en la carpeta `public`
      case TipoMaterial.VIDEO:
        return "/video.png";
      case TipoMaterial.IMAGEN:
        return "/image.png";
      default:
        return "/error.png";
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getMateriales(skip, limit);
        setmaterial(data.content as Material[]);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setmaterial([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [skip]);

  const handleNext = () => {
    setSkip(skip + limit);
  };

  const handlePrevious = () => {
    if (skip >= limit) {
      setSkip(skip - limit);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Todos los Materiales Disponibles
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando materiales...</p>
      ) : materials.length === 0 ? (
        <p className="text-center text-gray-500">No hay materiales disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white overflow-hidden"
              onClick={() => window.open(material.urlArchivo, "_blank")}
            >
              {/* Imagen del material */}
              <div className="relative bg-gray-100 h-40 flex items-center justify-center">
                <img
                  src={getImageForType(material.tipo)}
                  alt={material.nombre}
                  className="max-w-full max-h-full"
                />
                <div className="absolute top-2 right-2 bg-white text-gray-800 text-sm font-medium px-2 py-1 rounded shadow">
                  ⭐ {material.rating.toFixed(1)}
                </div>
              </div>

              {/* Contenedor de los detalles */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {material.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Tipo: <span className="font-medium">{material.tipo}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1 truncate">
                  Por: <span className="font-medium">{material.usuarioNombre || "Anónimo"}</span>
                </p>
                <button className="mt-2 text-blue-500 text-sm font-medium underline">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Controles de paginación */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className={`p-2 rounded bg-blue-500 text-white ${
            skip === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={skip === 0}
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatioMaterial;
