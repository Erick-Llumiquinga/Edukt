const { Matriculas } = require('../models/index');

async function newMatricula ( req, res ) {
    try {
        await Matriculas.create({
            codigoMatricula : req.body.codigoMatricula,
            numeroMatricula : req.body.numeroMatricula,
            estudiantes : {
                correoInst : req.body.correoInst
                
            }
        }, {
            include: ['estudiantes']
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

async function verMatri ( req, res ) {
    try {
        const matricula = await Matriculas.findAll({
            attributes: [ 'id', 'codigoMatricula', 'numeroMatricula' ],
            include: [{
                association : "estudiantes",
                attributes: [ 'id', 'correoInst' ]
            }]
        })
        console.log(matricula);
        res.json(matricula);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verOneMatri ( req, res ) {
    try {
        const matricula = await Matriculas.findByPk(req.params.id, {
            attributes: [ 'id', 'codigoMatricula', 'numeroMatricula' ],
            include: [{
                association : "estudiantes",
                attributes: [ 'id', 'correoInst' ]
            }]
        })
        console.log(matricula);
        res.json(matricula);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}

async function deleteMatri ( req, res ) {
    try {
        const matricula = await Matriculas.destroy({
            where: { id : req.params.id }
        })
        console.log("Eliminado con exito", matricula);
        res.json(matricula);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function putMatri ( req, res ) {
    try {
    
        const matricula = await Matriculas.update(req.body, {
            where: { id: req.params.id }
        })
        console.log("Actualizado con exito", matricula);
        res.json(matricula);

    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}


module.exports = {
    newMatricula,
    verMatri,
    verOneMatri,
    deleteMatri,
    putMatri

}