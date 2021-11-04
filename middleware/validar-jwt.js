require('dotenv').config()
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req = request, res = response, next) => {

    const token =  req.header('x-token');

    if( !token ) {
        return res.status.json({
            ok: false,
            msg: 'No al token en la peticion'
        })
    }

    try {

        const { uid, name } = jwt.verify(token, process.env.SECRETKEY)

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next()

}

module.exports = {
    validarJWT
}