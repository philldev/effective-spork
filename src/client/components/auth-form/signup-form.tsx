import { Stack, TextInput, Button } from '@mantine/core'

export const SignupForm = () => {
	return (
		<form>
			<Stack spacing='xs'>
				<TextInput label='Username' placeholder='Enter your username' />
				<TextInput label='Email' placeholder='Enter your email' />
				<TextInput label='Password' placeholder='Enter your password' />
				<Button mt='md'>Signup</Button>
			</Stack>
		</form>
	)
}
