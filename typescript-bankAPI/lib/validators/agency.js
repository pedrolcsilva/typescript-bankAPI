"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAgencyValidator = void 0;
class AccountAgencyValidator {
    constructor(agency, type) {
        this.errors = "";
        this.agency = this.validate(agency, type);
    }
    validate(agency, type) {
        if (!agency && (type == "transfer" || type == "withdraw")) {
            this.errors += "|agency was not informed";
            return "";
        }
        else {
            if (agency.length != 4 && type != 'deposit') {
                this.errors += "|agency is not a valid account number";
                return "";
            }
            if (isNaN(Number(agency))) {
                this.errors += "|agency is not a number";
                return "";
            }
        }
        return agency.trim();
    }
}
exports.AccountAgencyValidator = AccountAgencyValidator;
