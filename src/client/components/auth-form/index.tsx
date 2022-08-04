import {
	Anchor,
	Box,
	Button,
	Center,
	createStyles,
	Group,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'

const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: '100vh',
	},
	formBox: {
		maxWidth: 350,
		width: '100%',
		padding: theme.spacing.md,
		borderRadius: theme.radius.md,
		border: `1px solid ${theme.colors.gray[2]}`,
	},
}))

export const AuthForm = () => {
	const [val, toggle] = useToggle(['login', 'signup'])
	const { classes } = useStyles()
	return (
		<Center className={classes.wrapper}>
			<Box className={classes.formBox}>
				<Title align='center' order={4} mb='sm'>
					{val === 'login' ? 'Login' : 'Signup'}
				</Title>
				{val === 'login' ? <LoginForm /> : <SignupForm />}
				<Group spacing={4} mt='xs'>
					<Text size='xs'>
						{val === 'login' ? `Don't have an account?` : 'Have an account'}
					</Text>
					<Anchor
						size='xs'
						onClick={() => toggle()}
						component='button'
						type='button'
					>
						{val === 'login' ? 'Signup' : 'Login'}
					</Anchor>
				</Group>
			</Box>
		</Center>
	)
}
