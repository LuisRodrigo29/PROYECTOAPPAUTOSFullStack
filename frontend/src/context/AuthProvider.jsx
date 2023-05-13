// desde aqui nace todo el estado global de la aplicación osea aqui viven los datos 
// Autenticacion del usuario
import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) =>{ // en el children estan todos los componentes que estan dentro del authprovider del archivo App.jsx
// se define el State que va a estar disponible de forma global 

const [ auth, setAuth] = useState({})

return(
    // este retorna el provider
    <AuthContext.Provider
        value={{
            auth,
            setAuth
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