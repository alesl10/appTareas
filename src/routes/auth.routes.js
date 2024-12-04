import { Router } from "express";
import { addUsuario, getUsuarios, login } from "../controllers/auth.Controllers.js";

const router = Router();

router.get("/usuarios", getUsuarios);

router.post("/register", addUsuario);
router.post("/login", login);

export default router;
 