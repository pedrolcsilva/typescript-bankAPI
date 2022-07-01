import {Request, Response} from 'express';
import { myDB } from '../clients/dao/postgres';
import { AccountTable } from '../clients/dao/postgres/account';
import { UserTable } from '../clients/dao/postgres/user';
import {ResponseWriter} from '../utils';

class AccessAccount extends myDB{
    private responseWriter = ResponseWriter;
    private userTable = UserTable;
    private accountTable = AccountTable;

    public async handle(req: Request, res: Response) {
        try{
            const USER_ID = req.cookies["user"].user.id;
            const ACCOUNT_ID = req.cookies["user"].account.id;
            const USER_DATA = await new this.userTable().getData(USER_ID);
            const ACCOUNT_DATA = await new this.accountTable().getData(ACCOUNT_ID);

            const SESSION_DATA = {
                user: USER_DATA,
                account: ACCOUNT_DATA
            };
            this.responseWriter.sucess(res, 200, {data: SESSION_DATA, messages: []});
        }catch(err){
            this.responseWriter.error(res, err as Error);
        }
    }
}

export {AccessAccount};