"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeTransfer = void 0;
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const uuid_1 = require("uuid");
const transaction_1 = require("../clients/dao/postgres/transaction");
const tranfer_1 = require("../clients/dao/postgres/tranfer");
const account_balance_1 = require("../clients/dao/postgres/account_balance");
const account_1 = require("../clients/dao/postgres/account");
class MakeTransfer {
    constructor() {
        this.transactionValidator = validators_1.TransactionValidator;
        this.transactionTable = transaction_1.TransactionTable;
        this.transferOperation = tranfer_1.TransferOperation;
        this.accountBalance = account_balance_1.AccountBalance;
        this.accountTable = account_1.AccountTable;
    }
    execute(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TRANSACTION_DATA = new this.transactionValidator(transaction);
                const AmountIsBiggerThenAccountBalance = yield new this.accountBalance().get(TRANSACTION_DATA.transaction.source_id, TRANSACTION_DATA.transaction.amount);
                if (AmountIsBiggerThenAccountBalance) {
                    TRANSACTION_DATA.errors += "|Amount is bigger than account balance";
                    TRANSACTION_DATA.transaction.amount = '';
                }
                if (TRANSACTION_DATA.errors) {
                    throw new Error(`400: ${TRANSACTION_DATA.errors}`);
                }
                const accountExists = yield new this.accountTable().validate(TRANSACTION_DATA.transaction.account_number, TRANSACTION_DATA.transaction.agency);
                if (!accountExists) {
                    throw new Error(`404: account does not exist`);
                }
                TRANSACTION_DATA.transaction.id = (0, uuid_1.v4)();
                const dbInsertion = yield new this.transactionTable().insert(TRANSACTION_DATA.transaction);
                if (dbInsertion) {
                    const dbTransfer = yield new this.transferOperation().transfer(TRANSACTION_DATA.transaction);
                    return {
                        data: TRANSACTION_DATA.transaction,
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["error while creating transfer transaction"]
                };
            }
            catch (err) {
                throw new utils_1.ExceptionTreatment(err, 500, "transfer transaction insertion in database failed");
            }
        });
    }
}
exports.MakeTransfer = MakeTransfer;
