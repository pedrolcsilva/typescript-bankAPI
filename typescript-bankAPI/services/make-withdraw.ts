import { Account, APIResponse, Transaction } from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountValidator, CpfValidator, TransactionValidator } from "../validators";
import { v4 } from "uuid";
import {TransactionTable} from '../clients/dao/postgres/transaction';
import {WithdrawOperation} from '../clients/dao/postgres/withdraw';
import { AccountBalance } from "../clients/dao/postgres/account_balance";
import { AccountTable } from "../clients/dao/postgres/account";

class MakeWithdraw{
    private transactionValidator = TransactionValidator;
    private transactionTable = TransactionTable;
    private withdrawOperation = WithdrawOperation;
    private accountBalance = AccountBalance;
    private accountTable = AccountTable;
    private accountValidator = AccountValidator;
    private cpfValidator = CpfValidator;

    public async execute (transaction: Transaction, account: Partial<Account>, cpf: string): Promise<APIResponse>{
        try {

            const ACCOUNT_DATA = new this.accountValidator(account);
            const TRANSACTION_DATA = new this.transactionValidator(transaction);
            const CPF_DATA = new this.cpfValidator(cpf);

            if(ACCOUNT_DATA.errors){
                throw new Error(`400: ${ACCOUNT_DATA.errors}`);
            }
            
            const AmountIsBiggerThenAccountBalance = await new this.accountBalance().get(account.account_number as string, account.agency as string, TRANSACTION_DATA.transaction.amount as string);
            if(AmountIsBiggerThenAccountBalance){
                TRANSACTION_DATA.errors += "|Amount is bigger than account balance";
                TRANSACTION_DATA.transaction.amount = '';
            }

            if(TRANSACTION_DATA.errors){
                throw new Error(`400: ${TRANSACTION_DATA.errors}`);
            }
            
            if(CPF_DATA.errors){
                throw new Error(`400: ${CPF_DATA.errors}`);
            }

            if(!await new this.accountTable().validate(account.account_number as string, account.agency as string)){
                throw new Error(`404: account not found`);
            }

            if(!await new this.accountTable().verifyIfBelongsTo(account.account_number as string, account.agency as string, cpf)){
                throw new Error(`404: cpf doesn't match the account`);
            }

            TRANSACTION_DATA.transaction.id = v4();
            
            const dbTransfer = await new this.withdrawOperation().withdraw(TRANSACTION_DATA.transaction as Transaction, account);

            if(dbTransfer){
                const source_id = JSON.parse(JSON.stringify(await new this.accountTable().login(account))).id;
                TRANSACTION_DATA.transaction.source_id = source_id;
                TRANSACTION_DATA.transaction.created_at = transaction.created_at;
                const dbInsertion = await new this.transactionTable().insert(TRANSACTION_DATA.transaction as Transaction);
                return {
                    data: {
                        ...TRANSACTION_DATA.transaction,
                        account_number: ACCOUNT_DATA.account.account_number,
                        verifying_account_digit: account.verifying_account_digit,
                        agency: ACCOUNT_DATA.account.agency,
                        verifying_agency_digit: account.verifying_agency_digit,
                        created_at: new Date(transaction.created_at),
                        cpf: cpf
                    },
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