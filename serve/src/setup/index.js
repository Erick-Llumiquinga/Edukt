
;
'use strict'
const { sequelize } = require('../models/index');
const app = require('./app'),
      port =   process.env.PORT || 3500
 
      app.listen(port, function () {
          console.log(`Servidor funcionando en puerto ${port}` );

          sequelize.authenticate().then(() => {
            console.log("DB Conectada")
          })

        /*sequelize.sync({ force:true }).then(() => {
          console.log("DB Conectada")
        })*/ 
      }) 