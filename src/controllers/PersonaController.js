'use strict';
const PersonaValidator = require('./../validators/PersonaValidator')
const PersonaModel = require('./../models/PersonaModel')

const toResponse = (code, status, payload) => {
    const response = {
        statusCode: code || 200,
        body: JSON.stringify({
            status,
            payload,
        }),
    }

    return response
}

class PersonaController {

    static listarPersonas = async(event, context, callback) => {
        try {
            let bodyJson = event.queryStringParameters;
            const items = await PersonaModel.Listar(bodyJson, callback)
            callback(null, toResponse(null, 'success', items))
        } catch (error) {
            callback(null, toResponse(400, 'errors', error));
        }
    }

    static crearPersona = async(event, context, callback) => {
        try {
            const { error, value } = PersonaValidator.Crear(event, callback)
            if (error) {
                const message = error.details.map(v => v.message).join(',')
                callback(null, toResponse(422, 'errors', { error: message }));
            }

            const item = await PersonaModel.Guardar(value)
            if (!item) {
                callback(null, toResponse(400, 'errors', `Ya se encuentra registrado ${value.name}, intente con otro nombre.`));
            }
            callback(null, toResponse(201, 'success', item))
        } catch (error) {
            console.log('error crear::', error)
            callback(null, toResponse(400, 'errors', error));
        }
    }

    static eliminarPersona = async(event, context, callback) => {
        try {
            const { error, value } = PersonaValidator.Id(event, callback)
            if (error) {
                const message = error.details.map(v => v.message).join(',')
                callback(null, toResponse(422, 'errors', { error: message }));
            }
            const item = await PersonaModel.Eliminar(value.id)
            callback(null, toResponse(200, 'success', 'registro eliminado con éxito'))
        } catch (error) {
            callback(null, toResponse(400, 'errors', error));
        }
    }
}

module.exports = PersonaController;