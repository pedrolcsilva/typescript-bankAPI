import { myDB } from ".";
import { Account, Transaction } from "../../../models";
import { Encryptor } from "../../../services";


class TransferOperation extends myDB {

    private encryptor = Encryptor;
    public async transfer (transaction: Transaction, origin_account: Partial<Account>, destination_account: Partial<Account>): Promise<boolean> {
        try{

            const selectQuery = `
                SELECT * FROM accounts WHERE account_number = $1 AND agency = $2
            `;
            
            const USERS_ACCOUNT = await this.client.query(selectQuery, [
                origin_account.account_number, 
                origin_account.agency
            ]);

            if(USERS_ACCOUNT.rows.length != 0){
                const isEqual = await new this.encryptor().decrypt(origin_account.password as string, USERS_ACCOUNT.rows[0].password);
                if(!isEqual) throw new Error(`|incorrect password`)
            }

            const withdrawQuery  = `
            UPDATE accounts SET balance = balance - $1 WHERE account_number = $2 AND agency = $3 RETURNING id;
            `;
            
            const withdraw = await this.client.query(withdrawQuery, [
                transaction.amount,
                origin_account.account_number,
                origin_account.agency
            ]);
            const depositQuery  = `
            UPDATE accounts SET balance = balance + $1 WHERE account_number = $2 AND agency = $3 RETURNING id;
            `;

            transaction.amount = "" + (Number(transaction.amount) - 1)
            const deposit = await this.client.query(depositQuery, [
                transaction.amount,
                destination_account.account_number,
                destination_account.agency
            ])
            
            if(withdraw.rows.length !== 0 && deposit.rows.length !== 0) {
                return true;
            }
            return false;

        }catch(err){
            throw new Error("503: error updating accounts balance into database");
        }
    }
}

export {TransferOperation};