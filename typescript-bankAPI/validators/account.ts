import { Account } from "../models";
import { AccountNumberValidator } from "./account_number";
import { AccountAgencyValidator } from "./agency";
import { PasswordValidator } from "./password";

class AccountValidator {
    public account: Partial<Account>;
    public errors: string;
    
    private accountNumberValidator = AccountNumberValidator;
    private accountAgencyValidator = AccountAgencyValidator;

    public constructor(account: Partial<Account>){
        this.errors = "";
        this.account = this.validate(account);
    }

    public validate(account: Partial<Account>): Partial<Account> {
        try {
            const account_number = new this.accountNumberValidator(account.account_number as string);
            const agency = new this.accountAgencyValidator(account.agency as string, 'transfer');

            this.errors = this.errors.concat(`${account_number.errors}${agency.errors}`);
            
            const ACCOUNT_DATA = {
                account_number: account_number.account_number,
                agency: agency.agency
            } as any;
            return ACCOUNT_DATA;
            
        } catch (error) {
            throw new Error("400: unexpected error")
        }
    }

  
}

export {AccountValidator};