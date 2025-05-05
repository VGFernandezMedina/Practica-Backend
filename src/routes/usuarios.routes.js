const { Router } = require("express");
const router = Router();

router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUnUsuarios);
router.post("/", crearUsuario);
router.put("/", editarUsuario);
router.delete("/", eliminarUsuario);

module.exports = router;
