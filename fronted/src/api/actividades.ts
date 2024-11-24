import axios from "axios";
import { API_URL } from "./inicio";

export const postActividades = async (usuarioId:string, cursoId:string) => {
    try {
      console.log("llamado a la api getActividades : ", cursoId )
      const response = await axios.post(`${API_URL}/actividades/${usuarioId}/curso/${cursoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log('Actividades obtenidas');
      return response;
    } catch (error) {
      console.error('Error al obtener Actividades:', error);
    }

};

export const getActividadById = async (id: string) => {
  try{
    const response = await axios.get(`/api/actividades/${id}`);
    return response.data;
  }catch(error){
    console.log(error);
  }
};

export const gettActividad = async () => {
    try {
      //console.log("llamado a la api getActividades : " )
      const response = await axios.get(`${API_URL}/actividades`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log('Actividades obtenidas');
      return response;
    } catch (error) {
      console.error('Error al obtener Actividades:', error);
    }

};


export const gettActividades = async (cursoId: string) => {
  // Simular una respuesta de la API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: "1", nombre: "Actividad 1", enlace: "https://google.com" },
          { id: "2", nombre: "Actividad 2", enlace: "https://example.com" },
          { id: "3", nombre: "Actividad 3", enlace: "" }, // Actividad sin enlace
        ],
      });
    }, 1000); // Simular un retraso de 1 segundo
  });
};

