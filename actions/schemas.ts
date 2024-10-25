import { z } from 'zod'

export const logInSchema = z.object({
    email: z.string().email(),
    // username: z.string().min(4, 'Username must be 4-15 characters').max(15, 'Username must be 4-15 characters'),
    password: z.string().min(5, "Password must be at least 5 characters")
})