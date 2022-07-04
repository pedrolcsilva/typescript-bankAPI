import { Account, APIResponse, Transaction } from "../models";
import { ExceptionTreatment } from "../utils";
import { v4 } from "uuid";
import { AccountTable } from '../clients/dao/postgres/account';
import { UserTable } from '../clients/dao/postgres/user';

class UserLogin{
    private accountTable = AccountTable;
    private userTable = UserTable;

    public async execute (account: Partial<Account>): Promise<APIResponse>{
        try {

            const partial_response = await new this.accountTable().login(account);

            const response = await new this.userTable().getData(JSON.parse(JSON.stringify(partial_response)).owner_id);
            
            const USER_DATA = {
                user: JSON.parse(JSON.stringify(response)).resp,
                account: JSON.parse(JSON.stringify(partial_response))
            }

            USER_DATA.account.password = ''
            return {
                data: USER_DATA,
                messages: []
            } as APIResponse;
            

        }catch(err){
            throw new ExceptionTreatment(err as Error, 500, "user login failed")
        }
    }
}

export {UserLogin};