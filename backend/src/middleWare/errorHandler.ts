import { NextFunction, Request, Response } from "express";
import { APP_ERROR_MESSAGE } from "../constants/constant.js";
import { IApplicationError } from "../interfaces/IApplicationError.js";

export function errorHandler(
    error: IApplicationError,
    request: Request,
    response: Response,
    next: NextFunction) {

    const status = error.status || 500;
    const message = status === 500 ? APP_ERROR_MESSAGE.serverError : error.message;

    if (status === 500) {
        console.error(error);
    }

    const errorDetails = process.env.NODE_ENV === "development" ?
        error.stack : undefined;

    response.status(status).send({
        status,
        message,
        ...(errorDetails ? { details: errorDetails } : {}),
        ...(error.error && { error: error.error })
    });
}

