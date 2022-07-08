import {Response, Request} from 'express';
import { ResponseWriter } from '../utils';
import {GetExtract} from '../services'

class Extract {
    private responseWriter = ResponseWriter;
    private getExtract = GetExtract;

    public async handle(req: Request, res: Response){
        try{
            
            // if(req.body.account_number) {
                
            // }
            // else {
            //     const id = req.cookies["user"].account.id;
            //     response = await new this.getExtract().execute(id);
            // }

            const response = await new this.getExtract().execute(
                {
                    account_number: req.body.account_number, 
                    verifying_account_digit: req.body.verifying_account_digit, 
                    agency: req.body.agency, 
                    verifying_agency_digit: req.body.verifying_agency_digit, 
                },
                req.body.cpf
            );

            this.responseWriter.sucess(res, 200, response);
        }catch(err){
            this.responseWriter.error(res, err as Error);
        }
    }
}

export {Extract};