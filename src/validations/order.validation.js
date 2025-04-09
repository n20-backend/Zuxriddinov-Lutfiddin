import Joi from "joi";

export const OrderValidation = (body) => {
    const schema = Joi.object({
        transportid: Joi.string()
            .guid({ version: ['uuidv4'] })
            .optional()
            .messages({
                'string.guid': `"transportid" to'g'ri UUID (v4) formatida bo'lishi kerak`
            }),

        userid: Joi.string()      
            .guid({ version: ['uuidv4'] })
            .optional()
            .messages({
                'string.guid': `"userid" to'g'ri UUID (v4) formatida bo'lishi kerak`
            }),

        startdate: Joi.date()  
            .iso()
            .optional()
            .messages({
                'date.base': `"startdate" sana formatida bo'lishi kerak`
            }),

        enddate: Joi.date()
            .iso()
            .optional()
            .messages({
                'date.base': `"enddate" sana formatida bo'lishi kerak`
            }),

        status: Joi.string()
            .valid("pending", "approved", "rejected", "completed")
            .optional()
            .messages({
                'any.only': `"status" faqat "pending", "approved", "rejected", yoki "completed" bo'lishi mumkin`
            }),

        totalamount: Joi.number()
            .positive()
            .optional()
            .messages({
                'number.base': `"totalamount" raqam bo'lishi kerak`,
                'number.positive': `"totalamount" musbat raqam bo'lishi kerak`
            }),

        currency: Joi.string()
            .valid("USD", "UZS", "EUR")
            .optional()
            .messages({
                'any.only': `"currency" faqat "USD", "UZS", yoki "EUR" bo'lishi mumkin`
            }),
    });

    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: false
    });
};
