"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = void 0;
class PasswordValidator {
    constructor(password) {
        this.errors = "";
        this.password = this.validate(password);
    }
    validate(password) {
        if (!password) {
            this.errors += "|Password was not informed";
            return "";
        }
        if (isNaN(Number(password))) {
            this.errors += "|Password need to have only numbers";
            return "";
        }
        if (password.length != 4) {
            this.errors += "|Password need to have four digits";
            return "";
        }
        return password;
    }
}
exports.PasswordValidator = PasswordValidator;
