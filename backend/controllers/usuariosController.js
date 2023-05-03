import Usuarios from "../models/Usuarios.js";



//ordenar el routing 
const registrar = async (req, res) => {
    //req.body tiene la informacion 
    const { email} = req.body //Extraigo informacion, body para leer informacion de formularios

    //Prevenir usuarios duplicados
    const existeUsuario = await Usuarios.findOne({email: email})
    if(existeUsuario){
        const error = new Error("El usuario ya ha sido registrado");// se crea una instancia 
        return res.status(400).json({msg: error.message}) // se genera un error para que el codigo detenga la ejecución 
    }

    try {
        //Guardar un Nuevo Usuario
        const usuario = new Usuarios(req.body); //instancia
        const usuarioGuardado = await usuario.save()

        res.json(usuarioGuardado);
    } catch (error) {
        console.log(error)
    }

    
};

const perfil = (req, res) =>{
    res.json({msg: "Mostrando Perfil"});
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
    await usuarioConfirmar.save()
    res.json({msg:"Usuario confirmado "});
  } catch (error) {
    console.log(error);
  }
    
}
export {registrar, perfil, confirmar} //se abren llaves porque va a ser un objeto  donde se pueden exportar multiples funciones
 
