import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../api/inicio';
import { useAuth } from '../auth/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const[data,setData] = useState(
        {
            email:"",
            password:"",
        })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            console.log(data);
            const response = await apiLogin(data.email, data.password);  
            //console.log("verificar varlo: ",response?.data.token)      
            if (response && response.data.token && response.data.usuarioId){
                //console.log("Paso para dashboard", response.data.token)
                login(response.data.usuarioId, response.data.token);
                navigate("/dashboard");
                //localStorage.setItem("token", response.data.token)
            }else{
                navigate("/notFound")
                
            }
        }catch(error){
            console.error("Error en el inicio de sesión:", error);
        }
        
        
    }

  return (
    <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-blue-950 text-center">
                    BIENVENIDO
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                        placeholder="Ingresa tu correo"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:ring focus:ring-indigo-300"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
  )
}

export default Login
