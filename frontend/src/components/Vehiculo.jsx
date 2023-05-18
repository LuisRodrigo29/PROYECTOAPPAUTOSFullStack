
import React, { useContext } from 'react';
import VehiculosContext from '../context/VehiculosProvider';
import useVehiculos from '../hooks/useVehiculos'

const Vehiculo = ({ vehiculo }) => {


  const {setEdicion, eliminarVehiculo } = useVehiculos()

  const{_id} = vehiculo  //extrae la informacion del id 
    const formatearFecha = (fecha) => {
        let nuevaFecha
        if (fecha.includes('T00:00:00.000Z')) {
          nuevaFecha = new Date(fecha.split('T')[0].split('-'))
        } else {
          nuevaFecha = new Date(fecha)
        }
        const opciones = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
        return nuevaFecha.toLocaleDateString('es-ES', opciones)
      }

    return (
      
      <tr className="border-b border-gray-300" > 
        <td >{vehiculo.marca}</td>
        <td>{vehiculo.placa}</td>
        <td>{formatearFecha(vehiculo.year)}</td>
        <td>{vehiculo.color}</td>
        <td>{vehiculo.puestos}</td>
        <td>{vehiculo.estado}</td>
        <td>{vehiculo.precio}</td>
        <td ><div><button className='text-green-600' type='button ' onClick={()=> setEdicion(vehiculo)}>Editar</button> </div> <div><button className='text-red-700' 
        onClick={() => eliminarVehiculo(_id) }>
          Eliminar</button></div></td>
      </tr>
     
    );
  };
  
export default Vehiculo;
