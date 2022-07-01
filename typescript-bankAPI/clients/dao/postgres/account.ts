import { myDB } from ".";
import { Account } from "../../../models";
import { Encryptor } from "../../../services";

class AccountTable extends myDB {
    private encryptor = Encryptor;
    public async insert (account: Account): Promise<boolean> {
        try{
            const insertQuery  = `
                INSERT INTO accounts (
                    id,
                    owner_id,
                    account_number,
                    verifying_account_digit,
                    agency,
                    verifying_agency_digit,
                    balance,
                    password
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7,
                    $8
                ) RETURNING id
            `;
            const result = await this.client.query(insertQuery, [
                account.id,
                account.owner_id,
                account.account_number,
                account.verifying_account_digit,
                account.agency,
                account.verifying_agency_digit,
                account.balance,
                account.password
            ]);

            if(result.rows.length !== 0) {
                return true;
            }
            return false;
        

        }catch(err){
            throw new Error("503: error inserting account into database");
        }
    }

    public async login(account: Partial<Account>): Promise<string> {
        try {
            const selectQuery = `
                SELECT * FROM accounts WHERE account_number = $1 AND agency = $2
            `;
            
            const USERS_ACCOUNT = await this.client.query(selectQuery, [
                account.account_number, 
                account.agency
            ]);
            
            if(USERS_ACCOUNT.rows.length != 0){
                console.log(account.password)
                console.log(USERS_ACCOUNT.rows[0].password)
                const isEqual = await new this.encryptor().decrypt(account.password as string, USERS_ACCOUNT.rows[0].password);
                console.log(isEqual);
                if(isEqual) return USERS_ACCOUNT.rows[0];
            }
            throw new Error("400: password not match");
        }catch(err){
            throw new Error("400: unexpected error")
        }
    }

    public async getData (id: string): Promise<Object> {
        try {
            const selectQuery = `
                SELECT * FROM accounts WHERE id = $1
            `;
            const verifyUser = await this.client.query(selectQuery, [id])
            if(verifyUser.rows.length != 0){
                return {
                    resp: verifyUser.rows[0]
                };
            }else{
                return {
                    resp: "account does not found"
                };
            }
        } catch (err) {
            throw new Error("400: unexpected error")
        }
    }

    public async validate(accountNumber: string, agencyNumber: string): Promise<boolean> {
        try {
            const selectQuery = `
                SELECT * FROM accounts WHERE account_number = $1 AND agency = $2
            `;
            
            const verifyAccounts = await this.client.query(selectQuery, [accountNumber, agencyNumber])
            
            if(verifyAccounts.rows.length == 0){
                return false;
            }
            return true;
        }catch(err){
            throw new Error("400: unexpected error")
        }
    }
}

export {AccountTable};