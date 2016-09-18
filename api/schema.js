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
        members: Joi.string().required(),
        drivers: Joi.string().required(),
        specials: Joi.string().required(),
    }).unknown(false)
};

module.exports = schema;