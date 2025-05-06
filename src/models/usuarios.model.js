const { Schema, model } = require("mongoose");
const UsuariosSchema = new Schema({
  nombreUsuario: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowerCase: true,
  },
  emailUsuario: {
    type: String,
    match: [
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "Formato de email incorrecto",
    ],
  },
  contrasenia: {
    type: String,
  },
  estado: {
    type: String,
    trim: true,
    enum: ["habilitado", "deshabilitado"],
    default: "deshabilitado",
  },
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
  fechaReg: {
    type: Date,
    default: Date.now(),
  },
  idCarrito: {
    type: String,
    trim: true,
  },
  idFavoritos: {
    type: String,
    trim: true,
  },
});

UsuariosSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UsuariosModel = model("usuarios", UsuariosSchema);
module.exports = UsuariosModel;
