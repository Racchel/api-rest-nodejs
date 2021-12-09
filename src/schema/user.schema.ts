import { object, string } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password too short - should de 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email")
        
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: ""
    })
});