import { myDB } from ".";
import { Account } from "../../../models";

class Extract extends myDB {
    public async read (account: Partial<Account>): Promise<Array<string>>{
        try {

            const accountSelector = `
                SELECT * from accounts WHERE account_number = $1 AND agency = $2;
            `;

            const ACCOUNT_DATA = await this.client.query(accountSelector, [
                account.account_number,
                account.agency
            ]);

            const selectQuery = `
                SELECT * from transactions WHERE source_id = $1
                ORDER BY created_at at time zone 'brt' DESC;
            `;

            const id = ACCOUNT_DATA.rows[0].id;

            const extract = await this.client.query(selectQuery, [
                id
            ]);

            if(extract.rows.length != 0){
                return extract.rows
            }
            else {
                return [''];
            }  
        } catch (error) {
            throw new Error("503: error reading transactions extract from database");
        }
        
    }
}

export {Extract};