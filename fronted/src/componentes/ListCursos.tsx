import React, { useEffect, useState } from "react";
import { createCurso, getCursos } from "../api/curso"; // Importa correctamente la función de la API
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import CrearCurso from "./CrearCurso";
import { FaPlusCircle } from "react-icons/fa";
import { obtenerCarrerasInscritas } from "../api/usuario";

export interface Curso {
  id: string;
  nombre: string;
  carreraNombre:string
}

interface ListCursoProps {
  onCursoClick: (id: string) => void; 
}

const ListCursos: React.FC<ListCursoProps> = ({onCursoClick}) => {

  const { carreraId } = useParams<{ carreraId: string }>();
  const { usuarioId } = useAuth();
  const [cursos, setCursos] = useState<Curso[]>([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [inscrito, setInscrito] = useState<boolean>(false);

  useEffect(() => {
    const fetchCursos = async () => {
      if (!carreraId) {
        setError("No se ha proporcionado un ID de carrera.");
        return;
      }
      
      setLoading(true); 
      setError(null); 
      
      try {
        
        const carrerasInscritas = await obtenerCarrerasInscritas(usuarioId);
        setInscrito(carrerasInscritas.includes(Number(carreraId)));
        //console.log("CARRERAS INSCRITAS DEL USUARIO",carrerasInscritas);
        //console.log("COMPONENTE LUST, CARRERA ID", carreraId);
        //console.log(carrerasInscritas.includes(Number(carreraId)), "inscrito");
        const response = await getCursos(carreraId);
        if (response && response.data) {
          setCursos(response.data as Curso[]); 
        }
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setError("Ocurrió un error al cargar los cursos.");
        setCursos([]); 
      } finally {
        setLoading(false); 
    };
  }

    fetchCursos();
  }, [carreraId]);

  const refreshCursos = async () => {
    setMostrarFormulario(false);
    const response = await getCursos(carreraId!);
    if (response && response.data) {
      setCursos(response.data as Curso[]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 h-screen flex flex-col">
        {inscrito && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="flex items-center gap-2 px-14 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaPlusCircle size={20} className="text-white" />
            Crear curso
          </button>
          )}
        {mostrarFormulario && (
        <CrearCurso 
          carreraId={carreraId!} 
          onCursoCreado={refreshCursos} />
          )}
      <h2 className="text-2xl font-bold mb-4">Lista de Cursos</h2>
      {loading && <p>Cargando cursos...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && cursos.length === 0 ? (
        <p className="text-center text-gray-500">No hay cursos disponibles.</p>
      ) : (
        <div className="border rounded shadow-md p-4 max-h-96 overflow-y-auto">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="border-b py-2 cursor-pointer hover:bg-gray-100 transition duration-200 flex mt-4 gap-x-4"
              onClick={() => onCursoClick(curso.id)}>
              <img
                src="/biblioteca.png"
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
