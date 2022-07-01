import { Extract } from "../clients/dao/postgres/extract";
import { Transaction, APIResponse } from "../models";
import { ExceptionTreatment } from "../utils";

class GetExtract {
    private extract = Extract;
    public async execute(id: string): Promise<APIResponse>{
        try {
            const EXTRACT_DATA = await new this.extract().read(id as string);
            if(EXTRACT_DATA){
                return {
                    data: EXTRACT_DATA,
                    messages: []
                } as APIResponse;
            }
            return {
                data: {},
                messages: ["error while reading transactions extract"]
            } as APIResponse;
        } catch (err) {
            throw new ExceptionTreatment(err as Error, 500, "transactions extracts read in database failed")
        }
    }
}

export {GetExtract};