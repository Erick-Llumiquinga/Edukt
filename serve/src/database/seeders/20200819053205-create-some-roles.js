'use strict';
const  bcrypt = require ('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return Promise.all([ 
      queryInterface.bulkInsert('roles', [
        { id: 1, role: "admin", createdAt: new Date(), updatedAt: new Date()  },
        { id: 2, role: "profesor", createdAt: new Date(), updatedAt: new Date()  },
        { id: 3, role: "alumno", createdAt: new Date(), updatedAt: new Date()  }
      ], {}),
  
      queryInterface.bulkInsert('permisos', [
        { id: 1,
          guard: 'businessP', 
          permisos: "['/persons','/person','/person/:id','/person/:id']",   
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        { id: 2,
          guard: 'businessCu', 
          permisos: "['/cursos','/curso','/curso/:id','/curso/:id']",   
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        { id: 3,
          guard: 'businessCl', 
          permisos: "['/clase','/clases','/clase/:id','/clase/:id']",   
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        { id: 4,
          guard: 'businessM', 
          permisos: "['/materias','/materia','/materia/:id','/materia/:id']",   
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        { id: 5,
          guard: 'businessT', 
          permisos: "['/tareas','/tarea','/tarea/:id','/tarea/:id']",   
          createdAt: new Date(), 
          updatedAt: new Date()
        },
      ], {}),
  
      queryInterface.bulkInsert('Permisos_x_Roles', [
        {
          idRole: 1,
          idPermisos: 1,  
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        {
          idRole: 1,
          idPermisos: 2,  
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        {
          idRole: 1,
          idPermisos: 3,  
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        {
          idRole: 1,
          idPermisos: 4,  
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        {
          idRole: 1,
          idPermisos: 5,  
          createdAt: new Date(), 
          updatedAt: new Date()
        },
      ], {}),
  
      queryInterface.bulkInsert('profesores', [
        { id: 1,
          correo: 'superAdmin@jarvis.com',
          clave: bcrypt.hashSync('admin123456', 10),
          createdAt: new Date(), 
          updatedAt: new Date()
        },
      ], {}),
  
      queryInterface.bulkInsert('personas', [
        { id: 1,
          name: 'super', 
          lastname: 'admin', 
          identification: '1750057729001', 
          address: 'Malibu',
          //birthDay: '2020/04/04',
          correo: 'admin@jarvis.com',
          phone: '0987654321',
          helpContact: '2683590',
          idRole: 1,  
          idProfesor: 1,
          createdAt: new Date(), 
          updatedAt: new Date()
        },
      ], {})
    ])
  },

  down: async (queryInterface, Sequelize) => {
    
     return Promise.all([
      queryInterface.bulkDelete('roles', null, {}),
      queryInterface.bulkDelete('personas', null, {}),
     ])

  }
};
