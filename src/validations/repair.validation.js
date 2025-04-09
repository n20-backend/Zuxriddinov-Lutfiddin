import Joi from "joi";

export const RepairValidation = (body) => {
    const schema = Joi.object({
        transportid: Joi.string()
            .guid({ version: ['uuidv4'] })
            .required(!isUpdate)
            .messages({
                'string.guid': `"transportid" to'g'ri UUID (v4) formatida bo'lishi kerak`
            }),

        description: Joi.string()
            .trim()
            .min(5)
            .required(!isUpdate)
            .messages({
                'string.base': `"description" matn bo'lishi kerak`,
                'string.min': `"description" kamida {#limit} belgidan iborat bo'lishi kerak`
            }),

        cost: Joi.number()
            .positive()
            .required(!isUpdate)
            .messages({
                'number.base': `"cost" raqam bo'lishi kerak`,
                'number.positive': `"cost" musbat raqam bo'lishi kerak`
            }),

        date: Joi.date()
            .iso()
            .required(!isUpdate)
            .messages({
                'date.base': `"date" to'g'ri sana formatida bo'lishi kerak (YYYY-MM-DD)`
            }),

        status: Joi.string()
            .valid("pending", "in_progress", "completed")
            .required(!isUpdate)
            .messages({
                'any.only': `"status" faqat "pending", "in_progress", yoki "completed" bo'lishi mumkin`
            })
    });

    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: false
    });
};
