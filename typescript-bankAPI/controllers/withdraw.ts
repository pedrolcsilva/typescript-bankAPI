import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';
import {MakeWithdraw} from '../services'

class SendWithdraw {
    private responseWriter = ResponseWriter;
    private makeWithdrawService = MakeWithdraw;
    public async handle(req: Request, res: Response){
        try{            
            const amount = req.body.withdrawValue;
            const created_at = Date.now();
            const id = req.cookies["user"].account.id;
            const response = await new this.makeWithdrawService().execute({account_number: '', agency: '', amount: amount, type: 'withdraw', source_id: id, created_at: created_at, id: ''});
            
            this.responseWriter.sucess(res, 200, response) 
            
        }catch(err){
            this.responseWriter.error(res, err as Error)
        }
    }
}

export {SendWithdraw};