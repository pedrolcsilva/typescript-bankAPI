import { Account, APIResponse, Transaction } from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountValidator, CpfValidator, TransactionValidator } from "../validators";
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
    private accountValidator = AccountValidator;
    private cpfValidator = CpfValidator;

    public async execute (transaction: Transaction, origin_account: Partial<Account>, destination_account: Partial<Account>, origin_cpf: string, destination_cpf: string): Promise<APIResponse>{
        try {
            const TRANSACTION_DATA = new this.transactionValidator(transaction);
            const ORIGIN_ACCOUNT_DATA = new this.accountValidator(origin_account);
            const DESTINATION_ACCOUNT_DATA = new this.accountValidator(destination_account);
            const ORIGIN_CPF_DATA = new this.cpfValidator(origin_cpf);
            const DESTINATION_CPF_DATA = new this.cpfValidator(destination_cpf);

            if(ORIGIN_ACCOUNT_DATA.errors){
                throw new Error(`400: ${ORIGIN_ACCOUNT_DATA.errors}`);
            }

            if(DESTINATION_ACCOUNT_DATA.errors){
                throw new Error(`400: ${DESTINATION_ACCOUNT_DATA.errors}`);
            }
            
            const AmountIsBiggerThenAccountBalance = await new this.accountBalance().get(origin_account.account_number as string, origin_account.agency as string, TRANSACTION_DATA.transaction.amount as string)
            
            if(AmountIsBiggerThenAccountBalance){
                TRANSACTION_DATA.errors += "|Amount is bigger than account balance";
                TRANSACTION_DATA.transaction.amount = '';
            }

            if(TRANSACTION_DATA.errors){
                throw new Error(`400: ${TRANSACTION_DATA.errors}`);
            }

            if(ORIGIN_CPF_DATA.errors){
                throw new Error(`400: ${ORIGIN_CPF_DATA.errors}`);
            }

            if(DESTINATION_CPF_DATA.errors){
                throw new Error(`400: ${DESTINATION_CPF_DATA.errors}`);
            }
            
            if(!await new this.accountTable().validate(origin_account.account_number as string, origin_account.agency as string)){
                throw new Error(`404: origin account does not exist`);
            }

            if(!await new this.accountTable().verifyIfBelongsTo(origin_account.account_number as string, origin_account.agency as string, origin_cpf)){
                throw new Error(`404: origin cpf doesn't match`);
            }
                        
            if(!await new this.accountTable().validate(destination_account.account_number as string, destination_account.agency as string)){
                throw new Error(`404: destination account does not exist`);
            }

            if(!await new this.accountTable().verifyIfBelongsTo(destination_account.account_number as string, destination_account.agency as string, destination_cpf)){
                throw new Error(`404: destination cpf doesn't match`);
            }

            TRANSACTION_DATA.transaction.id = v4();
            
            const dbTransfer = await new this.transferOperation().transfer(TRANSACTION_DATA.transaction as Transaction, {...ORIGIN_ACCOUNT_DATA.account, password: origin_account.password}, DESTINATION_ACCOUNT_DATA.account);

            
            if(dbTransfer){
                const source_id = JSON.parse(JSON.stringify(await new this.accountTable().login(origin_account))).id;
                TRANSACTION_DATA.transaction.source_id = source_id;
                TRANSACTION_DATA.transaction.created_at = transaction.created_at;
                const dbInsertion = await new this.transactionTable().insert(TRANSACTION_DATA.transaction as Transaction);
                return {
                    data: {
                        origin_account: {
                            ...origin_account,
                            origin_cpf
                        },
                        destination_account: {
                            ...destination_account,
                            destination_cpf
                        },
                        transaction: {
                            ...TRANSACTION_DATA.transaction,
                            created_at: new Date(transaction.created_at)
                        }
                    },
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