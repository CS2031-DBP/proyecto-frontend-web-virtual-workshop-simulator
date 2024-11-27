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
        });

        const [errorMessage, setErrorMessage] = useState(""); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); 

        try {
            const response = await apiLogin(data.email, data.password);  
            if (response && response.data.token && response.data.usuarioId) {
              // Si las credenciales son correctas
              login(response.data.usuarioId, response.data.token);
              navigate("/dashboard");
            } else {
              // Si la respuesta del API no contiene un token o usuarioId
              setErrorMessage("Los datos son incorrectas. Por favor, intenta nuevamente o registrate.");
            }
          } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setErrorMessage("Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.");
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
                 {/* Mostrar el mensaje de error si existe */}
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">
                        <p>{errorMessage}</p>
                    </div>
                )}
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
