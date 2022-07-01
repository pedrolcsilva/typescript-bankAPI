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
exports.DepositOperation = void 0;
const _1 = require(".");
class DepositOperation extends _1.myDB {
    deposit(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = `
                UPDATE accounts SET balance = balance + $1 WHERE id = $2;
            `;
                const deposit = yield this.client.query(updateQuery, [transaction.amount, transaction.source_id]);
                if (deposit.rows.length !== 0) {
                    return true;
                }
                return false;
            }
            catch (err) {
                throw new Error("503: error while updating accounts balance into database");
            }
        });
    }
}
exports.DepositOperation = DepositOperation;
