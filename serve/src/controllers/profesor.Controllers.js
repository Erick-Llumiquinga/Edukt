const { Profesores, Personas  } = require('../models/index');


const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


async function crearProf (req, res){
    let clave = bcrypt.hashSync(req.body.clave, Number.parseInt(authConfig.rounds));
    try {
        await Profesor.create(
            {
                correoInst: req.body.correo,
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
                    img: req.file.path
                }
            },{
                include: ['personas']
            }
        ).then (person => {

            res.status(200).json({
                msg: "Creado con exito",
                person: person
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
        const person = await Profesor.findByPk(req.params.id,
            {
                attributes : [ 'id', 'correoInst' ],
                include: [{
                 association: "personas",
                 attributes: [ 'id', 'nombre', 'apellido' ]
                 
                }]
            })
              console.log(person);
              res.json(person);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}

async function deleteProf ( req, res ) {
    try {
        const person = await Profesor.destroy({
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
    
        const person = await Profesor.update(req.body, {
            where: { id: req.params.id }
        })
        console.log("Actualizado con exito", person);
        res.json(person);

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