import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

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
        default: generarId(),
    },
    confirmado:{
        type: Boolean, 
        default: false // cambia una vez que el usuario visite la cuenta y confirmen el token 
    }
});

//Antes de almacenar el registro se hashea el password
UsuarioSchema.pre('save', async function (next) {

    //Valida si un password ya esta hasheado para que no lo vuelva a hashear para que el usuario se pueda autenticar luego 
    if(!this.isModified('password')){
     next();
    
    }

    //Si un password ya esta hasheado lo almacena en la base de datos 
    const salt = await bcrypt.genSalt(10)
    this.password =  await bcrypt.hash(this.password, salt)// reescribe la propiedad del objeto 
} );

//comprobar el password 
UsuarioSchema.methods.comprobarPassword = async function(password){ // El primero es el password que pasan en el formulario
    try {
        const resultado = await bcrypt.compare(password, this.password); // this.password es el del hasheo
        return resultado;
    } catch (error) {
        console.log(error)
    }
};

//Registro de modelo en mongoose 
const Usuarios = mongoose.model("Usuarios", UsuarioSchema);
export default Usuarios;