const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const authRegister = async (req = request, res = response) => {
    const { email, password } = req.body;
    
    try {
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese email'
            })
        }

        usuario =  new Usuario( req.body )

        // Encriptar contrasena
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save();

        // Generar JWT
        const token =  await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador!'
        }) 
    }
}

const authLogin = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email })

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email"
            })
        }

        

        // Confiramr los password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La password es incorreca'
            })
        }

        // Generar JWT
        const token =  await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        // Genearar JWT
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador!'
        }) 
    }

    res.json({
        msg: 'Login',
        email, 
        password
    })
}

const authRevalidarToken = async (req = request, res = response) => {
    
    const { uid, name } = req

    // Revalidar JWT
    const token = await generarJWT(uid, name)

    res.json({
        msg: 'Revalidar Token',
        
        token
    })
}

module.exports = {
    authLogin,
    authRegister,
    authRevalidarToken
}