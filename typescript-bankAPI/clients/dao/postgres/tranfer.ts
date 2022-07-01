import { myDB } from ".";
import { Transaction } from "../../../models";


class TransferOperation extends myDB {

    public async transfer (transaction: Transaction): Promise<boolean> {
        try{
            const withdrawQuery  = `
            UPDATE accounts SET balance = balance - $1 WHERE id = $2;
            `;

            const withdraw = await this.client.query(withdrawQuery, [
                transaction.amount,
                transaction.source_id
            ]);

            const depositQuery  = `
            UPDATE accounts SET balance = balance + $1 WHERE account_number = $2 AND agency = $3;
            `;

            console.log(transaction)
            const deposit = await this.client.query(depositQuery, [
                transaction.amount,
                transaction.account_number,
                transaction.agency
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