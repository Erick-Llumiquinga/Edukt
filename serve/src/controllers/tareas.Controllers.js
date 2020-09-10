const { Tareas, Personas } = require('../models/index');
const  fs = require('fs-extra');
const { unlink  }  = require('fs-extra');
const  path = require('path');

async function find (req, res, next) {
    let tarea = await Tareas.findByPk(req.params.id);
    if (!tarea) {
        res.status(404).json({
            msg: "Tarea no encontrada"
        });
    }else {
        req.tarea = tarea;
        next();
    }
}

async function show ( req, res) {
    res.json(req.tarea);
    
}


async function crearTarea (req, res) {
    try {
              
        await Tareas.create({
            detalle: req.body.detalle,
            deber_archivo: req.file.path

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

async function verTarea (req, res) {
    try {
        const tarea = await Tareas.findAll(
            {
               detalle: req.body.detalle,
               deber_archivo: req.body.deber_archivo
            },
        )
        res.json(tarea);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error,
            token
        })
    }
}

async function byId(req, res) {
    try {
        const tarea = await Tareas.findByPk(req.params.id, {
            
                attributes: ['id', 'detalle', 'deber_archivo']
            
        })
        res.json(tarea);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function eliminar (req, res) {

    req.tarea.destroy().then(tarea => {
        res.json({
            msg: "La tarea a sido elimindada"
        })
    })

    // try {
    //     const tarea = await Tareas.destroy({
    //         where: { id: req.params.id }
    //     }).then(result => {
    //         res.status(200).json(result);
    //     })
    // } catch (error) {
    //     return res.status(400).json({
    //         msg: 'No se pudo crear',
    //         error,
    //         token
    //     })
    // }
}

async function editar (req, res){

    req.tarea.detalle = req.body.detalle;
    req.tarea.deber_archivo = req.body.deber_archivo;
    req.tarea.nota = req.body.nota;

    req.tarea.save().then(tarea => {
        res.json(tarea);
    })


    // try {
    //     const id = req.params.id
      
    //     const tarea = await Tareas.update(req.body, {
    //         where: {
    //             id: id
    //         }
    //     }).then(tarea => {
    //         res.status(200).json(tarea);
    //         console.log(tarea)
           
    //     })
    // } catch (error) {
    //     return res.status(400).json({
    //         msg: 'No se pudo crear',
    //         error,
    //         token
    //     })
    // }
}



module.exports = {
    crearTarea,
    verTarea,
    eliminar,
    editar,
    find,
    show,
    byId
}