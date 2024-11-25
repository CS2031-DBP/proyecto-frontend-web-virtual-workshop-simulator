import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../componentes/Navbar';

const Inicio = () => {
    const navigate = useNavigate();
    document.title = 'Iniciar Sesion - Asesorias++';

    const handleMove = (path) => {
        navigate(path);
        
    }


  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">BIENVENIDO</h1>
        <div className="flex flex-col items-center space-y-6">
          <img src="bienvenida.png" alt="Bienvenida" className="h-[200px] w-[200px]" />
          <div className="flex space-x-8">
            <button
              onClick={() => handleMove("/login")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
            Login
            </button>
            <button
              onClick={() => handleMove("/register")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
            Registrarse
            </button>
          </div>
        </div>
        <h1 className=" text-3xl font-bold mt-12"> ASESORIAS ++</h1>
      </div>
    </div>

    
  )
}

export default Inicio
