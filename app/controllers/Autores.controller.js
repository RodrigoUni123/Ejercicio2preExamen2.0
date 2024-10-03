const db = require('../config/db.config.js');
const Autor = db.Autores; // Cambiado a Autores

// Crear un nuevo autor
exports.create = (req, res) => {
    let autor = {};

    try {
        // Construir el objeto Autor a partir del cuerpo de la solicitud
        autor.nombre = req.body.nombre;
        autor.apellido = req.body.apellido;
        autor.nacionalidad = req.body.nacionalidad;
        autor.fecha_nacimiento = req.body.fecha_nacimiento;

        // Guardar en la base de datos MySQL
        Autor.create(autor).then(result => {
            // Enviar mensaje de éxito al cliente    
            res.status(200).json({
                message: "Autor creado con éxito con id = " + result.id_autor,
                autor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el autor",
            error: error.message
        });
    }
}

// Obtener todos los autores
exports.retrieveAllAutores = (req, res) => {
    // Obtener todos los autores de la base de datos
    Autor.findAll()
        .then(autores => {
            res.status(200).json({
                message: "Autores obtenidos con éxito",
                autores: autores
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los autores",
                error: error
            });
        });
}

// Obtener un autor por ID
exports.getAutorById = (req, res) => {
    let autorId = req.params.id;
    Autor.findByPk(autorId)
        .then(autor => {
            res.status(200).json({
                message: "Autor obtenido con éxito con id = " + autorId,
                autor: autor
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el autor",
                error: error
            });
        });
}

// Actualizar un autor por ID
exports.updateById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No se encontró el autor con id = " + autorId,
                autor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacionalidad: req.body.nacionalidad,
                fecha_nacimiento: req.body.fecha_nacimiento
            }
            let result = await Autor.update(updatedObject, { returning: true, where: { id_autor: autorId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el autor con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Autor actualizado con éxito con id = " + autorId,
                autor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el autor con id = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un autor por ID
exports.deleteById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No existe un autor con id = " + autorId,
                error: "404",
            });
        } else {
            await autor.destroy();
            res.status(200).json({
                message: "Autor eliminado con éxito con id = " + autorId,
                autor: autor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el autor con id = " + req.params.id,
            error: error.message,
        });
    }
}