"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountValidator = void 0;
class AmountValidator {
    constructor(amount, type) {
        this.errors = "";
        this.amount = this.validate(amount, type);
    }
    validate(amount, type) {
        if (!amount) {
            this.errors += "|Amount was not informed";
            return "";
        }
        if (isNaN(Number(amount))) {
            this.errors += "|Amount is not a number";
            return "";
        }
        if (Number(amount) <= 0) {
            this.errors += "|Amount is a invalid value";
            return "";
        }
        if (type == 'deposit')
            amount = "" + (Number(amount) * 0.99);
        else if (type == 'withdraw')
            amount = "" + (Number(amount) + 4);
        else if (type == 'transfer')
            amount = "" + (Number(amount) + 1);
        return amount;
    }
}
exports.AmountValidator = AmountValidator;
