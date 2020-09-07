const { Personas } = require('../models/index');

module.exports = {

    crearCurso (req, res, next){
        if(Personas.isAdmin(req.person.roles)){
            next();
        }else{
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    verCursos (req, res, next){
        if(Personas.isAdmin(req.person.roles)){
            next();
        }else{
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    eliminar (req, res, next) {
        if (Personas.isAdmin(req.person.roles)) {
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    editar (req, res, next){
        if (Personas.isAdmin(req.person.roles)) {
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    }

}