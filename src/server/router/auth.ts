import { TRPCError } from '@trpc/server'
import { signupSchema } from '../../models/signup'
import { createRouter } from './context'
import bcrypt from 'bcryptjs'
import { createToken } from '../../utils/jwt'

export const authRouter = createRouter().mutation('signup', {
	input: signupSchema,
	async resolve({ input, ctx }) {
		const exists = await ctx.prisma.user.findUnique({
			where: {
				email: input.email,
			},
		})

		if (exists)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'User already exists',
			})

		const hashedPassword = await bcrypt.hash(input.password, 10)

		const data = {
			...input,
			password: hashedPassword,
		}

		try {
			const newUser = await ctx.prisma.user.create({
				data,
			})

			const token = createToken(newUser.id)

			if (!token) throw new Error('Create Token Error')

			return {
				user: newUser,
				token,
			}
		} catch (error) {
			throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
		}
	},
})
