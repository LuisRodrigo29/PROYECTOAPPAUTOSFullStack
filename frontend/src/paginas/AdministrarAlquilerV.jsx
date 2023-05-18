
import {useState} from 'react'
import FormularioV from "../components/FormularioV"
import ListadoV from "../components/ListadoV"

const AdministrarAlquilerV = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  return (
   <div className="flex flex-col md:flex-row">
    <button type='button ' className='bg-[#35B0F5] text-white font-bold uppercase mx-10 p-1 rounded-md mb-5 md:hidden'
    onClick={() => setMostrarFormulario(!mostrarFormulario)}
    >
      {mostrarFormulario ? 'Ocultar Formulario': 'Mostrar Formulario'}
    </button>

    {/* ocultar y mostrar formulario */}
    <div className={` ${mostrarFormulario ? 'block': 'hidden' } md:block md:w-1/2 lg:w-1/5`}> 
      <FormularioV/>

    </div>

    <div className="md:w-1/2 lg:w-4/5" >

    <ListadoV/>
    </div>
   </div>
  )
}

export default AdministrarAlquilerV