import express from "express"; //  servidor 
import dotenv from 'dotenv'; //variables de entorno 
import cors from 'cors'; //protege la api para que alguien externo no pueda acceder a la api 
import conectarDB from "./config/db.js"; // cuando es un archivo que yo cre si requiero la extensión .js
import usuariosRoutes from "./routes/UsuariosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import vehiculosRoutes from "./routes/vehiculosRoutes.js";

//Crear servidor de express 
const app = express(); // se manda a llamar la funcion de express
app.use(express.json()); //lea datos enviados a la app desde postman

dotenv.config();

conectarDB();

 const dominiosPermitidos  = [ process.env.FRONTEND_URL ]

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf({origin:'*'}) !== -1){
            //El Origen del Request esta permitido 
            callback(null, true )
        } else{
            callback(new Error('No permito por CORS'))
        }
    }
};

app.use(cors({corsOptions}))

//Creación y registro de routing
app.use('/api/usuarios', usuariosRoutes );
app.use('/api/clientes', clientesRoutes );
app.use('/api/vehiculos', vehiculosRoutes );

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}` )
})