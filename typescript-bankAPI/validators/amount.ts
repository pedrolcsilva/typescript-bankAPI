class AmountValidator {

    public amount: string;
    public errors: string;

    public constructor (amount: string, type: string){
        this.errors = "";
        this.amount = this.validate(amount, type);
    }

    public validate (amount: string, type: string): string {
        if(!amount){
            this.errors += "|Amount was not informed";
            return "";
        }

        if(isNaN(Number(amount))){
            this.errors += "|Amount is not a number";
            return "";
        }

        if(Number(amount) <= 0){
            this.errors += "|Amount is a invalid value";
            return "";
        }

        if(type == 'deposit') amount = "" + (Number(amount) * 0.99);
        else if(type == 'withdraw') amount = "" + (Number(amount) + 4);
        else if(type == 'transfer') amount = "" + (Number(amount) + 1);
            
        return amount;

    }

}

export {AmountValidator};