import mongoose from "mongoose";


const clientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    documento: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
    },
    licencia: {
        type: String,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuarios' //asi se puede traer la informacion del usuario que esta manejando los datos del cliente en ese momento 
    },
},{
    timestamps: true  //asi crea las columnas de editado y creado
});

const Clientes = mongoose.model('Clientes', clientesSchema ) // Guarda la referencia del modelo y la forma que van a tener los datos 

export default Clientes; // para importar en los controladores