import React, { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const VehiculosContext = createContext();

export const VehiculosProvider = ({ children }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculo, setVehiculo] = useState({})

  // Obtener vehículos al cargar
  useEffect(() => {
    const obtenerVehiculos = async () => {

   

      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        const { data } = await clienteAxios('/vehiculos', config);
        setVehiculos(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerVehiculos();
  }, []);

  // Guardar vehículo en la base de datos
  const guardarVehiculo = async (vehiculo) => {

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

       //Editar vehiculo
       if(vehiculo.id){ 
        try {
           //se actualiza el vehiculo con el metodo PUT que se configuro en el backend
          const {data}= await clienteAxios.put(`/vehiculos/${vehiculo.id}`, vehiculo, config)

          //Sincronizando datos con a tabla de registros vehiculos 
          const vehiculosActualizado = vehiculos.map( vehiculoState => vehiculoState._id === data._id ? data : vehiculoState)
          setVehiculos(vehiculosActualizado)

        } catch (error) {
          console.log(error)
        }
      }else{ // Agregar Nuevo Registro   
          try {
            const { data } = await clienteAxios.post('/vehiculos', vehiculo, config);

            // Extraer solo las propiedades necesarias del vehículo almacenado
            const { createdAt, updatedAt, __v, ...vehiculoAlmacenado } = data;

            setVehiculos([vehiculoAlmacenado, ...vehiculos]);
          } catch (error) {
            console.log(error.response.data.msg);
          }
      }

    

  };

  //Editar información de vehiculos 
  const setEdicion =(vehiculo) =>{

    setVehiculo(vehiculo)
  }


//   //Elimar informacion de la tabla de vehiculos 
//   const eliminarVehiculo = async id =>{

//   const confirmar = confirm('¿Desea eliminar el registro?') 

//  if(confirmar){
//   try {
//     const token = localStorage.getItem('token');
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       }}

//       const {data} = await clienteAxios.delete(`/vehiculos/${id}`, config)
//       console.log(data)
//   } catch (error) {
//     console.log(error)
//   }

//  }
//   }


  return (
    <VehiculosContext.Provider value={{ vehiculos, guardarVehiculo, setEdicion, vehiculo,  }}>
      {children}
    </VehiculosContext.Provider>
  );
};

export default VehiculosContext;


