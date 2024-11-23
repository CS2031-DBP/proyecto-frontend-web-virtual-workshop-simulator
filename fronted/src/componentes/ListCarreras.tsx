import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCarreras } from "../api/carrera";



export interface Carrera {
  id: number;
  nombre: string;
  cursos: [];
}

interface ListCarrerasProps {
  onCarreraClick: (id: number) => void; 
}


const ListCarreras: React.FC<ListCarrerasProps> = ({onCarreraClick }) => {

  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarreras = async () => {
      setLoading(true);
      try {
        const data = await getCarreras();
        setCarreras(data as Carrera[]); 
      } catch (error) {
        console.error("Error al obtener carreras:", error);
        setCarreras([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCarreras();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Lista de Carreras</h2>
      {loading ? (
        <p>Cargando carreras...</p>
      ) : carreras.length === 0 ? (
        <p className="text-center text-gray-500">No hay carreras disponibles.</p>
      ) : (
        <div className="border rounded shadow-md p-4 max-h-96 overflow-y-auto">
          {carreras.map((carrera) => (
            <div
              key={carrera.id}
              className="border-b py-2 cursor-pointer hover:bg-gray-100 transition duration-200 flex mt-4 gap-x-4"
              onClick={() => onCarreraClick(carrera.id)} 
            >
                <img
                    src={"biblioteca.png"}
                    alt={"biblioteca"}
                    className="w-[30px] h-[30px] object-cover rounded-t"
                />
                <p className="text-lg font-medium text-blue-800">{carrera.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListCarreras;
