import Clientes from "../models/Clientes.js";


const agregarCliente = (req, res) => {

    const cliente = new Clientes(req.body); // instancia del objeto de cliente
    
    try {
        
    } catch (error) {
        console.log(error)
    }
};
const obtenerClientes = (req, res) => {};



export {agregarCliente, obtenerClientes};