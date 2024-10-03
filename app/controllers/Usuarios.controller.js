const db = require('../config/db.config.js');
const Usuario = db.Usuario; // Cambiado a Usuario

// Crear un nuevo usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        // Construir el objeto Usuario a partir del cuerpo de la solicitud
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.telefono = req.body.telefono;
        usuario.direccion = req.body.direccion;
        usuario.fecha_registro = req.body.fecha_registro;
        usuario.estado = req.body.estado;

        // Guardar en la base de datos MySQL
        Usuario.create(usuario).then(result => {
            // Enviar mensaje de éxito al cliente    
            res.status(200).json({
                message: "Usuario creado con éxito con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
}

exports.retrieveAllUsuarios = (req, res) => {
    // Obtener todos los usuarios de la base de datos
    Usuario.findAll()
        .then(usuarios => {
            res.status(200).json({
                message: "Usuarios obtenidos con éxito",
                usuarios: usuarios
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los usuarios",
                error: error
            });
        });
}

// Obtener un usuario por ID
exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            res.status(200).json({
                message: "Usuario obtenido con éxito con id = " + usuarioId,
                usuario: usuario
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el usuario",
                error: error
            });
        });
}

// Actualizar un usuario por ID
exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                fecha_registro: req.body.fecha_registro,
                estado: req.body.estado
            }
            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el usuario con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Usuario actualizado con éxito con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un usuario por ID
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con éxito con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
}