let express = require('express');
let router = express.Router();

//Ruta para usuario
const usuarios = require('../controllers/Usuarios.controller.js'); // Cambiado a usuarios

router.post('/api/usuarios/create', usuarios.create); // Crear un nuevo usuario
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios); // Obtener todos los usuarios
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById); // Obtener un usuario por ID
router.put('/api/usuarios/update/:id', usuarios.updateById); // Actualizar un usuario por ID
router.delete('/api/usuarios/delete/:id', usuarios.deleteById); // Eliminar un usuario por ID

module.exports = router;

//Ruta para libros
const libros = require('../controllers/Libros.controller.js'); // Controlador de libros

router.post('/api/libros/create', libros.create); //crear nuevo libro
router.get('/api/libros/all', libros.retrieveAllLibros); //obtener todos los libros
router.get('/api/libros/onebyid/:id', libros.getLibroById); // Cambiado a id
router.put('/api/libros/update/:id', libros.updateById); // Cambiado a id
router.delete('/api/libros/delete/:id', libros.deleteById); // Cambiado a id

module.exports = router;

const autores = require('../controllers/Autores.controller.js'); // Controlador de autores

router.post('/api/autores/create', autores.create); // Crear nuevo autor
router.get('/api/autores/all', autores.retrieveAllAutores); // Obtener todos los autores
router.get('/api/autores/onebyid/:id', autores.getAutorById); // Obtener autor por ID
router.put('/api/autores/update/:id', autores.updateById); // Actualizar autor por ID
router.delete('/api/autores/delete/:id', autores.deleteById); // Eliminar autor por ID

module.exports = router;