import React, { useEffect, useState } from 'react';
import { getUsuario, postPerfil } from '../api/usuario';
import { useAuth } from '../auth/AuthProvider';

interface Carrera {
  id: string;
  nombre: string;
}

export interface Usuario {
  id: string;
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
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await postPerfil(usuarioId, file);
      //alert("Foto de perfil subida exitosamente");
      const response = await getUsuario(usuarioId);
      
      setUsuario(response?.data);
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error);
      setError("No se pudo subir la foto de perfil");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuario(usuarioId);
        console.log('Nuevo perfilUrl:', response?.data);
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
          <div className="flex flex-col md:flex-row items-center w-full bg-white p-6 rounded-lg shadow-lg mb-6 relative">
            {/* Imagen de perfil con actualización */}
            <div className="relative group">
              <img
                src={usuario?.perfilUrl ? `${usuario.perfilUrl}?t=${new Date().getTime()}` : 'sinPerfil.png'}
                alt={`Perfil de ${usuario.nombre}`}
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-2 border-gray-300"
              />
              {/* Overlay y botón para actualizar */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <label
                  htmlFor="upload-photo"
                  className="text-white text-center font-medium text-sm cursor-pointer"
                >
                  Actualizar <br /> Foto
                </label>
                <input
                  type="file"
                  id="upload-photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
            {/* Información del usuario */}
            <div className="flex-1 ml-6">
              <h2 className="text-2xl text-gray-700 font-bold mb-2">
                <b>Nombre:</b> {usuario.nombre}
              </h2>
              <p className="text-gray-700 font-bold mb-2">
                <b>Email:</b> {usuario.email}
              </p>
              <div className="text-right text-gray-500">
                <p className="text-sm">Registrado:</p>
                <p className="text-sm font-medium">
                  {new Date(usuario.fechaRegistro).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          {/* Carreras inscritas */}
          <div className="carreras-usuario w-full mb-6">
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
