import {Client} from 'pg';
import {config} from '../../../config';

class myDB {
    protected client: Client;
    public constructor () {
        this.client = new Client({
            connectionString: config.POSTGRES
        }); 
        
        this.client.connect();       
    }
}

export {myDB};
