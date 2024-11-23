import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Inicio from "../page/Inicio";
import Login from "../componentes/Login";
import Register from "../componentes/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../page/Dashboard";
import NotFound from "../page/NotFound";
import App from "../App";
import ListCarreras from "../componentes/ListCarreras";
import ListCursos from "../componentes/ListCursos";
import Carpeta from "../page/Carpeta";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Inicio />,
      
    },
    {
      path: "/login",
      element: <Login /> 
    },
    {
      path: "/register",
      element: <Register /> 
    },
    {
        path: "/notFound",
        element: <NotFound /> 
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "carrera/:carreraId", 
          element: <Carpeta />
        }
      ]
    }
  ])