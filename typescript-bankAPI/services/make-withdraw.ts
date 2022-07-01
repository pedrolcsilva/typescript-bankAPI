import { APIResponse, Transaction } from "../models";
import { ExceptionTreatment } from "../utils";
import { TransactionValidator } from "../validators";
import { v4 } from "uuid";
import {TransactionTable} from '../clients/dao/postgres/transaction';
import {WithdrawOperation} from '../clients/dao/postgres/withdraw';
import { AccountBalance } from "../clients/dao/postgres/account_balance";

class MakeWithdraw{
    private transactionValidator = TransactionValidator;
    private transactionTable = TransactionTable;
    private withdrawOperation = WithdrawOperation;
    private accountBalance = AccountBalance;

    public async execute (transaction: Transaction): Promise<APIResponse>{
        try {
            const WITHDRAW_DATA = new this.transactionValidator(transaction);
            
            const AmountIsBiggerThenAccountBalance = await new this.accountBalance().get(WITHDRAW_DATA.transaction.source_id as string, WITHDRAW_DATA.transaction.amount as string)
            
            if(AmountIsBiggerThenAccountBalance){
                WITHDRAW_DATA.errors += "|Amount is bigger than account balance";
                WITHDRAW_DATA.transaction.amount = '';
            }

            if(WITHDRAW_DATA.errors){
                throw new Error(`400: ${WITHDRAW_DATA.errors}`);
            }

            WITHDRAW_DATA.transaction.id = v4();
            
            const dbInsertion = await new this.transactionTable().insert(WITHDRAW_DATA.transaction as Transaction);

            if(dbInsertion){
                const dbTransfer = await new this.withdrawOperation().withdraw(WITHDRAW_DATA.transaction as Transaction);
                return {
                    data: WITHDRAW_DATA.transaction,
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

export {MakeWithdraw};