"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWriter = void 0;
class ResponseWriter {
    static error(res, error) {
        const [statusCode, messages] = error.message.split(": ");
        if (Number(statusCode)) {
            res.status(Number(statusCode)).json({ data: {}, messages: messages.split("|").filter((message) => message !== "") });
        }
        else {
            res.status(500).json({ data: {}, messages: ["unexpected error"] });
        }
    }
    static sucess(res, statusCode, response) {
        res.status(statusCode).json(response);
    }
}
exports.ResponseWriter = ResponseWriter;
