import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'

const SECRET = 'SECRET'

export const createToken = (uid: string) => {
	try {
		const token = jwt.sign(
			{
				sub: uid,
			},
			SECRET,
			{
				expiresIn: '1h',
			}
		)

		return token
	} catch (error) {
		console.log(error)
		return null
	}
}
export const validateToken = (token: string) => {
	try {
		const payload = jwt.verify(token, SECRET)
		return payload as {
			sub: string
		} & JwtPayload
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			if (error.message !== 'jwt expired') {
				console.log(error.message)
			}
		}
		return null
	}
}
