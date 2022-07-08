import { myDB } from ".";
import { Account, Transaction } from "../../../models";
import { Encryptor } from "../../../services";


class WithdrawOperation extends myDB {
    
    private encryptor = Encryptor;

    public async withdraw (transaction: Transaction, account: Partial<Account>): Promise<boolean> {
        try{
            const selectQuery = `
                SELECT * FROM accounts WHERE account_number = $1 AND agency = $2
            `;
            const USERS_ACCOUNT = await this.client.query(selectQuery, [
                account.account_number, 
                account.agency
            ]);

            if(USERS_ACCOUNT.rows.length != 0){
                const isEqual = await new this.encryptor().decrypt(account.password as string, USERS_ACCOUNT.rows[0].password);
                
                if(!isEqual) throw new Error(`|incorrect password`)
            }


            const updateQuery = `
                UPDATE accounts SET balance = balance - $1 WHERE account_number = $2 AND agency = $3 RETURNING id;
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

export {WithdrawOperation};