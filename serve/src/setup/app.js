;
'use strict'
const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      app = express(),
      path = require('path'),
      { join } = require('path'),
      cors = require('cors'),
      personRutas = require('../routes/personas'),
      profesorRutas = require('../routes/profesor'),
      estudianteRutas = require('../routes/estudiante'),
      cursosRutas  = require('../routes/cursos'),
      materiasRutas = require('../routes/materias'),
      matriculaRutas = require('../routes/matricula'),
      tareaRutas = require('../routes/tareas'),
      clasesRutas = require('../routes/clases')
     

app.use(morgan('dev')),



app.use(bodyParser.urlencoded({ extended: false })),
app.use(bodyParser.json()),

app.use('/uploads', express.static(path.resolve('uploads')));


app.use(cors());

app.use('/api', personRutas);
app.use('/api', profesorRutas);
app.use('/api', estudianteRutas);
app.use('/api', tareaRutas);
app.use('/api', clasesRutas);
app.use('/api', cursosRutas);
app.use('/api', materiasRutas);
app.use('/api', matriculaRutas);


module.exports = app;