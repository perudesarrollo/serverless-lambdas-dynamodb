'use strict';
const Joi = require('joi')
const Uuid = require('uuid')

class PersonaValidator {
    static Crear = event => {
        const schema = Joi.object({
            id: Joi.string().allow('', null).empty(['', null]).default(Uuid.v1()),
            name: Joi.string().min(3).required(),
            birth_year: Joi.string().min(4),
            eye_color: Joi.string(),
            gender: Joi.string().min(3).required().valid('male', 'female'),
            hair_color: Joi.string().min(3).required(),
            height: Joi.string().min(2).required(),
            mass: Joi.string().min(1).required(),
            skin_color: Joi.string().min(3).required(),
            homeworld: Joi.string().min(3).required(),
            films: Joi.array().items(Joi.string()).allow('', null).empty(['', null]).default([]),
            species: Joi.array().items(Joi.string()).allow('', null).empty(['', null]).default([]),
            starships: Joi.array().items(Joi.string()).allow('', null).empty(['', null]).default([]),
            vehicles: Joi.array().items(Joi.string()).allow('', null).empty(['', null]).default([]),
            url: Joi.string().min(3),
            created: Joi.string().allow('', null).empty(['', null]).default(new Date().toISOString()),
            edited: Joi.string().allow('', null).empty(['', null]).default(new Date().toISOString())
        })
        let bodyJson = (event.httpMethod) ? JSON.parse(event.body) : event.body;
        return schema.validate(bodyJson)
    }

    static Id = event => {
        const schema = Joi.object({
            id: Joi.string().min(3).required(),
        })
        return schema.validate(event.pathParameters)
    }
}

module.exports = PersonaValidator;