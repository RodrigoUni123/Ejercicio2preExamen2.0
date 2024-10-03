const db = require('../config/db.config.js');
const Libro = db.Libros; // Cambiado a Libros

// Crear un nuevo libro
exports.create = (req, res) => {
    let libro = {};

    try {
        // Construir el objeto Libro a partir del cuerpo de la solicitud
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.anio_publicacion = req.body.anio_publicacion;
        libro.categoria = req.body.categoria;
        libro.cantidad_disponible = req.body.cantidad_disponible;
        libro.ubicacion = req.body.ubicacion;

        // Guardar en la base de datos MySQL
        Libro.create(libro).then(result => {
            // Enviar mensaje de éxito al cliente    
            res.status(200).json({
                message: "Libro creado con éxito con id = " + result.id_libro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el libro",
            error: error.message
        });
    }
}

exports.retrieveAllLibros = (req, res) => {
    // Obtener todos los libros de la base de datos
    Libro.findAll()
        .then(libros => {
            res.status(200).json({
                message: "Libros obtenidos con éxito",
                libros: libros
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los libros",
                error: error
            });
        });
}

// Obtener un libro por ID
exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Libro obtenido con éxito con id = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el libro",
                error: error
            });
        });
}

// Actualizar un libro por ID
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            }
            let result = await Libro.update(updatedObject, { returning: true, where: { id_libro: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado con éxito con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un libro por ID
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado con éxito con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
}