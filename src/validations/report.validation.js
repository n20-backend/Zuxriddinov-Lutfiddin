import Joi from "joi";

export const ReportValidation = (body, isUpdate = false) => {
    const schemaReport = Joi.object({
        transportid: Joi.string()
            .guid({ version: 'uuidv4' })
            .when('$isUpdate', { is: true, then: Joi.optional() })
            .required(!isUpdate) 
            .messages({
                'string.base': `"transportid" UUID bo'lishi kerak`,
                'string.empty': `"transportid" bo'sh bo'lmasligi kerak`,
                'any.required': `"transportid" majburiy maydon`,
                'string.guid': `"transportid" noto'g'ri UUID formati`
            }),

        title: Joi.string()
            .min(3)
            .max(255)
            .when('$isUpdate', { is: true, then: Joi.optional() })
            .required(!isUpdate) 
            .messages({
                'string.base': `"title" matn bo'lishi kerak`,
                'string.empty': `"title" bo'sh bo'lmasligi kerak`,
                'any.required': `"title" majburiy maydon`,
                'string.min': `"title" kamida {#limit} ta belgidan iborat bo'lishi kerak`,
                'string.max': `"title" eng ko'pi bilan {#limit} ta belgidan iborat bo'lishi mumkin`
            }),

        description: Joi.string()
            .min(5)
            .max(500)
            .when('$isUpdate', { is: true, then: Joi.optional() })
            .required(!isUpdate)
            .messages({
                'string.base': `"description" matn bo'lishi kerak`,
                'string.empty': `"description" bo'sh bo'lmasligi kerak`,
                'any.required': `"description" majburiy maydon`,
                'string.min': `"description" kamida {#limit} ta belgidan iborat bo'lishi kerak`,
                'string.max': `"description" eng ko'pi bilan {#limit} ta belgidan iborat bo'lishi mumkin`
            }),

    });

    return schemaReport.validate(body, {
        abortEarly: false,
        allowUnknown: false,
        context: { isUpdate }  
    });
};
