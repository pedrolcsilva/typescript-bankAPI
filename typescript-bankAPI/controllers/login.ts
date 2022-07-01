import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';
import {myDB} from '../clients/dao/postgres';
import { AccountTable } from '../clients/dao/postgres/account';
import { UserTable } from '../clients/dao/postgres/user';

class LoginAccount extends myDB{
    private responseWriter = ResponseWriter;
    private accountTable = AccountTable;
    private userTable = UserTable;

    public async handle(req: Request, res: Response){
        try{     
            const partial_response = await new this.accountTable().login(req.body);
            const response = await new this.userTable().getData(JSON.parse(JSON.stringify(partial_response)).owner_id);
            
            const USER_DATA = {
                user: JSON.parse(JSON.stringify(response)).resp,
                account: JSON.parse(JSON.stringify(partial_response))
            }
            res.cookie("user", USER_DATA);

            this.responseWriter.sucess(res, 200, {data: USER_DATA.account, messages: []});            
        }catch(err){
            this.responseWriter.error(res, err as Error);
        }

        
    }

}

export {LoginAccount};