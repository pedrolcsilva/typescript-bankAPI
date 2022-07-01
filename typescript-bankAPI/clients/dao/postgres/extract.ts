import { myDB } from ".";

class Extract extends myDB {
    public async read (id: string): Promise<Array<string>>{
        try {
            const selectQuery = `
                SELECT * from transactions WHERE source_id = $1
                ORDER BY created_at
            `;

            const extract = await this.client.query(selectQuery, [
                id
            ])

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