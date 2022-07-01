import { NameValidator, EmailValidator, CpfValidator, BirthValidator } from ".";
import {User} from '../models';

class UserValidator {
    public user: Partial<User>;
    public errors: string;

    private nameValidator = NameValidator;
    private emailValidator = EmailValidator;
    private cpfValidator = CpfValidator;
    private birthValidator = BirthValidator;

    public constructor(user: User){
        this.errors = "";
        this.user = this.validate(user);
    }

    public validate(user: User): Partial<User> {
        const name = new this.nameValidator(user.name);
        const email = new this.emailValidator(user.email);
        const cpf = new this.cpfValidator(user.cpf);
        const birthdate = new this.birthValidator(user.birthdate);

        this.errors = this.errors.concat(`${name.errors}${email.errors}${cpf.errors}${birthdate.errors}`);

        const USER_DATA : Partial<User> = {
            name: name.name,
            email: email.email,
            cpf: cpf.cpf,
            birthdate: birthdate.birthdate
        }

        return USER_DATA;
    }
}

export {UserValidator};