const { Profesores, Personas  } = require('../models/index');


const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


async function crearProf (req, res){
    let clave = bcrypt.hashSync(req.body.clave, Number.parseInt(authConfig.rounds));
    try {
        console.log(req.body);
        await Profesores.create(
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
                    //img: req.file.path,
                    idRole: req.body.idRole
                }
            },{
                include: ['personas']
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
            msg: error,
            error
        })
    }
}

async function verAll (req, res){
    try {
        const person = await Profesores.findAll(
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
            msg: 'Error al consultar',
            error
            
        })
    }
}

async function verOne ( req, res ){
    try {
        const person = await Profesores.findByPk(req.params.id,
            {
                attributes : [ 'id', 'correo' ],
                include: [{
                    association: "personas"
                   }]
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
            msg: 'No se pudo actualizar',
            error 
        })
    }
}

async function deleteProf ( req, res ) {
    try {
        const person = await Profesores.destroy({
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

async function putProf ( req, res ) {
    try {
    
        await Personas.update(req.body, {
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
        await Profesores.update({correo}, {
            where: { id: data.idProfesor }
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
    crearProf,
    verAll,
    verOne,
    deleteProf,
    putProf
}