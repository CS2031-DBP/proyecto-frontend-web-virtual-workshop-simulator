import React, { useEffect, useState } from "react";
import { getCarreras } from "../api/carrera";
import CrearCarrera from "./CrearCarrera";
import { FaFolderPlus, FaUserPlus, FaCheck } from "react-icons/fa";
import { useAuth } from "../auth/AuthProvider";
import { postInscribirse, obtenerCarrerasInscritas } from "../api/usuario";

export interface Carrera {
  id: string;
  nombre: string;
  cursos: [];
}

interface ListCarrerasProps {
  usuarioId: string; 
  onCarreraClick: (id: string) => void; 
}


const ListCarreras: React.FC<ListCarrerasProps> = ({usuarioId,onCarreraClick }) => {
  
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [inscritos, setInscritos] = useState<{ [key: string]: boolean }>({});


  useEffect(() => {
    const fetchCarreras = async () => {
      setLoading(true);
      try {
        const data = await getCarreras();
        setCarreras(data as Carrera[]);

        const carrerasInscritas = await obtenerCarrerasInscritas(usuarioId);
        const inscritosObj: { [key: string]: boolean } = {};

        carrerasInscritas.forEach((carreraId: string) => {
          inscritosObj[carreraId] = true;
        });
        setInscritos(inscritosObj);

      } catch (error) {
        console.error("Error al obtener carreras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarreras();
  }, [usuarioId]);

  const refreshCursos = async () => {
    setMostrarFormulario(false);
    const data = await getCarreras();
    setCarreras(data as Carrera[]); 
  };

  const handleInscribirse = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    try {
      if (!usuarioId || !id) {
        console.error("Usuario o carrera no definidos.");
        return;
      }
  
      console.log(`Usuario ${usuarioId} intenta inscribirse en la carrera con ID: ${id}`);
      await postInscribirse(id, usuarioId); // Ahora con los nombres y tipos correctos
      setInscritos((prev) => ({ ...prev, [id]: true }));
      setCarreras((prevCarreras) =>
        prevCarreras.map((carrera) =>
          carrera.id === id ? { ...carrera, inscrito: true } : carrera
        )
      );
  
    } catch (error) {
      console.error("Error en la inscripción desde el componente:", error);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto mt-10 h-screen flex flex-col">
      <button
        onClick={() => setMostrarFormulario(true)}
        className="flex items-center gap-2 px-14 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <FaFolderPlus size={20} className="text-white" />
        Crear carrera
      </button>

      {mostrarFormulario && <CrearCarrera onCarreraCreado={refreshCursos} />}

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
              className="border-b py-2 hover:bg-gray-100 transition duration-200 flex justify-between items-center mt-4"
              onClick={() => onCarreraClick(carrera.id)}
            >
              <div className="flex items-center gap-x-4">
                <img
                  src={"biblioteca.png"}
                  alt={"biblioteca"}
                  className="w-[30px] h-[30px] object-cover rounded-t"
                />
                <p className="text-lg font-medium text-blue-800 cursor-pointer">
                  {carrera.nombre}
                </p>
              </div>
              {/* Icono para inscribirse */}
              <div>
                {inscritos[carrera.id] ? (
                  <FaCheck
                    size={20}
                    className="text-green-600"
                    title="Inscrito"
                  />
                ) : (
                  <FaUserPlus
                    size={20}
                    className="text-green-600 cursor-pointer hover:text-green-800 transition duration-200"
                    onClick={(e) => handleInscribirse(e, carrera.id)}
                    title="Inscribirse"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default ListCarreras;
