import axios from "axios";
import { API_URL } from "./inicio";

//const token = localStorage.getItem("token")

export const getCursos = async (carreraId:string) => {
    try {
      //console.log("llamado a la api getCursos : ", carreraId )
      const response = await axios.get(`${API_URL}/cursos/carrera/${carreraId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log('Cursos obtenidas');
      return response;
    } catch (error) {
      console.error('Error al obtener carreras:', error);
    }

};

interface cursoResponse{
  id:string,
  nombre:string
}

export const createCurso = async (nombre:string, carreraId:string) => {
  try{

      const response = await axios.post<cursoResponse>(`${API_URL}/cursos/${carreraId}`,{nombre},{
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
      console.log('Curso creado exitosamente respuesta Api');
      return response;
  }catch(error){
      console.log("Error al crear curso: ",error)
  }
}