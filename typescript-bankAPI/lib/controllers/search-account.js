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
exports.SearchAccount = void 0;
const postgres_1 = require("../clients/dao/postgres");
const utils_1 = require("../utils");
class SearchAccount extends postgres_1.myDB {
    constructor() {
        super(...arguments);
        this.responseWriter = utils_1.ResponseWriter;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let selectQuery = `
                SELECT * FROM accounts WHERE id = $1
            `;
                ;
                console.log('G');
                const USER_ID = JSON.parse(req.cookies["user"]).id;
                const USERS_ACCOUNT = yield this.client.query(selectQuery, [USER_ID]);
                selectQuery = `
                SELECT * FROM users WHERE id = $1
            `;
                const USER_DATA = yield this.client.query(selectQuery, [USER_ID]);
                const SESSION_DATA = {
                    user: USER_DATA.rows[0],
                    account: USERS_ACCOUNT.rows[0]
                };
                console.log(USER_ID);
                this.responseWriter.sucess(res, 200, { data: SESSION_DATA, messages: [] });
            }
            catch (err) {
                this.responseWriter.error(res, err);
            }
        });
    }
}
exports.SearchAccount = SearchAccount;
