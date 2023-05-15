import { Outlet, Navigate } from "react-router-dom" // con Navigate se protege la ruta 
import Header from "../components/Header"

import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {


    const { auth, cargando } = useAuth() // se extrae la información del context

    if(cargando) return 'Cargando...'
  return (
    <>
        <Header />
      

    {/* En caso de que el usuario este autenticado muestra el Outlet sino se redirige a iniciar sesión */}
    {auth?._id ? (
      <main className="container mx-auto mt-10"> <Outlet />  </main>

      ): <Navigate to="/" />} 
        
    </>
  )
}

export default RutaProtegida