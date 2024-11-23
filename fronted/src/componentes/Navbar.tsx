import React from 'react'
import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
    const { logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
    }

  return (
    <nav className="bg-blue-400 text-blue-900 fixed top-0 left-0 w-full z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
            <h2 className="flex items-center">
                <img
                    src="logo_buho.png"
                    alt=""
                    className="h-[50px] w-[50px] mr-2" />
                <span className="text-lg font-bold text-white">Asesorias ++</span>
            </h2>
            { isAuthenticated && (
            <div>
               <button onClick={handleLogout} 
               className="bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Salir
                </button> 
            </div> )}
        </div>
    </nav>
  )
}

export default Navbar
