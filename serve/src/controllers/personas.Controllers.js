const { Profesores, Estudiantes, Personas } = require('../models/index');
const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


async function login (req, res) {
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

module.exports = {
    login,
}

