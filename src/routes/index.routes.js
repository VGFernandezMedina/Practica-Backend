const { Router } = require("express");
const router = new Router();

const usuariosRutas = require("./usuarios.routes.js");

router.use("./usuarios", usuariosRutas);

module.exports = router;

//acá se crean todos los middlewares de las rutas
