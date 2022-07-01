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
const utils_1 = require("../utils");
const postgres_1 = require("../clients/dao/postgres");
class AccessAccount extends postgres_1.myDB {
    constructor() {
        super(...arguments);
        this.responseWriter = utils_1.ResponseWriter;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let selectQuery = `
                SELECT * FROM accounts WHERE account_number = $1 AND agency = $2
            `;
                ;
                const USERS_ACCOUNT = yield this.client.query(selectQuery, [
                    req.body.number,
                    req.body.agency
                ]);
                selectQuery = `
                SELECT * FROM users WHERE id = $1 AND cpf = $2
            `;
                const USER_DATA = yield this.client.query(selectQuery, [
                    USERS_ACCOUNT.rows[0].id,
                    req.body.cpf
                ]);
                res.cookie("user", JSON.stringify(USER_DATA.rows[0]));
                this.responseWriter.sucess(res, 200, { data: USER_DATA.rows[0], messages: [] });
            }
            catch (err) {
                this.responseWriter.error(res, err);
            }
            finally {
            }
        });
    }
}
exports.AccessAccount = AccessAccount;
