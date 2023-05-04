import express from "express";
const router = express.Router();
import {registrar,perfil,confirmar, autenticar} from "../controllers/usuariosController.js";

import checkAuth from "../middleware/authMiddleware.js";


router.post('/', registrar );
router.get("/confirmar/:token", confirmar);
router.post('/login', autenticar);



router.get("/perfil", checkAuth, perfil);;

export default router;
