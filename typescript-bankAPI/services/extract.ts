import { AccountTable } from "../clients/dao/postgres/account";
import { Extract } from "../clients/dao/postgres/extract";
import { Transaction, APIResponse, Account } from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountValidator, CpfValidator } from "../validators";

class GetExtract {
    private extract = Extract;
    private accountTable = AccountTable;
    private accountValidator = AccountValidator;
    private cpfValidator = CpfValidator;

    public async execute(account: Partial<Account>, cpf: string): Promise<APIResponse>{
        try {

            const ACCOUNT_DATA = new this.accountValidator(account);
            const CPF_DATA = new this.cpfValidator(cpf);

            if(ACCOUNT_DATA.errors){
                throw new Error(`400: ${ACCOUNT_DATA.errors}`);
            }
            
            if(CPF_DATA.errors){
                throw new Error(`400: ${CPF_DATA.errors}`);
            }

            if(!await new this.accountTable().validate(account.account_number as string, account.agency as string)){
                throw new Error(`404: account not found`);
            }

            if(!await new this.accountTable().verifyIfBelongsTo(account.account_number as string, account.agency as string, cpf)){
                throw new Error(`404: cpf doesn't match the account`);
            }


            const EXTRACT_DATA = await new this.extract().read(account);
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