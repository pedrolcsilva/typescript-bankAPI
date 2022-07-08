class CpfValidator {
    public cpf: string;
    public errors: string;

    public constructor(cpf: string){
        this.errors = "";
        this.cpf = this.validate(cpf);
    }

    public validate(cpf: string): string{
        const regex = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;
        
        if(!cpf){
            this.errors += "|CPF was not informed";
            return "";
        }

        if(!cpf.match(regex)){
            this.errors += "|Invalid CPF format";
            return "";
        }
        else if(cpf != JSON.parse(JSON.stringify(cpf.match(regex)))[0]){
            this.errors += "|Invalid CPF format";
            return "";
        }
        
        return cpf.replace('.', '').replace('.', '').replace('-', '').trim();
    }
}

export {CpfValidator};