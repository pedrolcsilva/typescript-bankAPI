import { AccountTable } from "../clients/dao/postgres/account";
import { Account } from "../models";
import { PasswordValidator } from "./password";

class AccountValidator {
    public account: Partial<Account>;
    public password: string;
    public errors: string;
    private accountTable = AccountTable;
    private passwordValidator = PasswordValidator;

    public constructor(password: string){
        this.password = password;
        this.errors = "";
        this.account = this.validate();
    }

    public validate(): Partial<Account> {
        try {
            let accountPassword = new this.passwordValidator(this.password);

            this.errors = this.errors.concat(`${accountPassword.errors}`);
            
            const ACCOUNT_DATA : Partial<Account> = {
                password: accountPassword.password
            }

            return ACCOUNT_DATA;

        }catch(err){
            throw new Error("400: unexpected error")
        }
    }
}

export {AccountValidator};