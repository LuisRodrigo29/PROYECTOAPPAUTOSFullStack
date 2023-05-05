import express from 'express';
const router = express.Router();
import { agregarCliente, obtenerClientes} from '../controllers/clientesController.js'

//aqui se define el cuerpo de los diferentes rutas (endpoint)
router.route('/')
    .post(agregarCliente) //Registro los pacientes 
    .get(obtenerClientes) //lista los clientes 

export default router;
