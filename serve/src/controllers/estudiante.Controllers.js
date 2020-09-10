const { Estudiantes, Personas  } = require('../models/index');


const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


async function crearEstu (req, res){
    let clave = bcrypt.hashSync(req.body.clave, Number.parseInt(authConfig.rounds));
    try {
        await Estudiantes.create(
            {
                correo: req.body.correoInst,
                clave: clave,
                personas : {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    identificacion: req.body.identificacion,
                    direccion: req.body.direccion,
                    fechaNacimiento: req.body.fechaNacimiento,
                    correo: req.body.correo,
                    telefono: req.body.telefono,
                    contactoEmergencia: req.body.contactoEmergencia,
                    //img: req.file.path
                    idRole: req.body.idRole,
                },
                matriculas:{
                    codigoMatricula: req.body.codigoMatricula
                }
            },{
                include: ['personas','matriculas']
            }
        ).then(data => {
            return res.status(200).json({
                ok: true,
                data,
                msg: "",
            })
        })
        .catch(error => {
            return res.status(500).json({
                ok: true,
                data: null,
                msg: error,
            })
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verAll (req, res){
    try {
        const person = await Estudiantes.findAll(
            {
                attributes : [ 'id', 'correo' ],
                include: [{
                 association: "personas",
                 attributes: [ 
                     'nombre', 
                     'apellido', 
                     'identificacion', 
                     'fechaNacimiento', 
                     'correo', 
                     'telefono', 
                     'contactoEmergencia'
                 ]
                }]
            }
        )
        .then(data => {
            return res.status(200).json({
                ok: true,
                data,
                msg: "",
            })
        })
        .catch(error => {
            return res.status(500).json({
                ok: true,
                data: null,
                msg: error,
            })
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}

async function verOne ( req, res ){
    try {
        const person = await Estudiantes.findByPk(req.params.id,
            {
                attributes : [ 'id', 'correo' ],
                include: [{
                 association: "personas"
                }]
            })
            .then(data => {
                return res.status(200).json({
                    ok: true,
                    data,
                    msg: "",
                })
            })
            .catch(error => {
                return res.status(500).json({
                    ok: true,
                    data: null,
                    msg: error,
                })
            })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}

async function deleteEstu ( req, res ) {
    try {
        const person = await Estudiantes.destroy({
            where: { id : req.params.id }
        })
        console.log("Eliminado con exito", person);
        res.json(person);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function putEstu ( req, res ) {
    try {
    
        const person = await Personas.update(req.body, {
            where: { id: req.params.id }
        }).then(data => {
            putData(req.body, res)
         })
         .catch(error => {
             return res.status(500).json({
                 ok: true,
                 data: null,
                 msg: error,
             })
         })

    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function putData ( data, res ) {
    try {
        let correo = data.correoInst;
        await Estudiantes.update({correo}, {
            where: { id: data.idEstudiante }
        }).then(data => {
            return res.status(200).json({
                ok: true,
                data,
                msg: "",
            })
        })
        .catch(error => {
            return res.status(500).json({
                ok: true,
                data: null,
                msg: error,
            })
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}


module.exports = {
    crearEstu,
    verAll,
    verOne,
    deleteEstu,
    putEstu
}