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
exports.CreateAccount = void 0;
const account_1 = require("../clients/dao/postgres/account");
const utils_1 = require("../utils");
const uuid_1 = require("uuid");
const validators_1 = require("../validators");
const services_1 = require("../services");
class CreateAccount {
    constructor() {
        this.accountTable = account_1.AccountTable;
        this.accountValidator = validators_1.AccountValidator;
        this.encryptor = services_1.Encryptor;
    }
    execute(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let account = yield new this.accountValidator(password);
                let accountPassword = JSON.parse(JSON.stringify(account.account)).password;
                const encryptedPassword = yield new this.encryptor().encrypt(accountPassword);
                let accountNumber = "";
                let agencyNumber = "";
                let verifyAccount;
                do {
                    accountNumber = "";
                    agencyNumber = "";
                    for (let i = 0; i < 9; i++) {
                        accountNumber += Math.floor(Math.random() * 10);
                    }
                    for (let i = 0; i < 4; i++) {
                        agencyNumber += Math.floor(Math.random() * 10);
                    }
                    verifyAccount = yield new this.accountTable().validate(accountNumber, agencyNumber);
                } while (verifyAccount);
                if (account.errors) {
                    throw new Error(`400: ${account.errors}`);
                }
                const ACCOUNT_DATA = {
                    id: (0, uuid_1.v4)(),
                    owner_id: user.id,
                    account_number: accountNumber,
                    verifying_account_digit: accountNumber[accountNumber.length - 1],
                    agency: agencyNumber,
                    verifying_agency_digit: agencyNumber[agencyNumber.length - 1],
                    balance: '0',
                    password: encryptedPassword
                };
                const dbInsertion = yield new this.accountTable().insert(ACCOUNT_DATA);
                if (dbInsertion) {
                    return {
                        data: ACCOUNT_DATA,
                        messages: []
                    };
                }
                return {
                    data: ACCOUNT_DATA,
                    messages: ['error while creating account']
                };
            }
            catch (err) {
                throw new utils_1.ExceptionTreatment(err, 500, "account insertion in database failed");
            }
        });
    }
}
exports.CreateAccount = CreateAccount;
