"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpfValidator = void 0;
class CpfValidator {
    constructor(cpf) {
        this.errors = "";
        this.cpf = this.validate(cpf);
    }
    validate(cpf) {
        const regex = /((\d{2})[.]?(\d{3})[.]?(\d{3})[/]?(\d{4})[-]?(\d{2}))|((\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2}))/gm;
        if (!cpf) {
            this.errors += "|CPF was not informed";
            return "";
        }
        if (!regex.test(cpf)) {
            this.errors += "|Invalid CPF format";
            return "";
        }
        return cpf.replace('.', '').replace('.', '').replace('-', '').trim();
    }
}
exports.CpfValidator = CpfValidator;
