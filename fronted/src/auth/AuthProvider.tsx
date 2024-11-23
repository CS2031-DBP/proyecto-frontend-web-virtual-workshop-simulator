import React, { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps{
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }

const  AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    }
)

export function AuthProvider({children}: AuthProviderProps){
    const[isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    },[])

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };


    return (<AuthContext.Provider value={{isAuthenticated, login, logout}}>
        {children}
        </AuthContext.Provider>
        );

}

export const  useAuth = () => useContext(AuthContext);