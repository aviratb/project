const Joi = require('joi');

async function validateAddUser(args) {
    const userSchema = Joi.object({
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
        email: Joi.string().email().required(),
        age: Joi.number().integer().min(1).max(100).required()
    });

    const { error, value: reqObj } = userSchema.validate(args);
    return { error, reqObj };
}

async function validateGetUser(args) {
    const userIdSchema = Joi.object({
        userId: Joi.number().integer().min(0).required()
    });

    const { error, value: reqObj } = userIdSchema.validate(args);
    return { error, reqObj };
}


module.exports = {
    validateAddUser,
    validateGetUser
};
