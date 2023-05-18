import{ useState, useEffect} from 'react'
import Alerta from './Alerta'
import useVehiculos from '../hooks/useVehiculos'

const FormularioV = () => {
    //Obteniendo datos del formulario
    const [ marca, setMarca] = useState('')
    const [ placa, setPlaca] = useState('')
    const [ year, setYear] = useState('')
    const [ color, setColor] = useState('')
    const [ puestos, setPuestos] = useState('')
    const [ estado, setEstado] = useState('')
    const [ precio, setPrecio] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarVehiculo,vehiculo } = useVehiculos()
 
    useEffect(() =>{ // trae lo datos de la tabla al formulario para ser editados
        if(vehiculo?.marca){
                setMarca(vehiculo.marca)
                setPlaca(vehiculo.placa)
                setYear(vehiculo.year)
                setColor(vehiculo.color)
                setPuestos(vehiculo.puestos)
                setEstado(vehiculo.estado)
                setPrecio(vehiculo.precio)
                setId(vehiculo._id)
        }
    }, [vehiculo])
  


    const handleSubmit = e =>{
        e.preventDefault()

        //Validacion Formulario 
        if([marca, placa, year, color, puestos, estado, precio, ].includes('')){
            setAlerta({
                msg:'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

      
        guardarVehiculo({marca, placa, year, color, puestos, estado, precio, id})

        setAlerta({ 
                msg: 'Guardado Correctamente'
            });
            // se quita la alerta despues de 3 segundos
            setTimeout(() => {
                setAlerta(false);
            }, 3000);

        //Reiniciar el formulario de vehiculos 
        setMarca('')
        setPlaca('')
        setYear('')
        setColor('')
        setPuestos('')
        setEstado('')
        setPrecio('')
        setId('')
    }


    const{msg} = alerta
  return (

    
    <>
    <p className="text-lg text-center  mb-5 font-bold"> Registra los vehículos y {' '}
    <span className="text-[#35B0F5] font-bold "> Administra</span>
    </p>
    
    <form
    className="bg-white py-10 px-2 mb-5 lg:mb-0 shadow-md rounded-md "
    onSubmit={handleSubmit}
    >
    <div className="mb-4 px-6 ">
            <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="marca">Marca</label>
            <input 
            className="border-2 border-gray-400 rounded-md   w-full p-2 mt-2 placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#82CCF5]"
            id="marca"
            name="marca"
            type="text"
            placeholder="Marca Vehículo"
            value={marca}
            onChange={e => setMarca(e.target.value)}
            />
    </div>

    <div className="mb-4 px-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placa">Placa</label>
            <input 
           className="border-2 border-gray-400 rounded-md   w-full p-2 mt-2 placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#82CCF5] "
            id="placa"
            name="placa"
            type="text"
            placeholder="Placa Vehículo"
            value={placa}
            onChange={e => setPlaca(e.target.value)}
            />
    </div>

    <div className="mb-4 px-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">Año</label>
            <input 
           className="border-2 border-gray-400 rounded-md   w-full p-2 mt-2 placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#82CCF5]"
            id="year"
            name="year"
            type="Date"
            placeholder="Año Vehículo"
            value={year}
            onChange={e => setYear(e.target.value)}
            />
    </div>
    <div className="mb-4 px-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Color</label>
            <input 
           className="border-2 border-gray-400 rounded-md   w-full p-2 mt-2 placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#82CCF5]"
            id="color"
            name="color"
            type="text"
            placeholder="Color Vehículo"
            value={color}
            onChange={e => setColor(e.target.value)}
            />
    </div>
    <div className="mb-4 px-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="puestos">Puestos</label>
            <input 
           className="border-2 border-gray-400 rounded-md   w-full p-2 mt-2 placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#82CCF5]"
            id="puestos"
            name="puestos"
            type="text"
            placeholder="Puestos Vehículo"
            value={puestos}
            onChange={e => setPuestos(e.target.value)}
            />
    </div>

    <div className="mb-4 px-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">Estado</label>
            <input 
           className="border-2 border-gray-400 rounded-md   w-full p-2 mt-2 placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#82CCF5]"
            id="estado"
            name="estado"
            type="text"
            placeholder="Estado Vehículo"
            value={estado}
            onChange={e => setEstado(e.target.value)}
            />
    </div>
    
    <div className="mb-4 px-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
            <input 
           className="border-2 border-gray-400 rounded-md   w-full p-2 mt-2 placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#82CCF5]"
            id="precio"
            name="precio"
            type="text"
            placeholder="Precio Vehículo"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            />
             
    </div>

    <input type="submit" 
            className="bg-[#35B0F5] hover:bg-[#265E6D] cursor-pointer transition-colors items-center mt-5 p-2 w-full text-white uppercase font-bold border rounded focus:ring focus:ring-[#82CCF5] mb-2"
            value={id ? 'Guardar Cambios':"Agregar vehículo"  }  // aqui cambia el estado del boton dependiendo si estoy editando o agregando un nuevo vehiculo
    />
    
    {msg && <Alerta alerta={alerta} />}
   
    </form>
    
    </>
  )
}

export default FormularioV