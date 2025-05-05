const argon = require("argon2");
const UsuariosModel = require("../models/usuarios.model");

const obtenerTodosLosUsuariosBD = async () => {
  try {
    const usuarios = await UsuariosModel.find(); //el find devuelve todo lo que tiene el modelo
    return {
      usuarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnUsuarioBD = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findById(idUsuario); //findbyid internamente ya busca el _id
    return {
      usuario,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const crearUsuarioBD = async (body) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });
    if (usuarioExiste) {
      return {
        msg: "El usuario no está disponible",
        statusCode: 409,
      };
    }
    const nuevoUsuario = new UsuariosModel(body);
    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);
    await nuevoUsuario.save(); //metodo de mongoose que guarda el objeto en la BD
    return {
      msg: "Usuario creado correctamente",
      statusCode: 201, //el 201 representa cuando se crea algo nuevo en la BD
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const editarUsuarioBD = async (idUsuario, nuevoBody) => {
  try {
    await UsuariosModel.findByIdAndUpdate({ _id: idUsuario }, nuevoBody);
    return {
      msg: "Usuario editado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const eliminarUsuarioBD = async (idUsuario) => {
  try {
    await UsuariosModel.findByIdAndDelete(idUsuario);
    return {
      msg: "El usuario se eliminó con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  obtenerTodosLosUsuariosBD,
  obtenerUnUsuarioBD,
  crearUsuarioBD,
  editarUsuarioBD,
  eliminarUsuarioBD,
};
