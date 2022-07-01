"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthValidator = void 0;
class BirthValidator {
    constructor(birthdate) {
        this.errors = "";
        this.birthdate = this.validate(birthdate);
    }
    validate(birthdate) {
        if (!birthdate) {
            this.errors += "|Birthdate was not informed";
            return "";
        }
        if (!new Date(birthdate).getTime()) {
            this.errors += "|Invalid birthdate";
            return "";
        }
        return birthdate.trim();
    }
}
exports.BirthValidator = BirthValidator;
