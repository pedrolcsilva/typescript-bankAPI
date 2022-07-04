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
exports.UserTable = void 0;
const _1 = require(".");
class UserTable extends _1.myDB {
    insert(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectQuery = `
                SELECT * FROM users WHERE cpf = $1
            `;
                const insertQuery = `
                INSERT INTO users (
                    id,
                    name,
                    cpf,
                    email,
                    birthdate
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5
                ) RETURNING id
            `;
                console.log(user.cpf);
                const verifyUser = yield this.validate(user);
                if (JSON.parse(JSON.stringify(verifyUser)).resp == "user does not exist") {
                    const result = yield this.client.query(insertQuery, [
                        user.id,
                        user.name,
                        user.cpf,
                        user.email,
                        new Date(user.birthdate)
                    ]);
                    if (result.rows.length !== 0) {
                        return true;
                    }
                    return false;
                }
                else {
                    return JSON.parse(JSON.stringify(verifyUser)).resp;
                }
            }
            catch (err) {
                throw new Error("503: error inserting user into database");
            }
        });
    }
    validate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectQuery = `
                SELECT * FROM users WHERE cpf = $1
            `;
                const verifyUser = yield this.client.query(selectQuery, [user.cpf]);
                if (verifyUser.rows.length != 0) {
                    return {
                        resp: verifyUser.rows[0].id
                    };
                }
                else {
                    return {
                        resp: "user does not exist"
                    };
                }
            }
            catch (err) {
                throw new Error("503: error validating user into database");
            }
        });
    }
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectQuery = `
                SELECT * FROM users WHERE id = $1
            `;
                const verifyUser = yield this.client.query(selectQuery, [id]);
                if (verifyUser.rows.length != 0) {
                    return {
                        resp: verifyUser.rows[0]
                    };
                }
                else {
                    return {
                        resp: "user does not found"
                    };
                }
            }
            catch (err) {
                throw new Error("503: error validating user into database");
            }
        });
    }
}
exports.UserTable = UserTable;
