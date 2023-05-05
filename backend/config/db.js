//Conexión a la base de datos creada en mongoDB
import mongoose from "mongoose";

const conectarDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, 
        {
            useNewUrlParser: true, // configuraciones que requiere mongoose
            useUnifiedTopology: true,
        }); 
        // conectando a la BD 
        const url = `${db.connection.host}:${db.connection.port}` // se realiza la conexion al host que da la url y al puerto donde se esta conectando
        console.log(`BDAUTOS conectado en: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1); // imprime mensaje de error 
    }
};

export default conectarDB;
