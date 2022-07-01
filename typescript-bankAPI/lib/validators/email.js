"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = void 0;
class EmailValidator {
    constructor(email) {
        this.errors = "";
        this.email = this.validate(email);
    }
    validate(email) {
        const regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
        if (!email) {
            this.errors += "|Email was not informed";
            return "";
        }
        if (!regex.test(email)) {
            this.errors += "|Invalid email format";
            return "";
        }
        return email.trim();
    }
}
exports.EmailValidator = EmailValidator;
