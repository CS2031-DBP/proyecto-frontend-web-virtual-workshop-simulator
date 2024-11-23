import axios from "axios";
import { API_URL } from "./inicio";

const token = localStorage.getItem("token")

export const getCursos = async (carreraId:string) => {
    try {
      console.log("llamado a la api evericando token: ", token)
      const response = await axios.get(`${API_URL}/cursos/carreras/${carreraId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('carreras obtenidas', response.data);
      return response;
    } catch (error) {
      console.error('Error al obtener carreras:', error);

    }
};