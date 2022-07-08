import { myDB } from ".";

class AccountBalance extends myDB {

    public async get (account_number: string, agency: string, amount: string): Promise<boolean> {
        try{
            const selectQuery  = `
                SELECT balance FROM accounts WHERE account_number = $1 AND agency = $2
            `;
            
            const result = await this.client.query(selectQuery, [
                account_number,
                agency
            ]);

            if(result.rows.length !== 0) {
                if(Number(result.rows[0].balance) < Number(amount)) return true
                else return false;
            }
            return false
        

        }catch(err){
            throw new Error("500: error searching account balance in database");
        }
    }
}

export {AccountBalance};