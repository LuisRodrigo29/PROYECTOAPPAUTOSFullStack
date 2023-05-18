import Usuarios from "../models/Usuarios.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";


//ordenar el routing 
const registrar = async (req, res) => {
    //req.body tiene la informacion 
    const { email, nombre} = req.body //Extraigo informacion, body para leer informacion de formularios

    //Prevenir usuarios duplicados
    const existeUsuario = await Usuarios.findOne({email})
    if(existeUsuario){
        const error = new Error("El usuario ya ha sido registrado");// se crea una instancia 
        return res.status(400).json({msg: error.message}) // se genera un error para que el codigo detenga la ejecución 
    }

    try {
        //Guardar un Nuevo Usuario
        const usuario = new Usuarios(req.body); //instancia
        const usuarioGuardado = await usuario.save() // se almacena en la BD

        // Enviar el email 
        emailRegistro({
          email,
          nombre,
          token:usuarioGuardado.token 
        })

        res.json(usuarioGuardado);
    } catch (error) {
        console.log(error)
    }

    
};

const perfil = (req, res) =>{
    //acceder a la informacion del usuario autenticado 
    const {usuario} = req; // lo que esta almacenado en el servidor 

    res.json( usuario); // se retorna la información 
};

const confirmar = async (req, res) => {
    
    //obteniendo token de la BD 
    const {token} = req.params //params sirve  para leer datos de la url  

    //Buscando usuario que tenga el token de la BD 
    const usuarioConfirmar = await Usuarios.findOne({token: token});

    // validacion para ver si el token existe o no 
    if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message});
  }

  try {
    //se modifica y almacena 
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true; 
    await usuarioConfirmar.save();

    res.json({msg:"Usuario confirmado "});
    
  } catch (error) {
    console.log(error);
  }    
};

const autenticar  = async (req, res, next) => {

  const {email, password} = req.body;

// Coborra si el usuario existe 
const usuario = await Usuarios.findOne({email});

if (!usuario) {
  res.status(404).json({ msg: "El usuario no existe" });
  return next();
}

//Comprueba si el usuario esta confirmado 

if(!usuario.confirmado){
  res.status(403).json({ msg: "Tu cuenta no ha sido confirmada" })
  return next();
}

//Revisa que el password sea el correcto 
const passwordCorrecto = await usuario.comprobarPassword(password);
if(passwordCorrecto){
  

 //Autenticar 
 res.json({
  _id: usuario._id,
  nombre: usuario.nombre,
  email:usuario.email,
  token:generarJWT(usuario.id),

 });
 
} else{
  const error = new Error('Contraseña incorrecta ')
  return res.status(403).json({msg: error.message})
}
};


const olvidePassword = async (req, res) => {
  const {email} = req.body; 
  // console.log(email) // probando el endpoint

  const existeUsuario = await Usuarios.findOne({email});
  if(!existeUsuario){
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message});
  }
 
  try {
    existeUsuario.token =  generarId();
    await existeUsuario.save(); // se guarda en la base de datos 

    //Enviar Email con instrucciones 
    emailOlvidePassword({
      email,
      nombre: existeUsuario.nombre,
      token: existeUsuario.token,
    })

    res.json({ msg: "Se ha enviado un email con las instrucciones"});
  } catch (error) {
    console.log(error)
  }

};

const comprobarToken = async(req, res) => {
  const {token} = req.params // informacion de la URL 

  const tokenValido = await Usuarios.findOne({token});
 
  if(tokenValido){
    // token valido el usurio existe
    res.json({msg:'Token válido y el usuario existe'});
  }else{
    const error = new Error('Token no válido')
    return res.status(400).json({ms: error.message})
  }
};

const nuevoPassword =  async (req, res) => {

  const {token} = req.params;
  const {password} = req.body;

  const usuario = await Usuarios.findOne({ token })
  if(!usuario){
    const error = new Error('Hubo un error');
    return res.status(400).json({msg: error.message});
  }

  try {
    usuario.token = null;
    usuario.password = password;
    await usuario.save();
    res.json({msg: "Contraseña modificada correctamente"});
  } catch (error) {
    console.log(error)
  }

};

export {registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } //se abren llaves porque va a ser un objeto  donde se pueden exportar multiples funciones
 
