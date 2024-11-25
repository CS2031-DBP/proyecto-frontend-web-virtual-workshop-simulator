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

export const getActividadById = async (usuarioId: string, id: string) => {
  try {
    const response = await axios.get(`${API_URL}/actividades/${usuarioId}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la actividad por ID:", error);
  }
};


export const getActividad = async (cursoId:string) => {
    try {
      //console.log("llamado a la api getActividades : " )
      const response = await axios.get(`${API_URL}/actividades/curso/${cursoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log('Actividades obtenidas');
      return response;
    } catch (error) {
      console.error('Error al obtener Actividades:', error);
    }

};


export interface ActividadRequest {
  nombre: string;
  tipo: "REUNION" | "QUIZZ";
  fechaActividad: string;
  hora: string;
}

export const createActividad = async (usuarioId: string, cursoId: string, actividadData: ActividadRequest ) => {
  try {
    console.log(usuarioId, cursoId, actividadData, "API/////////")
    console.log(localStorage.getItem("token"))
    const response = await axios.post(`${API_URL}/actividades/${usuarioId}/curso/${cursoId}`,
      actividadData,
      { headers: {Authorization: `Bearer ${localStorage.getItem("token")}` }, }
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear la actividad:", error);
    throw new Error("No se pudo crear la actividad");
  }
};


