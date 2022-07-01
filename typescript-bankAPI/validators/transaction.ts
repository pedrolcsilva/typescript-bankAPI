import { TypeValidator, AmountValidator, SourceIdValidator, AccountNumberValidator, AccountAgencyValidator } from ".";
import {Transaction} from '../models';

class TransactionValidator {
    public transaction: Partial<Transaction>;
    public errors: string;

    private typeValidator = TypeValidator;
    private amountValidator = AmountValidator;
    private sourceIdValidator = SourceIdValidator;
    private accountNumberValidator = AccountNumberValidator;
    private accountAgencyValidator = AccountAgencyValidator;

    public constructor(transaction: Transaction){
        this.errors = "";
        this.transaction = this.validate(transaction);
    }

    public validate(transaction: Transaction): Partial<Transaction> {
        const type = new this.typeValidator(transaction.type);
        const source_id = new this.sourceIdValidator(transaction.source_id);
        const account_number = new this.accountNumberValidator(transaction.account_number, type.type);
        const agency = new this.accountAgencyValidator(transaction.agency, type.type);
        
        const amount = new this.amountValidator(transaction.amount, transaction.type);

        this.errors = this.errors.concat(`${type.errors}${amount.errors}${source_id.errors}${account_number.errors}`);

        const TRANSACTION_DATA : Partial<Transaction> = {
            type: type.type,
            amount: amount.amount,
            source_id: source_id.source_id,
            account_number: account_number.account_number,
            agency: agency.agency
        }

        return TRANSACTION_DATA;
    }
}

export {TransactionValidator};