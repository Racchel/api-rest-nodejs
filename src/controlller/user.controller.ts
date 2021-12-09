import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
    request: Request<{}, {}, CreateUserInput["body"]>, 
    response: Response
) {
    try{
        const user = await createUser(request.body);
        return response.send(user); 
    } catch(e:any) {
        logger.error(e);
        return response.status(409).send(e.message);
    }
}