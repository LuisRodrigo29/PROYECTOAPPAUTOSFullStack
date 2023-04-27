import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true, // para tener validación en el servidor
        trim: true // para eliminar espacios
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true,
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
})