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
exports.CreateUser = void 0;
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const uuid_1 = require("uuid");
const user_1 = require("../clients/dao/postgres/user");
class CreateUser {
    constructor() {
        this.userValidator = validators_1.UserValidator;
        this.userTable = user_1.UserTable;
    }
    execute(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const USER_DATA = new this.userValidator(user);
                if (USER_DATA.errors) {
                    throw new Error(`400: ${USER_DATA.errors}`);
                }
                USER_DATA.user.id = (0, uuid_1.v4)();
                const dbInsertion = yield new this.userTable().insert(USER_DATA.user);
                if (dbInsertion) {
                    if (typeof dbInsertion == "string")
                        USER_DATA.user.id = dbInsertion;
                    return {
                        data: USER_DATA.user,
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["error while creating user"]
                };
            }
            catch (err) {
                throw new utils_1.ExceptionTreatment(err, 500, "user insertion in database failed");
            }
        });
    }
}
exports.CreateUser = CreateUser;
