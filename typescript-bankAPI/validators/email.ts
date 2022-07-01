class EmailValidator {

    public email: string;
    public errors: string;

    public constructor (email: string){
        this.errors = "";
        this.email = this.validate(email);
    }

    private validate (email: string): string {
        const regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
        
        if(!email){
            this.errors += "|Email was not informed";
            return "";
        }

        if(!regex.test(email)){
            this.errors += "|Invalid email format";
            return "";
        }

        return email.trim();
    }
}

export {EmailValidator};