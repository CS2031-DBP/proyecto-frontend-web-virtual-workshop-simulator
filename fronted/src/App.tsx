import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/Navbar'
import Inicio from './page/Inicio'

function App() {
  return (
   <div>
    <Navbar />
    <Inicio />
   </div> 
  )
}

export default App
