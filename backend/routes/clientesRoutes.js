import express from 'express';
const router = express.Router();
import { agregarCliente, obtenerClientes, obtenerCliente, actualizarCliente, eliminarCliente} from '../controllers/clientesController.js';
import checkAuth from '../middleware/authMiddleware.js';

//aqui se define el cuerpo de las diferentes rutas (endpoint)
router.route('/')
    .post(checkAuth, agregarCliente) //Registro los pacientes 
    .get(checkAuth, obtenerClientes) //lista los clientes 


//obtener un cliente en especifico
router
    .route("/:id") // id del cliente
    .get(checkAuth, obtenerCliente)
    .put(checkAuth, actualizarCliente)
    .delete(checkAuth, eliminarCliente)


export default router;
