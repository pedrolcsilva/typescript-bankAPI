import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';
import {MakeTransfer} from '../services';

class SendTransfer {
    private responseWriter = ResponseWriter;
    private makeTransferService = MakeTransfer;

    public async handle(req: Request, res: Response){
        try{
            const account_number = req.body.account_number;
            const agency = req.body.agency;
            const amount = req.body.amount;
            const created_at = Date.now();
            const response = await new this.makeTransferService().execute({account_number: account_number, agency: agency, amount: amount, type: 'transfer', source_id: req.cookies["user"].account.id, created_at: created_at, id: ''});
            this.responseWriter.sucess(res, 201, response)
        }catch(err){
            this.responseWriter.error(res, err as Error)
        }
    }
}

export {SendTransfer};