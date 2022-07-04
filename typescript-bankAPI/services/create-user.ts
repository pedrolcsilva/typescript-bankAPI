import { APIResponse, User } from "../models";
import { ExceptionTreatment } from "../utils";
import { UserValidator } from "../validators";
import { v4 } from "uuid";
import {UserTable} from '../clients/dao/postgres/user'

class CreateUser{
    private userValidator = UserValidator;
    private userTable = UserTable;

    public async execute (user: User): Promise<APIResponse>{
        try {
            const USER_DATA = new this.userValidator(user);

            if(USER_DATA.errors){
                throw new Error(`400: ${USER_DATA.errors}`);
            }

            USER_DATA.user.id = v4();

            const dbInsertion = await new this.userTable().insert(USER_DATA.user as User);
            
            if(dbInsertion){
                if(typeof dbInsertion == "string") USER_DATA.user.id = dbInsertion;
                return {
                    data: USER_DATA.user,
                    messages: []
                } as APIResponse;
            }

            return {
                data: {},
                messages: ["error while creating user"]
            } as APIResponse;

        }catch(err){
            throw new ExceptionTreatment(err as Error, 500, "user insertion in database failed");
        }
    }
}

export {CreateUser};