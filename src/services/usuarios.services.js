const argon = require("argon2");
const UsuariosModel = require("../models/usuarios.model");
const jwt = require("jsonwebtoken");

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

const iniciarSesionUsuarioDB = async (body) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });

    if (!usuarioExiste) {
      return {
        msg: "El usuario y/o contraseña es incorrecto. USUARIO",
        statusCode: 409,
      };
    }

    if (usuarioExiste.estado === "deshabilitado") {
      return {
        msg: "El usuario está bloqueado",
        statusCode: 400,
      };
    }

    console.log(usuarioExiste);

    const verificarContrasenia = await argon.verify(
      usuarioExiste.contrasenia,
      body.contrasenia
    );

    if (verificarContrasenia) {
      const payload = {
        idUsuario: usuarioExiste._id,
        rolUsuario: usuarioExiste.rol,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return {
        msg: "El usuario se logupo correctamente",
        token,
        statusCode: 200,
      };
    } else {
      return {
        msg: "El usuario y/o contraseña es incorrecto. CONTRASEÑA",
        statusCode: 409,
      };
    }
  } catch (error) {
    console.log(error);
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
  iniciarSesionUsuarioDB,
};
