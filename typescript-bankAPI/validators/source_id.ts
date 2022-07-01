class SourceIdValidator {

    public source_id: string;
    public errors: string;

    public constructor (source_id: string){
        this.errors = "";
        this.source_id = this.validate(source_id);
    }

    public validate (source_id: string): string {
        
        if(!source_id){
            this.errors += "|Source_id was not informed";
            return "";
        }
        else{
            if(source_id.length != 36){
                this.errors += "|Source_id is not a valid id";
                return "";
            }
        }
        

        return source_id.trim();

    }

}

export {SourceIdValidator};