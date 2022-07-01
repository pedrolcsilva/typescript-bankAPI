"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameValidator = void 0;
class NameValidator {
    constructor(name) {
        this.errors = "";
        this.name = this.validate(name);
    }
    validate(name) {
        const regex = /[0-9]/;
        if (!name) {
            this.errors += "|Name was not informed";
            return "";
        }
        if (regex.test(name)) {
            this.errors += "|Name has numbers";
            return "";
        }
        return name.trim();
    }
}
exports.NameValidator = NameValidator;
