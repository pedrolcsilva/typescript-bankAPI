class NameValidator {

    public name: string;
    public errors: string;

    public constructor (name: string){
        this.errors = "";
        this.name = this.validate(name);
    }

    public validate (name: string): string {
        const regex = /[0-9]/;
        
        if(!name){
            this.errors += "|Name was not informed";
            return "";
        }

        if(regex.test(name)){
            this.errors += "|Name has numbers";
            return "";
        }  

        return name.trim();

    }

}

export {NameValidator};