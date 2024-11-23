import React, { useEffect, useState } from 'react';
import { getUsuario } from '../api/usuario';
import { useAuth } from '../auth/AuthProvider';

interface Carrera {
  id: number;
  nombre: string;
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  perfilUrl: string;
  fechaRegistro: string;
  carreras: Carrera[];
}

const Perfil: React.FC = () => {
  const { usuarioId } = useAuth();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuario(usuarioId);
        setUsuario(response?.data);
        setError(null);
      } catch (error) {
        console.log('error cargando el perfil', error);
        setError('Error al cargar el perfil del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  if (loading) {
    return <p>Cargando perfil del usuario...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="perfil-usuario flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      {usuario ? (
        <>
          <div className="flex flex-col md:flex-row items-center w-full bg-white p-6 rounded-lg shadow-lg mb-6">
            <img
              src={usuario.perfilUrl || 'sinPerfil.png'}
              alt={`Perfil de ${usuario.nombre}`}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover mr-6"
            />
            <div className="flex-1">
              <h2 className="text-2xl text-gray-700 font-bold mb-2"><b>Nombre:</b> {usuario.nombre}</h2>
              <p className="text-gray-700 font-bold mb-2"><b>Email: </b> {usuario.email}</p>
            </div>
            <div className="text-right text-gray-500">
              <p className="text-sm">Registrado:</p>
              <p className="text-sm font-medium">
                {new Date(usuario.fechaRegistro).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="carreras-usuario w-full">
            <h3 className="text-xl font-semibold mb-4">Carreras Inscritas:</h3>
            {usuario.carreras.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usuario.carreras.map((carrera) => (
                  <li
                    key={carrera.id}
                    className="p-4 border rounded-lg bg-white shadow-md"
                  >
                    {carrera.nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-700 font-medium">
                Este usuario no está inscrito en ninguna carrera.
              </p>
            )}
          </div>
        </>
      ) : (
        <p>No se pudo cargar la información del usuario.</p>
      )}
    </div>
  );
};

export default Perfil;
