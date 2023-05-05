import Clientes from "../models/Clientes.js";


const agregarCliente = async (req, res) => {

    const cliente = new Clientes(req.body); // instancia del objeto de cliente
    cliente.usuario = req.usuario._id; // se trae el id del usuario que fue previamente registrado
    try {
        const clienteAlmacenado  = await  cliente.save(); // guardar en la BD
        res.json(clienteAlmacenado);
    } catch (error) {
        console.log(error)
    }
};
const obtenerClientes = async (req, res) => {
    // se filtran los clientes que hayan manipulado un usuario que ha iniciado sesión
    const clientes = await Clientes.find()
    .where("usuario")
    .equals(req.usuario);

    res.json(clientes);   
};


//Obtener cliente en especifico 
const obtenerCliente = async (req, res) => { 
    const {id} = req.params;
    const cliente = await Clientes.findById(id);

    if(!cliente){
      return  res.status(404).json({msg: 'No se ha encontrado'})
    }

    // validar si el usuario que ingreso al cliente es el que esta accediendo a la información 
    if(cliente.usuario._id.toString() !== req.usuario._id.toString()){
       return res.json({msg:'Acción invalidada'})
    }

   
        res.json(cliente);
    
};  

const actualizarCliente = async (req, res) => {
    const {id} = req.params;
    const cliente = await Clientes.findById(id);
    
    if(!cliente){
      return  res.status(404).json({msg: 'No se ha encontrado'})
    }

    // validar si el usuario que ingreso al cliente es el que esta accediendo a la información 
    if(cliente.usuario._id.toString() !== req.usuario._id.toString()){
       return res.json({msg:'Acción invalidada'})
    }

    //Actualizar Cliente  leemos datos y se guardan 
    cliente.nombre = req.body.nombre || cliente.nombre; // en caso de que un valor no se actualice mantiene el valor que tenia previamente 
    cliente.documento = req.body.documento || cliente.documento;
    cliente.email = req.body.email || cliente.email;
    cliente.telefono = req.body.telefono || cliente.telefono;
    cliente.direccion = req.body.direccion || cliente.direccion;
    cliente.licencia = req.body.licencia || cliente.licencia;

    try {
        const clienteActualizado = await cliente.save();  // guarda los cambios en la BD 
        res.json(clienteActualizado);
    } catch (error) {
        console.log(error);
    }
};   
const eliminarCliente = async (req, res) => {
    const {id} = req.params;
    const cliente = await Clientes.findById(id);
    
    if(!cliente){
      return  res.status(404).json({msg: 'No se ha encontrado'})
    }

    // validar si el usuario que ingreso al cliente es el que esta accediendo a la información 
    if(cliente.usuario._id.toString() !== req.usuario._id.toString()){
       return res.json({msg:'Acción invalidada'})
    }

    try {
        await cliente.deleteOne();
        res.json({msg: "Cliente Eliminado"})
    } catch (error) {
        console.log(error)
    }


};   



export {agregarCliente, obtenerClientes, obtenerCliente, actualizarCliente, eliminarCliente};