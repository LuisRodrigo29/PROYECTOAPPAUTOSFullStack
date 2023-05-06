import express from "express";
const router = express.Router();
import {agregarVehiculo, obtenerVehiculos,obtenerVehiculo, actualizarVehiculo, eliminarVehiculo} from '../controllers/vehiculosController.js'
import checkAuth from "../middleware/authMiddleware.js"


// se definen los diferentes endpoints

router.route('/')
.post( checkAuth, agregarVehiculo) // registra vehiculos 
.get(checkAuth, obtenerVehiculos) // lista vehiculos 


//obtener  un vehiculo en especifico 
router
    .route("/:id") // id del vehiculo
    .get(checkAuth, obtenerVehiculo)
    .put(checkAuth, actualizarVehiculo)
    .delete(checkAuth, eliminarVehiculo)


export default router;
