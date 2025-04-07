import Joi from "joi";

export const UserValidation = (body) => {
    const schemaUsers = Joi.object({
        email: Joi.string().email().required().trim(),
        user_name: Joi.string().min(3).max(50).required().trim(),
        password: Joi.string().required().trim(),
        role: Joi.string().valid("user", "admin").required(),
        status: Joi.string().valid("active", "inactive").required()
    });

    // Return full error details if any
    return schemaUsers.validate(body, {
        abortEarly: false, // Return all errors
        allowUnknown: false // Disallow extra fields not in schema
    });
};
