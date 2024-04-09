import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../exceptions/ValidationError.js';
import { APP_ERROR_MESSAGE } from '../constants/constant.js';
import Joi from 'joi';

export const validate = (schema: Joi.Schema, property: 'body' | 'query' | 'params') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property]);

        if (!error) {
            next();
        } else {
            if (error instanceof Joi.ValidationError) {
                const message = error.details.map((i: Joi.ValidationErrorItem) => i.message).join(',');
                next(new ValidationError(APP_ERROR_MESSAGE.badRequest, message));
            } else {
                next(new Error('An unexpected error occurred'));
            }
        }
    }
}

