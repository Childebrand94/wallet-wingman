import { HTTP_RESPONSE_CODE } from '../constants/constant.js';
import { IApplicationError } from '../interfaces/IApplicationError.js';

export class ValidationError extends Error implements IApplicationError {
    status: number;
    error: unknown;

    constructor(error: any, message: string) {
        super(message);
        this.status = HTTP_RESPONSE_CODE.BAD_REQUEST;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
}
