const { Profesores, Estudiantes, Personas } = require('../models/index');
const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

async function  crearPerson (req, res){
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    
    try {
        console.log(req.body)
        const person = await Personas.create({
            name: req.body.name,
            lastname: req.body.lastname,
            identification: req.body.identification,
            address: req.body.address,
            email: req.body.email,
            password: password,
            img: req.file.path,
            idRole : req.body.idRole
        }).then(data => {
            
            return res.status(200).json({
                ok: true,
                data,
                msg: "",
            })
        })
        .catch(err => {
            return res.status(500).json({
                msg: 'Error',
                err
            })
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function loginA (req, res) {
    let correo = req.body.email
    let clave = req.body.password

    const prueba = await Profesores.findOne({
        where: { correo: correo }
    }).then(data => {
        if (!data) {
            validateData(correo, clave, res);
        }else {
            if(bcrypt.compareSync(clave, data.clave)) {
                let token = jwt.sign({ person: data }, authConfig.secret , {
                    expiresIn: authConfig.expires
                });
                return res.status(200).json({
                    ok: true,
                    data,
                    msg: "",
                    token: token
                })
            } else { 
                return res.status(401).json({
                    ok: false,
                    data: null,
                    msg: "Contraseña incorrecta"
                })
            }
        }
    }).catch(error => {
        return res.status(500).json(error);
    })
}

async function validateData(correo, clave, res){
    await Estudiantes.findOne({where: {correo: correo}})
    .then(data => {
        if(!data){
            return res.status(404).json({
                ok: false,
                data: null,
                msg: "Este correo no existe"
                });
        } else {
            if(bcrypt.compareSync(clave, data.clave)) {
                let token = jwt.sign({ person: data }, authConfig.secret , {
                    expiresIn: authConfig.expires
                });
                return res.status(200).json({
                    ok: true,
                    data,
                    msg: "",
                    token: token
                });
            } else { 
                return res.status(401).json({
                    ok: false,
                    data: null,
                    msg: "Contraseña incorrecta"
                })
            }
        }
    })
}

async function verAll (req, res) {
    try {
        const admin = await Personas.findAll({atributes: ['id', 'name']})
        .then(data => {
            return res.status(200).json({
                ok: true,
                data,
                msg: "",
            })
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error,
            token
            
        })
    }
}

async function eliminarPer (req, res) {
    try {
        const person = await Personas.destroy({
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

async function editarPer (req, res){
    try {
        const id = req.params.id
      
        const person = await Personas.update(req.body, {
            where: {
                id: id
            }
        }).then(person => {
            res.status(200).json(person);
           
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error,
            token
        })
    }
}

module.exports = {
    crearPerson,
    loginA,
    verAll,
    editarPer,
    eliminarPer
}