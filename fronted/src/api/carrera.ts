import axios from "axios";
import { API_URL } from "./inicio";

const token = localStorage.getItem("token")

export const getCarreras = async () => {
    try {
      const response = await axios.get(`${API_URL}/carreras`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('carreras obtenidas', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener carreras:', error);

    }
};