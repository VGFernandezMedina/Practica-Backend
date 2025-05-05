const { Router } = require("express");
const {
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  iniciarSesionUsuario,
} = require("../controllers/usuarios.controllers");
const router = Router();

router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUnUsuario);
router.post("/register", crearUsuario);
router.post("/login", iniciarSesionUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
