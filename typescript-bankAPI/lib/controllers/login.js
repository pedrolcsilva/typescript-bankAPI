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
exports.LoginAccount = void 0;
const utils_1 = require("../utils");
const postgres_1 = require("../clients/dao/postgres");
const account_1 = require("../clients/dao/postgres/account");
const user_1 = require("../clients/dao/postgres/user");
class LoginAccount extends postgres_1.myDB {
    constructor() {
        super(...arguments);
        this.responseWriter = utils_1.ResponseWriter;
        this.accountTable = account_1.AccountTable;
        this.userTable = user_1.UserTable;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partial_response = yield new this.accountTable().login(req.body);
                const response = yield new this.userTable().getData(JSON.parse(JSON.stringify(partial_response)).owner_id);
                const USER_DATA = {
                    user: JSON.parse(JSON.stringify(response)).resp,
                    account: JSON.parse(JSON.stringify(partial_response))
                };
                res.cookie("user", USER_DATA);
                this.responseWriter.sucess(res, 200, { data: USER_DATA.account, messages: [] });
            }
            catch (err) {
                this.responseWriter.error(res, err);
            }
        });
    }
}
exports.LoginAccount = LoginAccount;
