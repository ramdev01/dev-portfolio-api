const Joi = require('joi');

const postSubmission = async (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name should be at least 2 characters long',
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),
        message: Joi.string().min(1).required().messages({
            'string.empty': 'Message is required',
            'string.min': 'Message should be at least 10 characters long'
        })
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = {
    postSubmission
};
