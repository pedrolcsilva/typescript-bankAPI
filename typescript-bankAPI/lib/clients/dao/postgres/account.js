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
exports.AccountTable = void 0;
const _1 = require(".");
const services_1 = require("../../../services");
class AccountTable extends _1.myDB {
    constructor() {
        super(...arguments);
        this.encryptor = services_1.Encryptor;
    }
    insert(account) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insertQuery = `
                INSERT INTO accounts (
                    id,
                    owner_id,
                    account_number,
                    verifying_account_digit,
                    agency,
                    verifying_agency_digit,
                    balance,
                    password
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7,
                    $8
                ) RETURNING id
            `;
                const result = yield this.client.query(insertQuery, [
                    account.id,
                    account.owner_id,
                    account.account_number,
                    account.verifying_account_digit,
                    account.agency,
                    account.verifying_agency_digit,
                    account.balance,
                    account.password
                ]);
                if (result.rows.length !== 0) {
                    return true;
                }
                return false;
            }
            catch (err) {
                throw new Error("503: error inserting account into database");
            }
        });
    }
    login(account) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectQuery = `
                SELECT * FROM accounts WHERE account_number = $1 AND agency = $2
            `;
                const USERS_ACCOUNT = yield this.client.query(selectQuery, [
                    account.account_number,
                    account.agency
                ]);
                if (USERS_ACCOUNT.rows.length != 0) {
                    console.log(account.password);
                    console.log(USERS_ACCOUNT.rows[0].password);
                    const isEqual = yield new this.encryptor().decrypt(account.password, USERS_ACCOUNT.rows[0].password);
                    console.log(isEqual);
                    if (isEqual)
                        return USERS_ACCOUNT.rows[0];
                }
                throw new Error("400: password not match");
            }
            catch (err) {
                throw new Error("400: unexpected error");
            }
        });
    }
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectQuery = `
                SELECT * FROM accounts WHERE id = $1
            `;
                const verifyUser = yield this.client.query(selectQuery, [id]);
                if (verifyUser.rows.length != 0) {
                    return {
                        resp: verifyUser.rows[0]
                    };
                }
                else {
                    return {
                        resp: "account does not found"
                    };
                }
            }
            catch (err) {
                throw new Error("400: unexpected error");
            }
        });
    }
    validate(accountNumber, agencyNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectQuery = `
                SELECT * FROM accounts WHERE account_number = $1 AND agency = $2
            `;
                const verifyAccounts = yield this.client.query(selectQuery, [accountNumber, agencyNumber]);
                if (verifyAccounts.rows.length == 0) {
                    return false;
                }
                return true;
            }
            catch (err) {
                throw new Error("400: unexpected error");
            }
        });
    }
}
exports.AccountTable = AccountTable;
