import {Response, Request} from 'express';
import { ResponseWriter } from '../utils';
import {GetExtract} from '../services'

class Extract {
    private responseWriter = ResponseWriter;
    private getExtract = GetExtract;

    public async handle(req: Request, res: Response){
        try{
            const id = req.cookies["user"].account.id;

            const response = await new this.getExtract().execute(id);

            this.responseWriter.sucess(res, 200, response);
        }catch(err){
            this.responseWriter.error(res, err as Error);
        }
    }
}

export {Extract};