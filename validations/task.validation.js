const Joi = require('joi');

// Define the validation schema
const taskValidationSchema = Joi.object({
    title: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Title is required.',
            'any.required': 'Title is required.'
        }),
    description: Joi.string()
        .trim()
        .required(),
    status: Joi.string()
        .valid('TODO', 'DONE')
        .default('TODO'),
    createdOn: Joi.date(),
    deadline: Joi.date()
        .greater('now')
        .required()
});

module.exports = taskValidationSchema;
