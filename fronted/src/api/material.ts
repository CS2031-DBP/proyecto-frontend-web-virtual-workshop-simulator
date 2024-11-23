import axios from "axios";
import { API_URL } from "./inicio";

const token = localStorage.getItem("token")

export const getMateriales = async (skip: number, limit: number) => {
    try {
      const response = await axios.get(`${API_URL}/materiales`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { skip, limit },
      });
      console.log('post obtenidos exitosamente api', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);

    }
  };