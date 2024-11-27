import axios from "axios";
import { API_URL } from "./inicio";



export const getPosts = async (page: number, limit: number, carreraId:string) => {
    try {
      console.log("getPagination:::::", localStorage.getItem("token"));
      const response = await axios.get(`${API_URL}/posts/carreras/${carreraId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { page, limit },
      });
      
      console.log('post obtenidos exitosamente api');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);

    }
  };


export const postPost = async (usuarioId:string | null,carreraId:string, titulo:string, contenido:string) => {
  try{

    const response = await axios.post(`${API_URL}/posts/carreras`, {
      usuarioId,
      carreraId,
      titulo,
      contenido,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
  );

  console.log("Se creo correctamente su post desde Api");
  return response;

  }catch(error){
    console.log("Error al crea su publicacion: ", error);
  }


}