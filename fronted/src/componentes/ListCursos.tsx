import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCursos } from "../api/curso";

export interface Curso {
  id: number;
  nombre: string;
}


interface ListCursosProps {
    id: string
}


const ListCursos: React.FC<ListCursosProps> = ({id}) => {

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      if (!id){
        return;
      }
      setLoading(true);
      try {
        console.log(id)
        const data = await getCursos(id);
        setCursos(data?.data as Curso[]); 
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setCursos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Lista de Carreras</h2>
      {loading ? (
        <p>Cargando cursos...</p>
      ) : cursos.length === 0 ? (
        <p className="text-center text-gray-500">No hay carreras disponibles.</p>
      ) : (
        <div className="border rounded shadow-md p-4 max-h-96 overflow-y-auto">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="border-b py-2 cursor-pointer hover:bg-gray-100 transition duration-200 flex mt-4 gap-x-4"
              
            >
                <img
                    src={"biblioteca.png"}
                    alt={"biblioteca"}
                    className="w-[30px] h-[30px] object-cover rounded-t"
                />
                <p className="text-lg font-medium text-blue-800">{curso.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListCursos;
