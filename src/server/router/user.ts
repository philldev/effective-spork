import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { User } from '@prisma/client'

export const userRouter = createRouter()
	.middleware(({ ctx, next }) => {
		if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
		return next()
	})
	.query('currentUser', {
		resolve({ ctx }) {
			return ctx.user
		},
	})
