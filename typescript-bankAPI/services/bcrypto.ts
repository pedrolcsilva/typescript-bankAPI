import bcrypt from 'bcrypt';
import { userInfo } from 'os';
import { nextTick } from 'process';
import { promisify } from 'util';

class Encryptor {
    
    public async encrypt(accountPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(accountPassword, salt);
        return encryptedPassword;
    }
    public async decrypt(accountPassword: string, encryptedPassword: string): Promise<boolean> {
        const salt = await bcrypt.genSalt(10);
        let decryptedPassword = await bcrypt.compare(accountPassword, encryptedPassword);
        return decryptedPassword;
    }
    
}

export {Encryptor};