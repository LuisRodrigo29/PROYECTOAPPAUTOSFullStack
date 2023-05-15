import jwt from "jsonwebtoken";
import Usuarios from "../models/Usuarios.js";


const checkAuth = async (req, res, next ) => {

let token;

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){// se comprueba que se esten enviando los token con las cabeceras y los bearer

try {
   token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET) // toma diferentes parametros, como el token que obtengo cuando autentifico al usuario

   req.usuario = await Usuarios.findById(decoded.id).select("-password -token -confirmado"); // se validan y comprueban los datos  en el servidor

 return next() //permite que se valla al siguente middleware y no siga bajando en las lineas del codigo
} catch (error) {
    const e = new Error('Token no válido ')
   return res.status(40).json({msg: e.message});
}

} 

if(!token){
    const error = new Error('Token no válido o inexistente ')
    res.status(403).json({msg: error.message});
}

next(); 
};

export default checkAuth;