import express from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js"; // cuando es un archivo que yo cre si requiero la extensión .js
import usuariosRoutes from "./routes/UsuariosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";

//Crear servidor de express 
const app = express(); // se manda a llamar la funcion de express
app.use(express.json()); //lea datos enviados a la app desde postman

dotenv.config();

conectarDB();

//Creación y registro de routing
app.use('/api/usuarios', usuariosRoutes );
app.use('/api/clientes', clientesRoutes );

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}` )
})