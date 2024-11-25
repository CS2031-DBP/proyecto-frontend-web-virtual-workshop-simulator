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

export interface MaterialRequestDto {
    usuarioId: number;
    cursoId: number;
    nombre: string;
    tipo: "PDF" | "VIDEO" | "IMAGEN";
};
  
export const subirMaterial = async (materialRequestDto: MaterialRequestDto, file: File) => {
    const formData = new FormData();
    formData.append("usuarioId", String(materialRequestDto.usuarioId));
    formData.append("cursoId", String(materialRequestDto.cursoId));
    formData.append("nombre", materialRequestDto.nombre);
    formData.append("tipo", materialRequestDto.tipo);
    formData.append("file", file);
  
    try {
      const response = await axios.post(`${API_URL}/materiales/subir`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al subir material:", error);
      throw error;
    }
};

