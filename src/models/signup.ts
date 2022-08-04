import { z } from 'zod'

export const signupSchema = z.object({
	username: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
})

export type SignupSchema = z.infer<typeof signupSchema>
