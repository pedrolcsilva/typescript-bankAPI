import { APIResponse } from "../models/response";
import { Response } from "express";
import cookieParser from 'cookie-parser';

class ResponseWriter {
    public static error (res: Response, error: Error): void {
        
        const [statusCode, messages] = error.message.split(": ");

        if(Number(statusCode)){
            res.status(Number(statusCode)).json({data: {}, messages: messages.split("|").filter((message:string) => message !== "")} as APIResponse); 
        }
        else{
            res.status(500).json({data: {}, messages: ["unexpected error"]} as APIResponse);
        }
    }
    
    public static sucess (res: Response, statusCode: number, response: APIResponse): void {
        res.status(statusCode).json(response);
    }
}

export {ResponseWriter};