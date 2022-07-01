"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const _1 = require(".");
class UserValidator {
    constructor(user) {
        this.nameValidator = _1.NameValidator;
        this.emailValidator = _1.EmailValidator;
        this.cpfValidator = _1.CpfValidator;
        this.birthValidator = _1.BirthValidator;
        this.errors = "";
        this.user = this.validate(user);
    }
    validate(user) {
        const name = new this.nameValidator(user.name);
        const email = new this.emailValidator(user.email);
        const cpf = new this.cpfValidator(user.cpf);
        const birthdate = new this.birthValidator(user.birthdate);
        this.errors = this.errors.concat(`${name.errors}${email.errors}${cpf.errors}${birthdate.errors}`);
        const USER_DATA = {
            name: name.name,
            email: email.email,
            cpf: cpf.cpf,
            birthdate: birthdate.birthdate
        };
        return USER_DATA;
    }
}
exports.UserValidator = UserValidator;
