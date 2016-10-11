var Joi = require('joi');

var schema = {
    event: Joi.object().keys({
        name: Joi.string().required(),
        comments: Joi.string().required(),
        hours: Joi.number().required(),
        driverHours: Joi.number().required(),
        extraHours: Joi.number().required(),
        isOnCampus: Joi.boolean().required(),
        meetingPlace: Joi.string().required(),
        startDateTime: Joi.date().iso(),
        endDateTime: Joi.date().iso().min(Joi.ref('startDateTime')),
        uniform: Joi.string().required(),
        members: Joi.array().items(Joi.string()).required(),
        drivers: Joi.array().items(Joi.string()).required(),
        specials: Joi.array().items(Joi.string()).required(),
    }).unknown(false),

    member: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        hours: Joi.number()
    }).unknown(false)
};

module.exports = schema;