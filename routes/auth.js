const { Router } = require("express");
const router = Router();
const { check } = require('express-validator')
const { authLogin, authRegister, authRevalidarToken } = require('../controllers/auth');
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], authRegister);

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], authLogin);

router.get('/renew',[
    validarJWT
], authRevalidarToken);

module.exports = router;