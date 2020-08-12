const Joi = require('joi');

async function validate(user, callback) {
    const user_schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z]\\w{3,30}$')).required(),
        password_repeat: Joi.ref('password'),
        phoneNumber: Joi.string().pattern(new RegExp('^01[0|1|2|5][0-9]{8}$')).required(),
        avatar: Joi.any(),
        gender: Joi.string().required(),
    });
    try {
        await user_schema.validateAsync(user);
        callback(null);
    } catch (err) {
        callback(err);
    }
}

module.exports = validate;