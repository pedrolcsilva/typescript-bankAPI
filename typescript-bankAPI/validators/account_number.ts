class AccountNumberValidator {

    public account_number: string;
    public errors: string;

    public constructor (account_number: string, type: string){
        this.errors = "";
        this.account_number = this.validate(account_number, type);
    }

    public validate (account_number: string, type: string): string {
        
        if(!account_number && type == "transfer"){
            this.errors += "|account_number was not informed";
            return "";
        }
        else{
            if(account_number.length != 9 && type == 'transfer'){
                this.errors += "|account_number is not a valid account number";
                return "";
            }

            if(isNaN(Number(account_number))){
                this.errors += "|account_number is not a number";
                return "";
            }
        }
        
        return account_number.trim();

    }

}

export {AccountNumberValidator}