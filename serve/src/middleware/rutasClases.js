const { Personas } = require('../models/index');

module.exports = {

    crearClase (req, res, next) {
        if( Personas.isProfe(req.person.roles)){
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    verClases (req, res, next){
        if( Personas.isProfe(req.person.roles) || Personas.isEstu(req.person.roles) ){
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    eliminar (req, res, next) {
        if( Personas.isProfe(req.person.roles) || Personas.isEstu(req.person.roles) ){
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    editar (req, res, next) {
        if( Personas.isProfe(req.person.roles)){
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    }

}