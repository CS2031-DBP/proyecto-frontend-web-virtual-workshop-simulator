import axios from "axios"

export const API_URL = 'http://localhost:8080';

interface User {
    nombre: string;
    email: string;
    password: string;
  }

interface inicio{
  token:string,
  usuarioId:string
}

export const apiLogin = async (email:string, password:string) => {
    try{

        const response = await axios.post<inicio>(`${API_URL}/auth/login`,{email, password});
        console.log('Login exitoso respuesta Api');
        return response;
    }catch(error){
        console.log("Error al iniciar el login: ",error)
    }
}


export const register = async (user: User) => {
    try {
      const response = await axios.post<inicio>(`${API_URL}/auth/register`, user);
      console.log('registro exitoso respuesta Api');
      return response;
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };