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
exports.Extract = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
class Extract {
    constructor() {
        this.responseWriter = utils_1.ResponseWriter;
        this.getExtract = services_1.GetExtract;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.cookies["user"].account.id;
                const response = yield new this.getExtract().execute(id);
                this.responseWriter.sucess(res, 200, response);
            }
            catch (err) {
                this.responseWriter.error(res, err);
            }
        });
    }
}
exports.Extract = Extract;
