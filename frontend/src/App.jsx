 //BrowserRouter engloba a todo 
 // Routes permite agrupar diferentes rutas 
 //Route para una ruta en especifico 
 //Aqui es donde enruto las paginas creadas
import {BrowserRouter, Routes, Route} from 'react-router-dom'


//LAYOUT
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

//PAGINAS
import Login from './paginas/login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword'
import AdministrarAlquilerV from './paginas/AdministrarAlquilerV'

//CONTEXT
import { AuthProvider } from './context/AuthProvider'
import { VehiculosProvider } from './context/VehiculosProvider'

function App() {




  return (
    <BrowserRouter>
    <AuthProvider> 
      <VehiculosProvider>
      <Routes >
        <Route path='/' element={<AuthLayout/>}>  
                 <Route index element={<Login/>} />
                 <Route path='registrar' element={<Registrar/>} />
                 <Route path='olvide-password' element={<OlvidePassword/>} />
                 <Route path="olvide-password/:token" element={<NuevoPassword/>} />
                 <Route path="confirmar/:id" element={<ConfirmarCuenta/>} />
                
        </Route>

          <Route path='/admin' element={<RutaProtegida />}>
            <Route index element={<AdministrarAlquilerV />} />
         

          </Route>
      </Routes>
      </VehiculosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
