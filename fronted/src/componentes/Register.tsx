import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, checkEmailExists, checkNombreExists } from "../api/inicio";
import { useAuth } from "../auth/AuthProvider";

interface User {
  nombre: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState<User>({
    nombre: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");


    if (isSubmitting) return; 

    setIsSubmitting(true);
    try {
      const emailExists = await checkEmailExists(data.email);
      console.log(emailExists, "componente ")
      if (emailExists) {
        console.log(emailExists);
        setErrorMessage("El correo electrónico ya está en uso.");
        setIsSubmitting(false);
        return;
      }

      const nombreExists = await checkNombreExists(data.nombre);
      if (nombreExists) {
        setErrorMessage("El nombre de usuario ya está en uso.");
        setIsSubmitting(false);
        return;
      }
      
      const response = await register(data);    
      if (response && response.data.token && response.data.usuarioId) {
        login(response.data.usuarioId, response.data.token);
        navigate("/dashboard");
      } else {
        setErrorMessage("Hubo un error al registrar el usuario. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      setErrorMessage("Error al registrar el usuario. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          BIENVENIDO AL REGISTRO
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

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
          disabled={isSubmitting}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
