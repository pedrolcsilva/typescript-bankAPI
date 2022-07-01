import { AccountTable } from "../clients/dao/postgres/account";
import { Account, APIResponse, User } from "../models";
import { ExceptionTreatment } from "../utils";
import { v4 } from "uuid";
import {AccountValidator} from '../validators';
import {Encryptor} from '../services'

class CreateAccount {
    private accountTable = AccountTable;
    private accountValidator = AccountValidator;
    private encryptor = Encryptor;

    public async execute (user: User, password: string): Promise<APIResponse> {
        try{
            let account = await new this.accountValidator(password); 
            let accountPassword = JSON.parse(JSON.stringify(account.account)).password;
            const encryptedPassword = await new this.encryptor().encrypt(accountPassword);
            
            let accountNumber = "";
            let agencyNumber = "";
            let verifyAccount

            do{
                accountNumber = "";
                agencyNumber = "";
                for(let i = 0; i < 9; i++){
                    accountNumber+= Math.floor(Math.random() * 10);
                }
    
                for(let i = 0; i < 4; i++){
                    agencyNumber+= Math.floor(Math.random() * 10);
                }
                verifyAccount = await new this.accountTable().validate(accountNumber, agencyNumber);
            }while(verifyAccount);


            if(account.errors){
                throw new Error(`400: ${account.errors}`);
            }

            const ACCOUNT_DATA = {
                id: v4(),
                owner_id: user.id,
                account_number: accountNumber,
                verifying_account_digit: accountNumber[accountNumber.length-1],
                agency: agencyNumber,
                verifying_agency_digit: agencyNumber[agencyNumber.length-1],
                balance: '0',
                password: encryptedPassword as string
            }

            const dbInsertion = await new this.accountTable().insert(ACCOUNT_DATA as Account);
            
            if(dbInsertion){
                return {
                    data: ACCOUNT_DATA,
                    messages: []
                } as APIResponse;
            }

            return {
                data: ACCOUNT_DATA,
                messages: ['error while creating account']
            } as APIResponse;
        }catch(err){
            throw new ExceptionTreatment(err as Error, 500, "account insertion in database failed")
        }
    }
}

export {CreateAccount};