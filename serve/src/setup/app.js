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
      cursosRutas  = require('../routes/cursos'),
    //   paraleloRutas = require('../routes/paralelos'),
    //   curMatRutas = require('../routes/curso_materia'),
      tareaRutas = require('../routes/tareas'),
      clasesRutas = require('../routes/clases')
     

app.use(morgan('dev')),



app.use(bodyParser.urlencoded({ extended: false })),
app.use(bodyParser.json()),

app.use('/uploads', express.static(path.resolve('uploads')));


app.use(cors());

app.use('/api', personRutas);
app.use('/api', tareaRutas);
app.use('/api', clasesRutas);
app.use('/api', cursosRutas);
// app.use('/api', paraleloRutas);
// app.use('/api', curMatRutas);


module.exports = app;