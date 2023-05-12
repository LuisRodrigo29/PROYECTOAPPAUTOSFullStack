import{ useEffect, useState } from 'react'
import{ useParams, Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const { id } = params

  useEffect(()=>{
    const confirmarCuenta = async () =>{

      try {
        const url = `/usuarios/confirmar/${id}`
        const {data } = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
        // console.log(data)

      } catch (error) {
       setAlerta(( {
        msg: error.response.data.msg,
        error:true
       }))  
      }

      setCargando(false)
    }
    confirmarCuenta()
  }, [])

    return (
      <>
      <div>
              <h1 className="text-[#3BB2F4] font-black text-4xl"> 
                 Confirma tu Cuenta y Comienza a Administrar {""}  <span className="text-black" >El  Alquiler de Vehículos </span> 
              </h1>
        </div>

        <div className='mt-18 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-xl'  >
           
           { !cargando &&   
           <Alerta
            alerta={alerta}
           /> }
           
           {cuentaConfirmada && (
            <Link 
            className='block text-center my-5 text-gray-500 hover:text-[#F5B82E] '
            to="/">Iniciar Sesión</Link>
           )}
         </div>
              
      
      
      </>
  
    )
  }
  
  export default ConfirmarCuenta