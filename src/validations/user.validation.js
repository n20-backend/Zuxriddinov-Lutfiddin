import Joi from "joi";

export const UserValidation = (body) => {
    const schemaUsers = Joi.object({
        email: Joi.string()
            .email()
            .trim()
            .custom((value, helpers) => {
                if (value && !value.endsWith('@gmail.com')) {
                    return helpers.message(`"email" faqat @gmail.com bilan tugashi kerak`);
                }
                return value;
            })
            .messages({
                'string.base': `"email" matn bo'lishi kerak`,
                'string.email': `"email" to'g'ri email formatida bo'lishi kerak`,
                'string.empty': `"email" bo'sh bo'lmasligi kerak`,   
                'any.required': `"email" majburiy maydon`
            }),
        
        user_name: Joi.string()
            .min(3)
            .max(50)
            .optional() 
            .trim()
            .messages({
                'string.base': `"user_name" matn bo'lishi kerak`,
                'string.empty': `"user_name" bo'sh bo'lmasligi kerak`,
                'string.min': `"user_name" kamida {#limit} ta belgidan iborat bo'lishi kerak`,
                'string.max': `"user_name" eng ko'pi bilan {#limit} ta belgidan iborat bo'lishi mumkin`
            }),
        
        password: Joi.string()
            .min(8)
            .max(20)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_]).+$/)
            .optional() 
            .trim()
            .messages({
                'string.base': `"password" matn bo'lishi kerak`,
                'string.empty': `"password" bo'sh bo'lmasligi kerak`,
                'string.min': `"password" kamida {#limit} ta belgidan iborat bo'lishi kerak`,
                'string.max': `"password" eng ko'pi bilan {#limit} ta belgidan iborat bo'lishi mumkin`,
                'string.pattern.base': `"password" kamida bitta katta harf, bitta kichik harf, bitta raqam, bitta maxsus belgi (masalan: @, #, $, %, _) bo'lishi kerak `
            }),
        
        role: Joi.string()
            .valid("user", "admin", "fleet_manager")
            .optional() 
            .messages({
                'any.only': `"role" faqat "user" yoki "admin" va "fleet_manager" bo'lishi mumkin`,
                'string.empty': `"role" bo'sh bo'lmasligi kerak`
            }),
        
        status: Joi.string()
            .valid("active", "inactive")
            .optional()  
            .messages({
                'any.only': `"status" faqat "active" yoki "inactive" bo'lishi mumkin`,
                'string.empty': `"status" bo'sh bo'lmasligi kerak`
            }),
    });

    return schemaUsers.validate(body, {
        abortEarly: false,
        allowUnknown: false
    });
};
