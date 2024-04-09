import { HTTP_RESPONSE_CODE } from '../constants/constant.js';
import { IApplicationError } from '../interfaces/IApplicationError.js';

export class NotFoundError extends Error implements IApplicationError {
    status: number;
    error: unknown;

    constructor(error: any, message: string) {
        super(message);
        this.status = HTTP_RESPONSE_CODE.NOT_FOUND;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
}
