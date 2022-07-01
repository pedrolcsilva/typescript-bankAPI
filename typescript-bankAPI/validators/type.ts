class TypeValidator {

    public type: string;
    public errors: string;

    public constructor (type: string){
        this.errors = "";
        this.type = this.validate(type);
    }

    public validate (type: string): string {
        const regex = /[0-9]/;
        
        if(!type){
            this.errors += "|Type was not informed";
            return "";
        }

        if(regex.test(type)){
            this.errors += "|Type has numbers";
            return "";
        }  

        if(!(type == "deposit" || type == "transfer" || type == "withdraw")){
            this.errors += "|Type is not valid";
            return "";
        }

        return type.trim();

    }

}

export {TypeValidator};