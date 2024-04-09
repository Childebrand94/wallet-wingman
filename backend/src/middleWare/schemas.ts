import Joi from 'joi'

export const userBody = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const userParams = Joi.alternatives().try(
    Joi.object().keys({
        param: Joi.string().required()
    }),
    Joi.object().keys({
        param: Joi.string().email().required()
    })
);


export const userParamsEmail = Joi.object().keys({
})
