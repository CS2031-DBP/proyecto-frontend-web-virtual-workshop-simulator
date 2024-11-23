import axios from "axios";
import { API_URL } from "./inicio";

const token = localStorage.getItem("token")

export const getUsuario = async (usuarioId:string) => {
    try {
      //console.log("llamado a la api verificando usuario: ", token)
      const response = await axios.get(`${API_URL}/usuarios/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('carreras obtenidas para el usuario Api', );
      return response;
    } catch (error) {
      console.error('Error al obtener carreras:', error);

    }
};