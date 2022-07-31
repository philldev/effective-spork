// src/server/router/context.ts
import { User } from '@prisma/client'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { validateToken } from '../../utils/jwt'
import { prisma } from '../db/client'

export const createContext = async (
	opts?: trpcNext.CreateNextContextOptions
) => {
	const req = opts?.req
	const res = opts?.res
	let user: User | null = null

	const token = req?.headers.authorization?.split?.(' ')[1]

	if (token) {
		const payload = validateToken(token)

		if (payload?.sub) {
			user = await prisma.user.findUnique({
				where: {
					id: payload.sub,
				},
			})
		}
	}

	return {
		user,
		req,
		res,
		prisma,
	}
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
