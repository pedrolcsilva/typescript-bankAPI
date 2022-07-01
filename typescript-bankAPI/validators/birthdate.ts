class BirthValidator{
    public birthdate: string;
    public errors: string;

    public constructor(birthdate: string){
        this.errors = "";
        this.birthdate = this.validate(birthdate);
    }

    public validate(birthdate: string):string {
        if(!birthdate){
            this.errors += "|Birthdate was not informed";
            return "";
        }

        if(!new Date(birthdate).getTime()){
            this.errors += "|Invalid birthdate";
            return "";
        }

        return birthdate.trim();
    }
}

export {BirthValidator};