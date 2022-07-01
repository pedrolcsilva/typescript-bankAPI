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
exports.InsertAccount = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
class InsertAccount {
    constructor() {
        this.responseWriter = utils_1.ResponseWriter;
        this.createUserService = services_1.CreateUser;
        this.createAccountService = services_1.CreateAccount;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partial_response = yield new this.createUserService().execute(req.body);
                const response = yield new this.createAccountService().execute(partial_response.data, req.body.password);
                this.responseWriter.sucess(res, 201, response);
            }
            catch (err) {
                this.responseWriter.error(res, err);
            }
        });
    }
}
exports.InsertAccount = InsertAccount;
