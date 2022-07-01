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
exports.AccessAccount = void 0;
const postgres_1 = require("../clients/dao/postgres");
const account_1 = require("../clients/dao/postgres/account");
const user_1 = require("../clients/dao/postgres/user");
const utils_1 = require("../utils");
class AccessAccount extends postgres_1.myDB {
    constructor() {
        super(...arguments);
        this.responseWriter = utils_1.ResponseWriter;
        this.userTable = user_1.UserTable;
        this.accountTable = account_1.AccountTable;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const USER_ID = req.cookies["user"].user.id;
                const ACCOUNT_ID = req.cookies["user"].account.id;
                const USER_DATA = yield new this.userTable().getData(USER_ID);
                const ACCOUNT_DATA = yield new this.accountTable().getData(ACCOUNT_ID);
                const SESSION_DATA = {
                    user: USER_DATA,
                    account: ACCOUNT_DATA
                };
                this.responseWriter.sucess(res, 200, { data: SESSION_DATA, messages: [] });
            }
            catch (err) {
                this.responseWriter.error(res, err);
            }
        });
    }
}
exports.AccessAccount = AccessAccount;
