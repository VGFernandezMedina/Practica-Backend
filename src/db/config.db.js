const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL_CONNECT)
  .then(() => console.log("Servidor conectado"))
  .catch((error) => console.log(error));
