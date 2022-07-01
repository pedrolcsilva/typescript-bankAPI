import {Request, Response} from 'express';
import {ResponseWriter} from '../utils';

class Logout {

    private responseWriter = ResponseWriter;

    public async handle (req: Request, res: Response) {
        try {
            res.clearCookie('user');
            this.responseWriter.sucess(res, 200, {data: "Logout sucess", messages: []});
        }catch(err) {
            this.responseWriter.error(res, err as Error)
        }
    }
}

export {Logout};