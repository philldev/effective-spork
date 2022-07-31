import { TRPCError } from '@trpc/server'
import { signupSchema } from '../../models/signup'
import { createRouter } from './context'
import bcrypt from 'bcryptjs'
import { createToken } from '../../utils/jwt'
import { loginSchema } from '../../models/login'

export const authRouter = createRouter()
	.mutation('login', {
		input: loginSchema,
		async resolve({ input, ctx }) {
			const error = new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Incorrect email or password',
			})

			const exists = await ctx.prisma.user.findUnique({
				where: {
					email: input.email,
				},
			})

			if (!exists) throw error

			const validPassword = await bcrypt.compare(
				input.password,
				exists.password
			)

			if (!validPassword) throw error

			try {
				const token = createToken(exists.id)

				if (!token) throw new Error('Create Token Error')

				return {
					user: exists,
					token,
				}
			} catch (error) {
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
			}
		},
	})
	.mutation('signup', {
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
