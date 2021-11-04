const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerEventos, agregarEvento, actulizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();

// Todas las rutas tienen que pasar por JWT
router.use(validarJWT)

// Obtener eventos
router.get('/', [
    validarCampos
], obtenerEventos)

// Crear evento
router.post('/', [
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
    check('end', 'Fecha final es obligatorio').custom( isDate ),
    validarCampos
], agregarEvento)

// Actualizar evento
router.put('/:id', [
    validarCampos
], actulizarEvento)

// Eliminar evento
router.delete('/:id', [
    validarCampos
], eliminarEvento)

module.exports = router;