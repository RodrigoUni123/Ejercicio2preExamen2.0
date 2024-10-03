module.exports = (sequelize, Sequelize) => {
	const Autores = sequelize.define('autor', {	
	  id_autor: {
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
	  nacionalidad: {
			type: Sequelize.STRING,
	  },
	  fecha_nacimiento: {
			type: Sequelize.DATE,
    },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Autores;
}