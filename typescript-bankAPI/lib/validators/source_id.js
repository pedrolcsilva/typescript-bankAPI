"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceIdValidator = void 0;
class SourceIdValidator {
    constructor(source_id) {
        this.errors = "";
        this.source_id = this.validate(source_id);
    }
    validate(source_id) {
        if (!source_id) {
            this.errors += "|Source_id was not informed";
            return "";
        }
        else {
            if (source_id.length != 36) {
                this.errors += "|Source_id is not a valid id";
                return "";
            }
        }
        return source_id.trim();
    }
}
exports.SourceIdValidator = SourceIdValidator;
