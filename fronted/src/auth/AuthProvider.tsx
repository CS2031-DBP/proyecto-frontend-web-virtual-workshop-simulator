import React, { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps{
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    usuarioId: string | null;
    login: (id: string, token: string) => void;
    logout: () => void;
  }

const  AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    usuarioId: null,
    login: () => {},
    logout: () => {},
    }
)

export function AuthProvider({children}: AuthProviderProps){
    const[isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [usuarioId, setUsuarioId] = useState<string | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      const storedUsuarioId = localStorage.getItem("usuarioId");
  
      setIsAuthenticated(!!token);
      setUsuarioId(storedUsuarioId);
    },[])

    const login = (id: string, token: string) => {
      //console.log("Autprovide", token, id);
      localStorage.setItem("token", token);
      //localStorage.setItem("usuarioId", id);
      setIsAuthenticated(true);
      setUsuarioId(id);
    };

    const logout = () => {
      localStorage.removeItem("token");
      //localStorage.removeItem("usuarioId");
      setIsAuthenticated(false);
      setUsuarioId(null);
      
    };


    return (<AuthContext.Provider value={{ isAuthenticated, usuarioId, login, logout }}>
        {children}
        </AuthContext.Provider>
        );

}

export const  useAuth = () => useContext(AuthContext);