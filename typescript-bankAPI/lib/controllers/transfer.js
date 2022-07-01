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
exports.SendTransfer = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
class SendTransfer {
    constructor() {
        this.responseWriter = utils_1.ResponseWriter;
        this.makeTransferService = services_1.MakeTransfer;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account_number = req.body.account_number;
                const agency = req.body.agency;
                const amount = req.body.amount;
                const created_at = Date.now();
                const response = yield new this.makeTransferService().execute({ account_number: account_number, agency: agency, amount: amount, type: 'transfer', source_id: req.cookies["user"].account.id, created_at: created_at, id: '' });
                this.responseWriter.sucess(res, 201, response);
            }
            catch (err) {
                this.responseWriter.error(res, err);
            }
        });
    }
}
exports.SendTransfer = SendTransfer;
