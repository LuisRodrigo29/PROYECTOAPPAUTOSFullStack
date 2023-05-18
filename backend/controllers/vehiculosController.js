import Vehiculos  from "../models/Vehiculos.js";



const agregarVehiculo = async (req, res) => {

    const vehiculo = new Vehiculos(req.body); // instancia del objeto de vehiculo
    vehiculo.usuario = req.usuario._id; // se trae el id del usuario que fue previamente registrado
    try {
        const vehiculoAlmacenado  = await  vehiculo.save(); // guardar en la BD
        res.json(vehiculoAlmacenado);
    } catch (error) {
        console.log(error)
    }
};
const obtenerVehiculos = async (req, res) => {
    // se filtran los vehiculos que hayan manipulado un usuario que ha iniciado sesión
    const vehiculos = await Vehiculos.find()
    .where("usuario")
    .equals(req.usuario);

    res.status(200).json(vehiculos);   
};


//Obtener vehicuo en especifico 
const obtenerVehiculo= async (req, res) => { 
    const {id} = req.params;
    const vehiculo = await Vehiculos.findById(id);

    if(!vehiculo){
      return  res.status(404).json({msg: 'No se ha encontrado'})
    }

    // validar si el usuario que ingreso al vehiculo es el que esta accediendo a la información 
    if(vehiculo.usuario._id.toString() !== req.usuario._id.toString()){
       return res.json({msg:'Acción invalidada'})
    }

   
        res.json(vehiculo);
    
};  

const actualizarVehiculo = async (req, res) => {
    const {id} = req.params;
    const vehiculo = await Vehiculos.findById(id);
    
    if(!vehiculo){
      return  res.status(404).json({msg: 'No se ha encontrado'})
    }

    // validar si el usuario que ingreso al vehiculo es el que esta accediendo a la información 
    if(vehiculo.usuario._id.toString() !== req.usuario._id.toString()){
       return res.json({msg:'Acción invalidada'})
    }

    //Actualizar vehiculo  leemos datos y se guardan 
    vehiculo.marca = req.body.marca || vehiculo.marca; // en caso de que un valor no se actualice mantiene el valor que tenia previamente 
    vehiculo.placa = req.body.placa || vehiculo.placa;
    vehiculo.year = req.body.year || vehiculo.year;
    vehiculo.color = req.body.color || vehiculo.color;
    vehiculo.puestos = req.body.puestos || vehiculo.puestos;
    vehiculo.estado = req.body.estado || vehiculo.estado;
    vehiculo.precio = req.body.precio || vehiculo.precio;

    try {
        const vehiculoActualizado = await vehiculo.save();  // guarda los cambios en la BD 
        res.json(vehiculoActualizado);
    } catch (error) {
        console.log(error);
    }
};   
const eliminarVehiculo= async (req, res) => {
    const {id} = req.params;
    const vehiculo = await Vehiculos.findById(id);
    
    if(!vehiculo){
      return  res.status(404).json({msg: 'No se ha encontrado'})
    }

    // validar si el usuario que ingreso al vehiculo es el que esta accediendo a la información 
    if(vehiculo.usuario._id.toString() !== req.usuario._id.toString()){
       return res.json({msg:'Acción invalidada'})
    }

    try {
        await vehiculo.deleteOne();
        res.json({msg: "Vehiculo Eliminado"})
    } catch (error) {
        console.log(error)
    }


};   



export {agregarVehiculo, obtenerVehiculos, obtenerVehiculo, actualizarVehiculo, eliminarVehiculo};