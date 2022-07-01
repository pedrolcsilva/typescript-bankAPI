"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountValidator = void 0;
const account_1 = require("../clients/dao/postgres/account");
const password_1 = require("./password");
class AccountValidator {
    constructor(password) {
        this.accountTable = account_1.AccountTable;
        this.passwordValidator = password_1.PasswordValidator;
        this.password = password;
        this.errors = "";
        this.account = this.validate();
    }
    validate() {
        try {
            let accountPassword = new this.passwordValidator(this.password);
            this.errors = this.errors.concat(`${accountPassword.errors}`);
            const ACCOUNT_DATA = {
                password: accountPassword.password
            };
            return ACCOUNT_DATA;
        }
        catch (err) {
            throw new Error("400: unexpected error");
        }
    }
}
exports.AccountValidator = AccountValidator;
