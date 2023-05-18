// desde aqui nace todo el estado global de la aplicación osea aqui viven los datos 
// Autenticacion del usuario
import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({children}) =>{ // en el children estan todos los componentes que estan dentro del authprovider del archivo App.jsx
// se define el State que va a estar disponible de forma global 
const[cargando, setCargando] = useState(true)
const [ auth, setAuth] = useState({})

useEffect(() =>{

        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')
           if(!token){

            setCargando(false)
            return

           }

          const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
          }

          try { 
            const{ data } = await clienteAxios('/usuarios/perfil', config)
             setAuth(data)
          } catch (error) {
            console.log(error.response.data.msg)
            setAuth({})
          }

          setCargando(false)
        }

        autenticarUsuario()
}, [])

const cerrarSesion = ( ) =>{
    localStorage.removeItem('token')
    setAuth({})
}

return(
    // este retorna el provider y se hace disponible a otros componentes
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando,
            
            cerrarSesion
        }}
    >
        {children} 
    </AuthContext.Provider>
)

}

export {
    AuthProvider
}


export default AuthContext