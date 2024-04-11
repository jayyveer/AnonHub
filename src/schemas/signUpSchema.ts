import {z} from 'zod';

export const usernameValidation = z 
.string()
.min(2, "Username must be atleast 2 characters")
.max(20, "Username cannot be more than 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"Username can only contain letters, numbers and underscores");

export const singupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(6, {message: "password must be atleast 6 characters"}) 
})