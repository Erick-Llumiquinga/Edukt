const { Materias } = require('../models/index');

async function crearMateria ( req, res ){
    try {
        await Materias.create({
            nombre_materia: req.body.nombre_materia,
            profesores : {
                correoInst: req.body.correoInst
            }
        },{
            include : [ 'profesores' ]
        }).then (materia => {

            res.status(200).json({
                msg: "Creado con exito",
                materia: materia
            })

        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verAll ( req, res ){
    try {
        const materia = await Materias.findAll({
            attributes: [ 'id', 'nombre_materia' ],
            include: [{
                association : "profesores",
                attributes: [ 'id', 'correoInst' ]
            }]
        })
        console.log(materia);
        res.json(materia);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}

async function verOne ( req, res ) {
    try {
        const materia = await Materias.findByPk(req.params.id, {
            attributes: [ 'id', 'nombre_materia' ],
            include: [{
                association : "profesores",
                attributes: [ 'id', 'correoInst' ]
            }]
        })
        console.log(materia);
        res.json(materia);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}

async function deleteMater ( req, res ) {
    try {
        const materia = await Materias.destroy({
            where: { id : req.params.id }
        })
        console.log("Eliminado con exito", materia);
        res.json(materia);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function putMater ( req, res ) {
    try {
    
        const materia = await Materias.update(req.body, {
            where: { id: req.params.id }
        })
        console.log("Actualizado con exito", materia);
        res.json(materia);

    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

module.exports = {
    crearMateria,
    verAll,
    verOne,
    deleteMater,
    putMater
}