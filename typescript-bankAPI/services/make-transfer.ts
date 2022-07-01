import { APIResponse, Transaction } from "../models";
import { ExceptionTreatment } from "../utils";
import { TransactionValidator } from "../validators";
import { v4 } from "uuid";
import {TransactionTable} from '../clients/dao/postgres/transaction';
import {TransferOperation} from '../clients/dao/postgres/tranfer';
import {AccountBalance} from '../clients/dao/postgres/account_balance';
import { AccountTable } from "../clients/dao/postgres/account";

class MakeTransfer{
    private transactionValidator = TransactionValidator;
    private transactionTable = TransactionTable;
    private transferOperation = TransferOperation;
    private accountBalance = AccountBalance;
    private accountTable = AccountTable;

    public async execute (transaction: Transaction): Promise<APIResponse>{
        try {
            const TRANSACTION_DATA = new this.transactionValidator(transaction);
            const AmountIsBiggerThenAccountBalance = await new this.accountBalance().get(TRANSACTION_DATA.transaction.source_id as string, TRANSACTION_DATA.transaction.amount as string)
            
            if(AmountIsBiggerThenAccountBalance){
                TRANSACTION_DATA.errors += "|Amount is bigger than account balance";
                TRANSACTION_DATA.transaction.amount = '';
            }

            if(TRANSACTION_DATA.errors){
                throw new Error(`400: ${TRANSACTION_DATA.errors}`);
            }
            
            const accountExists = await new this.accountTable().validate(TRANSACTION_DATA.transaction.account_number as string, TRANSACTION_DATA.transaction.agency as string);

            if(!accountExists){
                throw new Error(`404: account does not exist`);
            }

            TRANSACTION_DATA.transaction.id = v4();
            
            const dbInsertion = await new this.transactionTable().insert(TRANSACTION_DATA.transaction as Transaction);

            if(dbInsertion){
                const dbTransfer = await new this.transferOperation().transfer(TRANSACTION_DATA.transaction as Transaction);
                return {
                    data: TRANSACTION_DATA.transaction,
                    messages: []
                } as APIResponse;
            }

            return {
                data: {},
                messages: ["error while creating transfer transaction"]
            } as APIResponse;

        }catch(err){
            throw new ExceptionTreatment(err as Error, 500, "transfer transaction insertion in database failed")
        }
    }
}

export {MakeTransfer};