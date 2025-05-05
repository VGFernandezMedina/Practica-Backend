const {
  obtenerTodosLosUsuariosBD,
  obtenerUnUsuarioBD,
  crearUsuarioBD,
  editarUsuarioBD,
  eliminarUsuarioBD,
  iniciarSesionUsuarioDB,
} = require("../services/usuarios.services");

const obtenerTodosLosUsuarios = async (req, res) => {
  const { usuarios, statusCode, error } = await obtenerTodosLosUsuariosBD();
  try {
    res.status(statusCode).json({ usuarios });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenerUnUsuario = async (req, res) => {
  const { usuario, statusCode, error } = await obtenerUnUsuarioBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ usuario });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const crearUsuario = async (req, res) => {
  const { msg, statusCode, error } = await crearUsuarioBD(req.body);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const editarUsuario = async (req, res) => {
  const { msg, statusCode, error } = await editarUsuarioBD(
    req.params.id,
    req.body
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const eliminarUsuario = async (req, res) => {
  const { msg, statusCode, error } = await eliminarUsuarioBD(req.params.id);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const iniciarSesionUsuario = async (req, res) => {
  const { msg, statusCode, token, error } = await iniciarSesionUsuarioDB(
    req.body
  );

  try {
    res.status(statusCode).json({ msg, token });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  iniciarSesionUsuario,
};
