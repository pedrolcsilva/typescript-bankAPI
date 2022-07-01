class CpfValidator {
    public cpf: string;
    public errors: string;

    public constructor(cpf: string){
        this.errors = "";
        this.cpf = this.validate(cpf);
    }

    public validate(cpf: string): string{
        const regex = /((\d{2})[.]?(\d{3})[.]?(\d{3})[/]?(\d{4})[-]?(\d{2}))|((\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2}))/gm;
        
        if(!cpf){
            this.errors += "|CPF was not informed";
            return "";
        }

        if(!regex.test(cpf)){
            this.errors += "|Invalid CPF format";
            return "";
        }
        
        return cpf.trim();
    }
}

export {CpfValidator};