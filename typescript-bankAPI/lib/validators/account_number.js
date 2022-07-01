"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountNumberValidator = void 0;
class AccountNumberValidator {
    constructor(account_number, type) {
        this.errors = "";
        this.account_number = this.validate(account_number, type);
    }
    validate(account_number, type) {
        if (!account_number && type == "transfer") {
            this.errors += "|account_number was not informed";
            return "";
        }
        else {
            if (account_number.length != 9 && type == 'transfer') {
                this.errors += "|account_number is not a valid account number";
                return "";
            }
            if (isNaN(Number(account_number))) {
                this.errors += "|account_number is not a number";
                return "";
            }
        }
        return account_number.trim();
    }
}
exports.AccountNumberValidator = AccountNumberValidator;
