// src/pages/_app.tsx
import { withTRPC } from '@trpc/next'
import type { AppRouter } from '../server/router'
import type { AppType } from 'next/dist/shared/lib/utils'
import superjson from 'superjson'
import '../styles/globals.css'
import Cookies from 'js-cookie'
import { getTokenCookie } from '../utils/cookies'
import { AuthProvider } from '../client/context/auth'

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	)
}

const getBaseUrl = () => {
	if (typeof window !== 'undefined') {
		return ''
	}
	if (process.browser) return '' // Browser should use current path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`
		const token = getTokenCookie()

		return {
			url,
			transformer: superjson,
			headers: {
				Authorization: token ? `Bearer ${token}` : undefined,
			},
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		}
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp)
