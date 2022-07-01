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
exports.MakeDeposit = void 0;
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const uuid_1 = require("uuid");
const transaction_1 = require("../clients/dao/postgres/transaction");
const deposit_1 = require("../clients/dao/postgres/deposit");
class MakeDeposit {
    constructor() {
        this.transactionValidator = validators_1.TransactionValidator;
        this.transactionTable = transaction_1.TransactionTable;
        this.depositOperation = deposit_1.DepositOperation;
    }
    execute(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TRANSACTION_DATA = new this.transactionValidator(transaction);
                if (TRANSACTION_DATA.errors) {
                    throw new Error(`400: ${TRANSACTION_DATA.errors}`);
                }
                TRANSACTION_DATA.transaction.id = (0, uuid_1.v4)();
                const dbInsertion = yield new this.transactionTable().insert(TRANSACTION_DATA.transaction);
                if (dbInsertion) {
                    const dbTransfer = yield new this.depositOperation().deposit(TRANSACTION_DATA.transaction);
                    return {
                        data: TRANSACTION_DATA.transaction,
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["error while creating deposit transaction"]
                };
            }
            catch (err) {
                throw new utils_1.ExceptionTreatment(err, 500, "deposit transaction insertion in database failed");
            }
        });
    }
}
exports.MakeDeposit = MakeDeposit;
