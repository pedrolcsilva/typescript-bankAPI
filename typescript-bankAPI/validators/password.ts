
class PasswordValidator {

    public password: string;
    public errors: string;

    public constructor (password: string){
        this.errors = "";
        this.password = this.validate(password);
    }

    public validate (password: string): string {

        if(!password){
            this.errors += "|Password was not informed";
            return "";
        }

        if(isNaN(Number(password))){
            this.errors += "|Password need to have only numbers";
            return "";
        }

        if(password.length != 4){
            this.errors += "|Password need to have four digits";
            return "";
        }

        return password;

    }

}

export {PasswordValidator};