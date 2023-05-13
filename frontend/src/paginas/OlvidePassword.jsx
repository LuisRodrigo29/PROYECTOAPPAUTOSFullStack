import {useState} from 'react'
import{Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {
// definiendo el state
const [email, setEmail] = useState('')
const[alerta, setAlerta] = useState({})



const handleSubmit = async (e) =>{ // hace el llamado a la api 
  e.preventDefault()

  if(email === '' || email.length < 6){

    setAlerta({msg: 'El Correo es obligatorio', error: true})
    return
  }

  try {
    const {data} = await clienteAxios.post('/usuarios/olvide-password', {email})

    setAlerta({msg: data.msg})
    
  } catch (error) {
     setAlerta({
      msg: error.response.data.msg,
      error: true 
     })
  }
}

const {msg} = alerta

  return (
    <>
     <div>
        <h1 className="text-[#3BB2F4] font-black text-4xl"> 
       Recupera tu Acceso a <span className="text-black" > Alquiler de Vehículos </span> 
        </h1>
        </div>


        <div className='mt-18 md:mt-5 px-5 py-2'  >
           <img  className="mx-auto h-12 w-auto mt-5" src="src/img/logo.png" alt="logo" />
           
           <form className="shadow-2xl p-4 border rounded-xl bg-white " 
           onSubmit={handleSubmit}>
           {  msg &&  < Alerta
              alerta={alerta}
            />} 

           <div class="mb-4">
                <label className="  mt-8 text-center block text-gray-800 text-xl font-bold" >Ingresa tu correo electrónico</label>
                <label className=" uppercase mt-8 text-center block text-gray-800 text-xl font-bold" >correo empresa</label>
                <input 
                className="mt-3  border rounded-xl w-full p-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:ring-[#82CCF5]" 
                id="email"
                name="email"
                type="email" 
                placeholder="Correo Empresa"
                value={email}
                onChange={ e => setEmail(e.target.value)} //lee los datos ingresados por el formulario
                />
                
             
              </div>

              <div className='flex justify-center items-center'> 
                    <input 
                    type="submit"
                    value="Enviar Instrucciones"
                    className=" uppercase w-full bg-[#35B0F5] hover:cursor-pointer hover:bg-[#265E6D] 
                    relative justify-center p-3 px-10 mt-4 text-white font-bold border rounded-xl focus:ring focus:ring-[#82CCF5] md:w-auto " 
                    >
                  </input>
              </div>

              <nav className='mt-10 lg:flex  lg:justify-between'>
                <Link 
                className='block text-center my-5 text-gray-500 hover:text-[#F5B82E] '
                to="/">¿Ya tienes cuenta? Inicia Sesión</Link>
                <Link
                className='block text-center my-5 text-gray-500 hover:text-[#F5B82E] '
                to="/registrar">¿No tienes una cuenta? Registrate</Link>
            </nav>
              </form>
              
              </div>

    
    </>

  )
}

export default OlvidePassword