import { Stack, TextInput, Button } from '@mantine/core'

export const LoginForm = () => {
	return (
		<form>
			<Stack spacing='xs'>
				<TextInput
					label='Username or Email'
					placeholder='Enter your username'
				/>
				<TextInput label='Password' placeholder='Enter your password' />
				<Button mt='md'>Login</Button>
			</Stack>
		</form>
	)
}
