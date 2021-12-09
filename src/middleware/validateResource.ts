import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate = (schema:AnyZodObject) => (request:Request, response:Response, next:NextFunction) => {

    try {
        schema.parse({
            body: request.body,
            query: request.query,
            params: request.params
        })
    } catch (e: any){
        return response.send(400).send(e.errors);
    }
}