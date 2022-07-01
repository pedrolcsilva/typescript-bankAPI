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
exports.SendDeposit = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
class SendDeposit {
    constructor() {
        this.responseWriter = utils_1.ResponseWriter;
        this.makeDepositService = services_1.MakeDeposit;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const amount = req.body.amount;
                const created_at = Date.now();
                const id = req.cookies["user"].account.id;
                const response = yield new this.makeDepositService().execute({ account_number: '', agency: '', amount: amount, type: 'deposit', source_id: id, created_at: created_at, id: '' });
                this.responseWriter.sucess(res, 200, response);
            }
            catch (err) {
                this.responseWriter.error(res, err);
            }
        });
    }
}
exports.SendDeposit = SendDeposit;
