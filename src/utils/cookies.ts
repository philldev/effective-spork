import Cookies from 'js-cookie'

export const getTokenCookie = () => {
	return Cookies.get('pos-token')
}

export const setTokenCookie = (token: string) => {
	return Cookies.set('pos-token', token, {
		expires: 60 * 60,
	})
}
