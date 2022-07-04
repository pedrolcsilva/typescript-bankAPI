import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';
import { UserLogin } from '../services';

class LoginAccount {
    private responseWriter = ResponseWriter;
    private userLogin = UserLogin;

    public async handle(req: Request, res: Response){
        try{     
            const response = await new this.userLogin().execute(req.body);
            res.cookie("user", response.data);

            this.responseWriter.sucess(res, 200, response);            
        }catch(err){
            this.responseWriter.error(res, err as Error);
        }

        
    }

}

export {LoginAccount};