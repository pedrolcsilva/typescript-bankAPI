"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionTreatment = void 0;
class ExceptionTreatment {
    constructor(error, status = 500, message = "unexpected error") {
        const [statusCode] = error.message.split(": ");
        if (Number(statusCode))
            throw error;
        else
            throw new Error(`${status}: ${message}`);
    }
}
exports.ExceptionTreatment = ExceptionTreatment;
