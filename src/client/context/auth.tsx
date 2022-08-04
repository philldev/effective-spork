import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { getTokenCookie } from '../../utils/cookies'
import { trpc } from '../../utils/trpc'
import { useIsClient } from '../hooks/is-client'

interface AuthContextType {
	user: User | null | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const PROTECTED_ROUTES = ['/app']
const AUTH_ROUTES = ['/signin']

const getIsProtectedRoutes = (path: string) => {
	return PROTECTED_ROUTES.some((val) => val.includes(path))
}
const getIsAuthRoutes = (path: string) => {
	return AUTH_ROUTES.some((val) => val.includes(path))
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { data, isLoading } = trpc.useQuery(['auth.status'])
	const router = useRouter()

	const isProtectedRoutes = getIsProtectedRoutes(router.asPath)
	const isAuthRoutes = getIsAuthRoutes(router.asPath)
	const notAuthorized = isProtectedRoutes && !data?.loggedIn && !isLoading

	console.log(data)

	// useEffect(() => {
	// 	if (notAuthorized && !isAuthRoutes) {
	// 		router.push('/signin')
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [notAuthorized, isAuthRoutes])

	// useEffect(() => {
	// 	if (isAuthRoutes && !isLoading && data?.user) {
	// 		router.push('/app')
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [isAuthRoutes, isLoading, data?.user])

	if (useIsClient() && isProtectedRoutes && isLoading) {
		return (
			<div className='w-screen h-screen grid place-items-center'>
				<p>Loading...</p>
			</div>
		)
	}

	return (
		<AuthContext.Provider
			value={{
				user: data?.user,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('Context not provided')
	return ctx
}
