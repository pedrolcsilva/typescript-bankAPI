import { myDB } from ".";
import { Transaction } from "../../../models";


class WithdrawOperation extends myDB {

    public async withdraw (transaction: Transaction): Promise<boolean> {
        try{
            const updateQuery = `
                UPDATE accounts SET balance = balance - $1 WHERE id = $2;
            `;

            const deposit = await this.client.query(updateQuery, [transaction.amount, transaction.source_id]);
            console.log(deposit)    

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