import express from "express";
const router = express.Router();
import {registrar,perfil} from "../controllers/usuariosController.js"

router.get('/', registrar );

router.get("/perfil",perfil);

export default router;
