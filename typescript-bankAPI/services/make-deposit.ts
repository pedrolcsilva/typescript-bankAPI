import { APIResponse, Transaction } from "../models";
import { ExceptionTreatment } from "../utils";
import { TransactionValidator } from "../validators";
import { v4 } from "uuid";
import {TransactionTable} from '../clients/dao/postgres/transaction';
import {DepositOperation} from '../clients/dao/postgres/deposit';

class MakeDeposit{
    private transactionValidator = TransactionValidator;
    private transactionTable = TransactionTable;
    private depositOperation = DepositOperation;

    public async execute (transaction: Transaction): Promise<APIResponse>{
        try {
            const TRANSACTION_DATA = new this.transactionValidator(transaction);
            
            if(TRANSACTION_DATA.errors){
                throw new Error(`400: ${TRANSACTION_DATA.errors}`);
            }

            TRANSACTION_DATA.transaction.id = v4();
            
            const dbInsertion = await new this.transactionTable().insert(TRANSACTION_DATA.transaction as Transaction);

            if(dbInsertion){
                const dbTransfer = await new this.depositOperation().deposit(TRANSACTION_DATA.transaction as Transaction);
                return {
                    data: TRANSACTION_DATA.transaction,
                    messages: []
                } as APIResponse;
            }

            return {
                data: {},
                messages: ["error while creating deposit transaction"]
            } as APIResponse;

        }catch(err){
            throw new ExceptionTreatment(err as Error, 500, "deposit transaction insertion in database failed")
        }
    }
}

export {MakeDeposit};