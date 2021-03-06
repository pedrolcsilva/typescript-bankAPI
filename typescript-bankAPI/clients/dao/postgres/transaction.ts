import { myDB } from ".";
import { Transaction } from "../../../models";


class TransactionTable extends myDB {

    public async insert (transaction: Transaction): Promise<boolean> {
        try{
            console.log(transaction.created_at)
            const insertQuery  = `
                INSERT INTO transactions (
                    id,
                    type,
                    amount,
                    source_id,
                    created_at
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5
                ) RETURNING id
            `;

            const result = await this.client.query(insertQuery, [
                transaction.id,
                transaction.type,
                transaction.amount,
                transaction.source_id,
                new Date(transaction.created_at)
            ]);                

            if(result.rows.length !== 0) {
                return true;
            }
            return false;

        }catch(err){
            throw new Error("503: error inserting transaction into database");
        }
    }
}

export {TransactionTable};