const { Estudiante  } = require('../models/index');


const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


async function crearEstu (req, res){
    let clave = bcrypt.hashSync(req.body.clave, Number.parseInt(authConfig.rounds));
    try {
        await Estudiante.create(
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
        const person = await Estudiante.findAll(
            {
               attributes : [ 'id', 'correoInst' ],
               include: [{
                association: "personas",
                attributes: [ 'id', 'nombre', 'apellido' ]
                
               }]
            }
        )
        console.log(person);
        res.json(person);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}


async function verOne ( req, res ){
    try {
        const person = await Estudiante.findByPk(req.params.id,
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


async function deleteEstu ( req, res ) {
    try {
        const person = await Estudiante.destroy({
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
    
        const person = await Estudiante.update(req.body, {
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
    crearEstu,
    verAll,
    verOne,
    deleteEstu,
    putEstu
}