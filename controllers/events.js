const {request, response} = require("express");
const Evento = require("../models/Evento");


// Obtener eventos ------------------------------------------
const obtenerEventos = async (req = request, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.status(200).json({
        ok: true,
        eventos
    })

}


// Crear evento ------------------------------------------
const agregarEvento = async (req = request, res = response) => {

    const evento = new Evento( req.body )

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            msg: 'Evento Guardado',
            eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
    
}

// Actualizar evento ------------------------------------------
const actulizarEvento = async (req = request, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {

        const evento = await Evento.findById( eventoId );

        if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de actualizar este evento'
            })
        }

        const newEvento = {
            ...req.body,
            user: uid
        }

        const updateEvento = await Evento.findByIdAndUpdate(eventoId, newEvento, { new: true })

        res.json({
            ok: true,
            evento: updateEvento
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

// Eliminar evento ------------------------------------------
const eliminarEvento = async (req = request, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventoId)

        if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete( eventoId )


        res.status(200).json({ ok: true })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
    
}

module.exports = {
    obtenerEventos,
    agregarEvento,
    actulizarEvento,
    eliminarEvento
}