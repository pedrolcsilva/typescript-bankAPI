import { myDB } from ".";
import { Account, Transaction } from "../../../models";


class DepositOperation extends myDB {

    public async deposit (transaction: Transaction, account: Partial<Account>): Promise<boolean> {
        try{
            const updateQuery = `
                UPDATE accounts SET balance = balance + $1 WHERE account_number = $2 AND agency = $3 RETURNING id;
            `;

            const deposit = await this.client.query(updateQuery, [
                transaction.amount, 
                account.account_number,
                account.agency
            ]);
              
            if(deposit.rows.length !== 0) {
                return true;
            }
            return false;

        }catch(err){
            throw new Error("503: error while updating accounts balance into database");
        }
    }
}

export {DepositOperation};