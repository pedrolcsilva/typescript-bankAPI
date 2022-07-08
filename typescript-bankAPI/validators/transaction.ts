import { TypeValidator, AmountValidator, SourceIdValidator, AccountNumberValidator, AccountAgencyValidator } from ".";
import {Transaction} from '../models';

class TransactionValidator {
    public transaction: Partial<Transaction>;
    public errors: string;

    private typeValidator = TypeValidator;
    private amountValidator = AmountValidator;
    private sourceIdValidator = SourceIdValidator;

    public constructor(transaction: Transaction){
        this.errors = "";
        this.transaction = this.validate(transaction);
    }

    public validate(transaction: Transaction): Partial<Transaction> {
        const type = new this.typeValidator(transaction.type);
        const amount = new this.amountValidator(transaction.amount, transaction.type);

        this.errors = this.errors.concat(`${type.errors}${amount.errors}`);

        const TRANSACTION_DATA : Partial<Transaction> = {
            type: type.type,
            amount: amount.amount
        }

        return TRANSACTION_DATA;
    }
}

export {TransactionValidator};