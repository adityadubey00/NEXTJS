import {z} from "zod"

export const usernameValidation = z
.string()
.min(2,"Username must be at least 2 characters")
.max(2,"Username must not  be at least 20 characters" )
 .regex(/^[a-zA-Z0-9]+$/, {message: 'Username can only contain alphanumeric characters'})


export const signUpSchema = z.object({
    identifier: z.string().length(6,'Verification code must be 6 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
 })