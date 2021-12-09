import { Express, Request, Response } from "express";
import { createUserHandler } from "./controlller/user.controller";

function routes(app: Express) {
    app.get("/healthcheck", (request:Request, response:Response) => {
        response.sendStatus(200);
    })

    app.post("/api/users", createUserHandler);
}

export default routes;