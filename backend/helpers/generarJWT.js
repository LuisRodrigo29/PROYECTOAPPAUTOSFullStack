import jwt from 'jsonwebtoken'

const generarJWT = (id) =>{

    return jwt.sign({id: id}, process.env.JWT_SECRET,{
       expiresIn: "30d", 
    }); //crea un nuevo jwebtoken

};

export default generarJWT;