import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getMateriales } from '../api/material';

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
    usuarioNombre: string,

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
            return "pdf.png"; 
          case TipoMaterial.VIDEO:
            return "video.png"; 
          case TipoMaterial.IMAGEN:
            return "image.png"; 
          default:
            return "error.png"; 
        }
      };


    useEffect(() => {
        const fetchPost = async () => {
          setLoading(true);
          try {
            console.log("token en empagination: " ,localStorage.getItem("token"));
            const data = await getMateriales(skip, limit);
            setmaterial(data.content as Material[]);
          } catch (error) {
            console.error("Error al obtener productos:", error);
            setmaterial([]);
          }finally {
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
        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">Todos los Materiales Disponibles</h2>
          {loading ? (
        <p>Cargando materiales...</p>
      ) : materials.length === 0 ? (
        <p className="text-center text-gray-500">No hay materiales disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="border rounded shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => window.open(material.urlArchivo, "_blank")}
            >
              <div className="relative">
                <img
                  src={getImageForType(material.tipo)}
                  alt={material.nombre}
                  className="w-full h-48 object-cover rounded-t"
                />
                <div className="absolute top-2 right-2 bg-white text-gray-800 text-sm font-medium px-2 py-1 rounded">
                  Rating: ⭐{material.rating.toFixed(1)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{material.nombre}</h3>
                <p className="text-gray-500 text-sm mb-2">Por {material.usuarioNombre}</p>
                <p className="text-blue-500 text-sm underline">Ver más</p>
              </div>
            </div>
          ))}
        </div>
      )}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              className="bg-blue-500 text-white p-2 rounded"
              disabled={skip === 0}
            >
              Anterior
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Siguiente
            </button>
          </div>
        </div>
      );
}

export default PaginatioMaterial
