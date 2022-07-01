"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeValidator = void 0;
class TypeValidator {
    constructor(type) {
        this.errors = "";
        this.type = this.validate(type);
    }
    validate(type) {
        const regex = /[0-9]/;
        if (!type) {
            this.errors += "|Type was not informed";
            return "";
        }
        if (regex.test(type)) {
            this.errors += "|Type has numbers";
            return "";
        }
        if (!(type == "deposit" || type == "transfer" || type == "withdraw")) {
            this.errors += "|Type is not valid";
            return "";
        }
        return type.trim();
    }
}
exports.TypeValidator = TypeValidator;
