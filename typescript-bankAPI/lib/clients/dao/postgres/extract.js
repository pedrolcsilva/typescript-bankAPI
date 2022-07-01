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
const _1 = require(".");
class Extract extends _1.myDB {
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectQuery = `
                SELECT * from transactions WHERE source_id = $1
                ORDER BY created_at
            `;
                const extract = yield this.client.query(selectQuery, [
                    id
                ]);
                if (extract.rows.length != 0) {
                    return extract.rows;
                }
                else {
                    return [''];
                }
            }
            catch (error) {
                throw new Error("503: error reading transactions extract from database");
            }
        });
    }
}
exports.Extract = Extract;
