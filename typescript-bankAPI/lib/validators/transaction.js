"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionValidator = void 0;
const _1 = require(".");
class TransactionValidator {
    constructor(transaction) {
        this.typeValidator = _1.TypeValidator;
        this.amountValidator = _1.AmountValidator;
        this.sourceIdValidator = _1.SourceIdValidator;
        this.accountNumberValidator = _1.AccountNumberValidator;
        this.accountAgencyValidator = _1.AccountAgencyValidator;
        this.errors = "";
        this.transaction = this.validate(transaction);
    }
    validate(transaction) {
        const type = new this.typeValidator(transaction.type);
        const source_id = new this.sourceIdValidator(transaction.source_id);
        const account_number = new this.accountNumberValidator(transaction.account_number, type.type);
        const agency = new this.accountAgencyValidator(transaction.agency, type.type);
        const amount = new this.amountValidator(transaction.amount, transaction.type);
        this.errors = this.errors.concat(`${type.errors}${amount.errors}${source_id.errors}${account_number.errors}`);
        const TRANSACTION_DATA = {
            type: type.type,
            amount: amount.amount,
            source_id: source_id.source_id,
            account_number: account_number.account_number,
            agency: agency.agency
        };
        return TRANSACTION_DATA;
    }
}
exports.TransactionValidator = TransactionValidator;
