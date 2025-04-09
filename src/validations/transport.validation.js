import Joi from "joi";

export const TransportValidation = (body) => {
    const schema = Joi.object({
        registrationNumber: Joi.string()
            .length(8)
            .pattern(/^\d{2}[A-Z]\d{3}[A-Z]{2}$/)
            .optional()
            .messages({
            "string.pattern.base": `"registrationNumber" formati 50N212BB ko'rinishida bo'lishi kerak`,
            "string.length": `"registrationNumber" aniq 8 belgidan iborat bo'lishi kerak`,
            "string.base": `"registrationNumber" matn ko'rinishida bo'lishi kerak`,
            "string.empty": `"registrationNumber" bo'sh bo'lmasligi kerak`
            }),


        type: Joi.string()
            .optional()
            .messages({
                "string.base": `"type" matn bo'lishi kerak`,
                "string.empty": `"type" bo'sh bo'lmasligi kerak`
            }),

        make: Joi.string()
            .optional()
            .messages({
                "string.base": `"make" matn bo'lishi kerak`,
                "string.empty": `"make" bo'sh bo'lmasligi kerak`
            }),

        model: Joi.string()
            .optional()
            .messages({
                "string.base": `"model" matn bo'lishi kerak`,
                "string.empty": `"model" bo'sh bo'lmasligi kerak`
            }),

        year: Joi.number()
            .integer()
            .min(1900)
            .max(new Date().getFullYear())
            .optional()
            .messages({
                "number.base": `"year" son bo'lishi kerak`,
                "number.min": `"year" {#limit} yildan katta bo'lishi kerak`,
                "number.max": `"year" {#limit} yildan kichik yoki teng bo'lishi kerak`
            }),

        status: Joi.string()
            .valid("available", "in_service", "out_of_service")
            .optional()
            .messages({
                "any.only": `"status" faqat 'available', 'in_service', yoki 'out_of_service' bo'lishi mumkin`,
                "string.base": `"status" matn bo'lishi kerak`
            }),
    });

    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: false,
    });
};
