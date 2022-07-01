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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encryptor = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encryptor {
    encrypt(accountPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            let encryptedPassword = yield bcrypt_1.default.hash(accountPassword, salt);
            return encryptedPassword;
        });
    }
    decrypt(accountPassword, encryptedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            let decryptedPassword = yield bcrypt_1.default.compare(accountPassword, encryptedPassword);
            return decryptedPassword;
        });
    }
}
exports.Encryptor = Encryptor;
