class AccountAgencyValidator {

    public agency: string;
    public errors: string;

    public constructor (agency: string, type: string){
        this.errors = "";
        this.agency = this.validate(agency, type);
    }

    public validate (agency: string, type: string): string {
        
        if(!agency  && (type == "transfer" || type == "withdraw")){
            this.errors += "|agency was not informed";
            return "";
        }
        else{
            if(agency.length != 4 && type != 'deposit'){
                this.errors += "|agency is not a valid account number";
                return "";
            }

            if(isNaN(Number(agency))){
                this.errors += "|agency is not a number";
                return "";
            }
        }
        
        return agency.trim();

    }

}

export {AccountAgencyValidator}