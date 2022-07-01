import { myDB } from ".";
import { User } from "../../../models";

class UserTable extends myDB {

    public async insert (user: User): Promise<boolean> {
        try{

            const selectQuery = `
                SELECT * FROM users WHERE cpf = $1
            `;

            const insertQuery  = `
                INSERT INTO users (
                    id,
                    name,
                    cpf,
                    email,
                    birthdate
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5
                ) RETURNING id
            `;

            const verifyUser = await this.validate(user);
            
            if(JSON.parse(JSON.stringify(verifyUser)).resp == "user does not exist"){
                const result = await this.client.query(insertQuery, [
                    user.id,
                    user.name,
                    user.cpf,
                    user.email,
                    new Date(user.birthdate)
                ]);

                if(result.rows.length !== 0) {
                    return true;
                }
                return false;
            }else{
                return JSON.parse(JSON.stringify(verifyUser)).resp;
            }

        }catch(err){
            throw new Error("503: error inserting user into database");
        }
    }

    public async validate (user: User): Promise<Object> {
        try{

            const selectQuery = `
                SELECT * FROM users WHERE cpf = $1
            `;

            const verifyUser = await this.client.query(selectQuery, [user.cpf])
            if(verifyUser.rows.length != 0){
                return {
                    resp: verifyUser.rows[0].id
                };
            }else{
                return {
                    resp: "user does not exist"
                };
            }

        }catch(err){
            throw new Error("503: error validating user into database");
        }
    }

    public async getData (id: string): Promise<Object> {
        try{
            const selectQuery = `
                SELECT * FROM users WHERE id = $1
            `;
            const verifyUser = await this.client.query(selectQuery, [id])
            if(verifyUser.rows.length != 0){
                return {
                    resp: verifyUser.rows[0]
                };
            }else{
                return {
                    resp: "user does not found"
                };
            }

        }catch(err){
            throw new Error("503: error validating user into database");
        }
    }
}

export {UserTable};