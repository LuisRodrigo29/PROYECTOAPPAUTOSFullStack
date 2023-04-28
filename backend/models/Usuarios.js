import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    //Objeto con la estructura de este modelo 
    nombre:{
        type: String,
        required: true, // para tener validación en el servidor
        trim: true // para eliminar espacios
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true, // para garantizar que se utiliza un email por cuenta 
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    token:{
        type: String,
        
    },
    confirmado:{
        type: Boolean, 
        default: false // cambia una vez que el usuario visite la cuenta y confirmen el token 
    }
});

//Registro de modelo en mongoose 
const Usuarios = mongoose.model()
