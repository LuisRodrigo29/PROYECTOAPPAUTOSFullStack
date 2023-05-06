import mongoose from "mongoose";

const vehiculosSchema = mongoose.Schema({

    marca: {
        type: String,
        required: true
    },
   placa: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    color: {
        type: String,
        required: true
    },
    puestos: {
        type: String,
        required: true
    },
   estado: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuarios' //asi se puede traer la informacion del usuario que esta manejando los datos del cliente en ese momento 
    },
},{timestamps: true}); //Crea las columnas de editador y creador 


const  Vehiculos = mongoose.model('Vehiculos', vehiculosSchema); //Guarda la refencia del modelo y la forma de los datos 


export default  Vehiculos;