import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/inicio';
import { useAuth } from '../auth/AuthProvider';

interface User {
    nombre: string;
    email: string;
    password: string;
  }


const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const[data,setData] = useState<User>(
        {
            nombre:"",
            email:"",
            password:"",
        });

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
            const response = await register(data);        
            if (response && response.token){
                login(response.token);
                navigate("/dashboard");
               
            }else{
                navigate("/notFound")
            }
        }catch(error){
            console.log(error);
        }
        
    }
  return (
    <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
                    BIENVENIDO AL REGISTRO
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="nombre"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={data.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                        placeholder="Ingresa tu nombre"
                        required
                    />
                </div>
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
                    Registrarse
                </button>
            </form>
        </div>
  )
}

export default Register
