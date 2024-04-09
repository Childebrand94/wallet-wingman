import { HTTP_RESPONSE_CODE } from '../constants/constant.js';
import { IApplicationError } from '../interfaces/IApplicationError.js';

export class DatabaseError extends Error implements IApplicationError {
    status: number;
    error: unknown;

    constructor(error: any, message: string) {
        super(message);
        this.status = HTTP_RESPONSE_CODE.SERVER_ERROR;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
}

