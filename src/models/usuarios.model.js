const { Schema, model } = require("mongoose");
const UsuariosSchema = new Schema({});
const UsuariosModel = model("usuarios", UsuariosSchema);
module.exports = UsuariosModel;
