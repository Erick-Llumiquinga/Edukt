const { Clases } =require('../models/index');
const  fs = require('fs-extra');
const { unlink  }  = require('fs-extra');
const  path = require('path');

async function find (req, res, next) {
    let clases = await Clases.findByPk(req.params.id);
    if (!clases) {
        res.status(404).json({
            msg: "Tarea no encontrada"
        });
    }else {
        req.Clases = clases;
        next();
    }
}

async function crearClase (req, res){
    try {
        await Clases.create({
            detalle: req.body.detalle,
            tareas_realizar: req.file.path
        }).then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verClases (req, res){
    try {
        const clases = await Clases.findAll(
            {
               detalle: req.body.detalle,
               tareas_realizar: req.body.deber_archivo
            },
        )
        res.json(clases);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function eliminar (req, res) {

    req.clases.destroy().then(clases => {
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

    req.clases.detalle = req.body.detalle;
    req.clases.deber_archivo = req.body.deber_archivo;
    req.clases.nota = req.body.nota;

    req.clases.save().then(clases => {
        res.json(clases);
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
    crearClase,
    verClases,
    eliminar,
    editar,
    find
}