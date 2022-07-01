import { myDB } from ".";

class AccountBalance extends myDB {

    public async get (id: string, amount: string): Promise<boolean> {
        try{
            const selectQuery  = `
                SELECT balance FROM accounts WHERE id = $1
            `;
            
            const result = await this.client.query(selectQuery, [
                id
            ]);

            if(result.rows.length !== 0) {
                if(Number(result.rows[0].balance) < Number(amount)) return true
                else return false;
            }
            throw new Error("404: balance could not be found in database")
        

        }catch(err){
            throw new Error("500: error searching account balance in database");
        }
    }
}

export {AccountBalance};