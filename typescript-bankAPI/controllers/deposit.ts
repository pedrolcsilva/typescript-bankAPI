import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';
import {MakeDeposit} from '../services'

class SendDeposit {
    private responseWriter = ResponseWriter;
    private makeDepositService = MakeDeposit;


    public async handle(req: Request, res: Response){
        try{
            const amount = req.body.amount;
            const created_at = Date.now() - 10800000;

            let response;

            if(req.body.account_number) {
                response = await new this.makeDepositService().execute(
                    {
                        amount: req.body.amount, 
                        type: 'deposit', 
                        source_id: '', 
                        created_at: created_at, 
                        id: ''
                    },
                    {
                        account_number: req.body.account_number, 
                        verifying_account_digit: req.body.verifying_account_digit, 
                        agency: req.body.agency, 
                        verifying_agency_digit: req.body.verifying_agency_digit, 
                    },
                    req.body.cpf
                );
            }
            else {
                const id = req.cookies["user"].account.id;
                const account_number = req.cookies['user'].account.account_number;
                const agency = req.cookies['user'].account.agency;
                const cpf = req.cookies['user'].user.cpf;
                response = await new this.makeDepositService().execute(
                    {
                        amount: amount, 
                        type: 'deposit', 
                        source_id: id, 
                        created_at: created_at, 
                        id: ''
                    }, 
                    {
                        account_number: account_number, 
                        verifying_account_digit: account_number[account_number.length-1], 
                        agency: agency, 
                        verifying_agency_digit: agency[agency.length-1], 
                    },
                        cpf
                );
            }

            this.responseWriter.sucess(res, 200, response)
        }catch(err){
            this.responseWriter.error(res, err as Error)
        }
    }
}

export {SendDeposit};