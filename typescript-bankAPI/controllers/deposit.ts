import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';
import {MakeDeposit} from '../services'

class SendDeposit {
    private responseWriter = ResponseWriter;
    private makeDepositService = MakeDeposit;


    public async handle(req: Request, res: Response){
        try{
            const amount = req.body.amount;
            const created_at = Date.now();
            const id = req.cookies["user"].account.id;
            const response = await new this.makeDepositService().execute({account_number: '', agency: '', amount: amount, type: 'deposit', source_id: id, created_at: created_at, id: ''});
            
            this.responseWriter.sucess(res, 200, response)
        }catch(err){
            this.responseWriter.error(res, err as Error)
        }
    }
}

export {SendDeposit};