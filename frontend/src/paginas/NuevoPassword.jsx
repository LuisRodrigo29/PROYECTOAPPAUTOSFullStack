import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'


const NuevoPassword = () => {

    const[password, setPassword] = useState('')
    const[alerta, setAlerta] = useState({})
    const[tokenValido, setTokenValido] = useState(false)
    const[passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() =>{
        const  comprobarToken = async () =>{

            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setAlerta({
                    msg:'Escribe Tu Nueva Contraseña'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Se ha presentado un error con el enlace',
                    error: true
                })
            }

        }

        comprobarToken()

    }, [])

    const handleSubmit = async (e) =>{ // hace el llamado a la api 
        e.preventDefault()

        if(password.length < 8){

            setAlerta({
                msg: 'La contraseña debe ser mínimo de 8 caracteres',
                error: true
            })
            return
        }

        try {
            const url = `/usuarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, {password})
            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }
    }      

    const { msg}= alerta
  return (
    <>
         <div>
            <h1 className="text-[#3BB2F4] font-black text-4xl"> 
                        Reestablece tu contraseña  al administrador <span className="text-black" > Alquiler de Vehículos </span> 
            </h1>
         </div>

        <div className='mt-20 md:mt-5 px-5 py-6 shadow-2xl p-4 border rounded-xl bg-white'  >
        
                
                    {msg &&  < Alerta
                    alerta={alerta}
                    />} 
                 
                  {tokenValido &&(

                    <>
                    <form  onSubmit={handleSubmit} >
                            <div className="mb-4">
                                    <label className=" uppercase mt-8 text-center block text-gray-800 text-xl font-bold" >Nueva Contraseña</label>
                                    <input 
                                    className="mt-3  border rounded-xl w-full p-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:ring-[#82CCF5]" 
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Tu Nueva Contraseña"
                                    value={password}
                                    onChange={ e => setPassword(e.target.value)}
                                    />
                        
                        <div className='flex justify-center items-center'> 
                                    <input 
                                            type="submit"
                                            value="Guardar Nueva contraseña "
                                            className=" uppercase w-full bg-[#35B0F5] hover:cursor-pointer hover:bg-[#265E6D] 
                                            relative justify-center p-3 px-10 mt-4 text-white font-bold border rounded-xl focus:ring focus:ring-[#82CCF5] md:w-auto  " 
                                            >
                                    </input>

                            </div>
                            </div>
                    </form>

                </>
                  )}

                    {passwordModificado && 
                        <Link 
                        className='block text-center my-5 text-gray-500 hover:text-[#F5B82E] '
                        to="/"> Iniciar Sesión</Link> 
                    }
                
                
            </div>
</>
  )
}

export default NuevoPassword