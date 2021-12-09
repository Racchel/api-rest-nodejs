import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(request: Request, response: Response) {
    try{
        const user = await createUser(request.body);//call create user service   
        return user; 
    } catch(e:any) {
        logger.error(e);
        return response.status(409).send(e.message);
    }
}