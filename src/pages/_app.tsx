import { withTRPC } from '@trpc/next'
import { NextComponentType, NextPage } from 'next'
import { AppProps, AppInitialProps } from 'next/app'
import { AppContextType } from 'next/dist/shared/lib/utils'
import { ReactElement, ReactNode } from 'react'
import superjson from 'superjson'
import { AuthProvider } from '../client/context/auth'
import type { AppRouter } from '../server/router'
import '../styles/globals.css'
import { getTokenCookie } from '../utils/cookies'

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

//@ts-ignore
const MyApp: NextComponentType<
	AppContextType,
	AppInitialProps,
	AppPropsWithLayout
> = ({ Component, pageProps }) => {
	const getLayout = Component.getLayout ?? ((page) => page)

	return getLayout(
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

		return {
			url,
			transformer: superjson,
			headers() {
				const token = getTokenCookie()
				return {
					Authorization: token ? `Bearer ${token}` : undefined,
				}
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
