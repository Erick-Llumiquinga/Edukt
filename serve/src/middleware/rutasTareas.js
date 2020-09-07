const { Personas } = require('../models/index');

module.exports = {

    crearTarea (req, res, next) {
        if( Personas.isEstu(req.person.roles)){
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    verTarea (req, res, next){
        if( Personas.isEstu(req.person.roles) || Personas.isProfe(req.person.roles) ){
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    eliminar (req, res, next) {
        if( Personas.isEstu(req.person.roles)){
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    },

    editar (req, res, next) {
        if( Personas.isEstu(req.person.roles  ||  Personas.isProfe(req.person.roles))){
            next();
        }else {
            res.status(401).json({
                msg: "No estas autorizado"
            })
        }
    }

}