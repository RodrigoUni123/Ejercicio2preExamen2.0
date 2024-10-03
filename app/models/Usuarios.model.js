module.exports = (sequelize, Sequelize) => {
	const Usuarios = sequelize.define('usuario', {	
	  id_usuario: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING,

    },
		apellido: {
			type: Sequelize.STRING,

	},
		email: {
			type: Sequelize.STRING,

	},
		telefono: {
			type: Sequelize.INTEGER,

	},
		direccion: {
			type: Sequelize.STRING,

	},
		fecha_registro: {
			type: Sequelize.DATE,

	},
		estado: {
			type: Sequelize.INTEGER,

	},
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Usuarios;
}

