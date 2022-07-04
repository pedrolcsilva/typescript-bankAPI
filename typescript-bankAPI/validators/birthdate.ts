class BirthValidator{
    public birthdate: string;
    public errors: string;

    public constructor(birthdate: string){
        this.errors = "";
        this.birthdate = this.validate(birthdate);
    }

    public validate(birthdate: string):string {
        const regex = /^((?:(?=29[\/\-.]0?2[\/\-.](?:[1-9]\d)?(?:[02468][048]|[13579][26])(?!\d))29)|(?:(?=31[\/\-.](?!11)0?[13578]|1[02])31)|(?:(?=\d?\d[\/\-.]\d?\d[\/\-.])(?!29[\/\-.]0?2)(?!31)(?:[12][0-9]|30|0?[1-9])))[\/\-.](0?[1-9]|1[0-2])[\/\-.]((?:[1-9]\d)?\d{2})$/;

        if(!birthdate){
            this.errors += "|Birthdate was not informed";
            return "";
        }

        if(!regex.test(birthdate)){
            this.errors += "|Invalid birthdate";
            return "";
        }
        const separator = /(\/|\-)/
        birthdate = birthdate.split(separator)[4] + "/" + birthdate.split(separator)[2] + "/" + birthdate.split(separator)[0];
        
        return birthdate.trim();
    }
}

export {BirthValidator};