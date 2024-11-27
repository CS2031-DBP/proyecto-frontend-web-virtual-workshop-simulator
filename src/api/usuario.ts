import axios from "axios";
import { API_URL } from "./inicio";

const token = localStorage.getItem("token")

export const getUsuario = async (usuarioId:string) => {
    try {
      //console.log("llamado a la api verificando usuario: ", localStorage.getItem("token"))
      const response = await axios.get(`${API_URL}/usuarios/${usuarioId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log('carreras obtenidas para el usuario Api' );
      return response;
    } catch (error) {
      console.error('Error al obtener sus datos:', error);

    }
};

export const postInscribirse = async (carreaId: string, usuarioId: string) => {
  try {
    if (!carreaId || !usuarioId) {
      throw new Error("carreaId o usuarioId no están definidos.");
    }

    //console.log("VERIFICAR carrera DESDE EL API", carreaId);
    //console.log("VERIFICAR usuario DESDE EL API", usuarioId);

    const response = await axios.post(
      `${API_URL}/usuarios/carreras/inscribir`,
      { carreaId, usuarioId }, 
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    console.log("Se ha inscrito exitosamente desde el Api");
    return response;
  } catch (error) {
    console.error("Error al inscribirse a la carrera:", error);
  }
};

export const obtenerCarrerasInscritas = async (usuarioId: string | null) => {
  if (!usuarioId) return [];
  try {
    const response = await axios.get(`${API_URL}/usuarios/${usuarioId}/carreras`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //console.log("VERIFICANDO LAS CARRERAS INSCRITAS: ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener carreras inscritas:", error);
    return [];
  }
};



export const postPerfil = async (usuarioId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${API_URL}/usuarios/${usuarioId}/perfil`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Se subió la foto de perfil exitosamente");
    return response;
  } catch (error) {
    console.error("Error al subir la foto de perfil:", error);
    throw error;
  }
};



