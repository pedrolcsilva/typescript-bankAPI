import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';
import { CreateUser, CreateAccount } from '../services';

class InsertAccount {

    private responseWriter = ResponseWriter;
    private createUserService = CreateUser;
    private createAccountService = CreateAccount;

    public async handle (req: Request, res: Response) {
        try {
            const partial_response = await new this.createUserService().execute(req.body);
            const response = await new this.createAccountService().execute(partial_response.data, req.body.password);
            this.responseWriter.sucess(res, 201, response)
        }catch(err) {
            this.responseWriter.error(res, err as Error)
        }
    }
}

export {InsertAccount};