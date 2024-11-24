import axios from "axios";
import { API_URL } from "./inicio";


export const getMateriales = async (skip: number, limit: number) => {
    try {
      const response = await axios.get(`${API_URL}/materiales`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { skip, limit },
      });
      console.log('post obtenidos exitosamente api');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);

    }
  };