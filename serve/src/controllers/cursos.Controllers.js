const { Curso } = require('../models/index');
const { Paralelos } = require('../models/index');
const  fs = require('fs-extra');
const { unlink  }  = require('fs-extra');
const  path = require('path');

async function find (req, res, next) {
    let curso = await Tareas.findByPk(req.params.id);
    if (!curso) {
        res.status(404).json({
            msg: "Tarea no encontrada"
        });
    }else {
        req.curso = curso;
        next();
    }
}

async function show ( req, res) {
    res.json(req.curso);
    
}

async function crearCurso (req, res) {
    try {
              
        await Curso.create({
            nombre_curso : req.body.nombre_curso,
             nombre_paralelo: req.body.nombre_paralelo
        

        }).then(result => {
            res.status(200).json(result)
        } )
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verCursos (req, res) {
    try {
        const curso = await Curso.findAll(
            {
                
                 attributes: ['id', 'nombre_curso', 'nombre_paralelo']
                
            },
        )
        res.json(curso);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verParalelo (req, res) {
    try {
        const curso = await Paralelos.findAll({
            include: {
                association: "cursos",
                attributes: ['nombre_curso']
            }
        },
        )
        res.json(curso);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function eliminar (req, res) {

    // req.curso.destroy().then(curso => {
    //     res.json({
    //         msg: "La tarea a sido elimindada"
    //     })
    // })

    try {
        const tarea = await Curso.destroy({
            where: { id: req.params.id }
        }).then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error,
            token
        })
    }
}

async function editar (req, res){

    // req.curso.detalle = req.body.nombre_curso;
  
    // req.curso.save().then(curso => {
    //     res.json(curso);
    // })


    try {
        const id = req.params.id
      
        const curso = await Curso.update(req.body, {
            where: {
                id: id
            }
        })
          res.json(curso);
            console.log(curso)
           
        
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error,
            token
        })
    }
}



module.exports = {
    crearCurso,
    verCursos,
    eliminar,
    editar,
    find,
    show,
    verParalelo
}