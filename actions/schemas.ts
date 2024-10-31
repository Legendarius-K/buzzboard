import { z } from 'zod'

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters")
})

export const signUpSchema = z.object({
    email: z.string().email(),
    username: z.string().min(4, 'Username must be 4-15 characters').max(15, 'Username must be 4-15 characters'),
    password: z.string().min(5, "Password must be at least 5 characters")
})

export const createPostSchema = z.object({
    title: z.string().min(3, 'At least 3 characters').max(30, 'Max 30 characters'),
    category: z.string().regex(/^(coding|general|cakes|carpentry|insects)$/),
    content: z.string()
})