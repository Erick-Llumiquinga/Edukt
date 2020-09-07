const { Personas } = require('../models/index');

module.exports = {

    verification(req, res, next){
        console.log('este es el middleware')
        next();
    }

    /*crearPerson (req, res, next){
        if(Personas.isAdmin(req.person.roles)){
            next();
        }else{
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    verAll (req, res, next){
        if(Personas.isAdmin(req.person.roles)){
            next();
        }else{
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    eliminarPer(req, res, next) {
        if (Personas.isAdmin(req.person.roles)) {
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    editarPer(req, res, next){
        if (Personas.isAdmin(req.person.roles)) {
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    }*/

}