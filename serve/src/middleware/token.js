
;
'use strict'
const { Personas } = require('../models/index');
const jwt = require('jsonwebtoken'),
     cache = require('memory-cache'),
     authConfig = require('../config/auth')


let autentica = (req, res, next) => {
    
    let token = req.headers.authorization || null
    
  jwt.verify(token,  process.env.AUTH_SECRET, (err, decode) => {
        if(err) {
            return res.status(400).json({
                data : err,
                msg: 'Token invalido'
            }) 
        }else {

            Personas.findByPk(decode.person.id, { include: "roles" }).then(
                person => {

                    // console.log(person.roles);

                    req.person = person;
                    next();
                }
            ) 

            // // req.decode = decode
            
            // // let token = jwt.sign({data: decode.data}, process.env.AUTH_SECRET, {
            // //     algorithm: 'HS256',
            // //     expiresIn: parseInt(process.env.AUTH_EXPIRES)
            
            
            // })
           
            //  req.token = token
            
        }
    })
}

module.exports = {
  
    autentica
 }