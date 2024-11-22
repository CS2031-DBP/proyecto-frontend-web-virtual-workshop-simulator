import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Inicio from "../page/Inicio";
import Login from "../componentes/Login";
import Register from "../componentes/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../page/Dashboard";
import NotFound from "../page/NotFound";
import App from "../App";

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
          element: <Dashboard />
        }
      ]
    }
  ])