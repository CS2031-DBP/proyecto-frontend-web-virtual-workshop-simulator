import axios from "axios"

const API_URL = 'http://localhost:8080';

interface User {
    nombre: string;
    email: string;
    password: string;
  }

export const apiLogin = async (email:string, password:string) => {
    try{

        const response = await axios.post<{token : string}>(`${API_URL}/auth/login`,{email, password});
        console.log('Login exitoso');
        return response;
    }catch(error){
        console.log("Error al iniciar el login: ",error)
    }
}


export const register = async (user: User) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, user);
      localStorage.setItem("token", response.data.token);
      console.log('registro exitoso');
      return response.data;
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };