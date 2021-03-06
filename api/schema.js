var Joi = require('joi');

var schema = {
    event: Joi.object().keys({
        name: Joi.string().required(),
        comments: Joi.string(),
        hours: Joi.number().required(),
        driverHours: Joi.number(),
        extraHours: Joi.number(),
        isOnCampus: Joi.boolean().required(),
        meetingPlace: Joi.string().required(),
        startDateTime: Joi.date().iso().required(),
        endDateTime: Joi.date().iso().min(Joi.ref('startDateTime')).required(),
        uniform: Joi.string().required(),
        members: Joi.array().items(Joi.string()).required(),
        drivers: Joi.array().items(Joi.string()).required(),
        specials: Joi.array().items(Joi.string()).required(),
    }).unknown(false),

    member: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        hours: Joi.number(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        year: Joi.number().required()
    }).unknown(false),

    newUser: Joi.object().keys({
        username: Joi.string().required().trim(),
        password: Joi.string().required().min(8).trim()
    }).unknown(false)
};

module.exports = schema;