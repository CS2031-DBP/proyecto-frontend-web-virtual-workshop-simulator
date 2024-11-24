import axios from "axios";
import { API_URL } from "./inicio";


export const getCarreras = async () => {
    try {
      const response = await axios.get(`${API_URL}/carreras`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      //console.log('carreras obtenidas correctamente API');
      return response.data;
    } catch (error) {
      console.error('Error al obtener carreras:', error);

    }
};


interface carreraResponse{
  id:string,
  nombre:string
}

export const createCarrera = async (nombre:string) => {
  try{

      const response = await axios.post<carreraResponse>(`${API_URL}/carreras`,
        {nombre},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
    );
      //console.log('Curso creado exitosamente respuesta Api');
      return response;
  }catch(error){
      console.log("Error al crear curso: ",error)
  }
}