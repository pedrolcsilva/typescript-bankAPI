import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';
import {MakeTransfer} from '../services';

class SendTransfer {
    private responseWriter = ResponseWriter;
    private makeTransferService = MakeTransfer;

    public async handle(req: Request, res: Response){
        try{
            const amount = req.body.amount;
            const created_at = Date.now() - 10800000;

            let response
            if(req.body.origin_account_number) {
                response = await new this.makeTransferService().execute(
                    {
                        amount: amount,
                        type: 'transfer',
                        source_id: '', 
                        created_at: created_at, 
                        id: ''
                    },
                    {
                        account_number: req.body.origin_account_number, 
                        verifying_account_digit: req.body.origin_verifying_account_digit, 
                        agency: req.body.origin_agency, 
                        verifying_agency_digit: req.body.origin_verifying_agency_digit,
                        password: req.body.origin_password
                    },
                    {
                        agency: req.body.destination_agency,
                        verifying_agency_digit: req.body.destination_verifying_account_digit,
                        account_number: req.body.destination_account_number,
                        verifying_account_digit: req.body.destination_verifying_agency_digit
                    },
                    req.body.origin_cpf,
                    req.body.destination_cpf
                );
            }
            else {
                const id = req.cookies["user"].account.id;
                const account_number = req.cookies["user"].account.account_balance;
                const agency = req.cookies["user"].account.agency;
                const origin_cpf = req.cookies["user"].user.cpf;
                response = await new this.makeTransferService().execute(
                    {
                        amount: amount, 
                        type: 'transfer', 
                        source_id: id, 
                        created_at: created_at, 
                        id: ''
                    },
                    {
                        account_number: account_number, 
                        verifying_account_digit: account_number[account_number.length-1], 
                        agency: agency, 
                        verifying_agency_digit: agency[agency.length-1],
                        password: req.body.origin_password
                    },
                    {
                        account_number: req.body.destination_account_number,
                        verifying_account_digit: req.body.destination_account_number[req.body.destination_account_number.length-1],
                        agency: req.body.destination_agency,
                        verifying_agency_digit: req.body.destination_agency[req.body.destination_agency.length-1]
                    },
                    origin_cpf,
                    req.body.destination_cpf
                );
            }

            this.responseWriter.sucess(res, 201, response)
        }catch(err){
            this.responseWriter.error(res, err as Error)
        }
    }
}

export {SendTransfer};