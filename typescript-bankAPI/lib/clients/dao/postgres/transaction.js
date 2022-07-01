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
exports.TransactionTable = void 0;
const _1 = require(".");
class TransactionTable extends _1.myDB {
    insert(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insertQuery = `
                INSERT INTO transactions (
                    id,
                    type,
                    amount,
                    source_id
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4
                ) RETURNING id
            `;
                const result = yield this.client.query(insertQuery, [
                    transaction.id,
                    transaction.type,
                    transaction.amount,
                    transaction.source_id
                ]);
                if (result.rows.length !== 0) {
                    return true;
                }
                return false;
            }
            catch (err) {
                throw new Error("503: error inserting transaction into database");
            }
        });
    }
}
exports.TransactionTable = TransactionTable;
