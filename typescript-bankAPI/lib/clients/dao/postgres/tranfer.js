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
exports.TransferOperation = void 0;
const _1 = require(".");
class TransferOperation extends _1.myDB {
    transfer(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const withdrawQuery = `
            UPDATE accounts SET balance = balance - $1 WHERE id = $2;
            `;
                const withdraw = yield this.client.query(withdrawQuery, [
                    transaction.amount,
                    transaction.source_id
                ]);
                const depositQuery = `
            UPDATE accounts SET balance = balance + $1 WHERE account_number = $2 AND agency = $3;
            `;
                console.log(transaction);
                const deposit = yield this.client.query(depositQuery, [
                    transaction.amount,
                    transaction.account_number,
                    transaction.agency
                ]);
                if (withdraw.rows.length !== 0 && deposit.rows.length !== 0) {
                    return true;
                }
                return false;
            }
            catch (err) {
                throw new Error("503: error updating accounts balance into database");
            }
        });
    }
}
exports.TransferOperation = TransferOperation;
