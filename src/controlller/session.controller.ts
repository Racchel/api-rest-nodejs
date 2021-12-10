import { Request, Response } from "express";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";

export async function createUserSessionHandler(request: Request, response: Response ) {
    // validate the user's password

    const user = await validatePassword(request.body);

    if (!user) {
        return response.status(401).send("Invalid email or password");
    }

    // create a session
     const session = createSession(JSON.stringify(user._id), request.get("user-agent") || "")

    // create an access token

    // create a refresh token

    // return access & refresh tokens
}