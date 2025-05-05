const express = require("express");
const morgan = require("morgan");

class Server {
  constructor() {
    this.app = express();
  }

  middlewares() {
    //middlewares de config.
    this.app.use(express.json()); //analiza el JSON y lo convierte en un objeto.
    this.app.use(morgan("dev")); //registra las peticiones HTTP en la consola.
  }

  routes() {
    this.app.use("/api", require("./routes/indes.routes"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor funcionando en el puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
