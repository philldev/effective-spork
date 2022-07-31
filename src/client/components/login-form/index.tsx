import { useForm, zodResolver } from '@mantine/form'
import { useEffect } from 'react'
import { loginSchema, LoginSchema } from '../../../models/login'
import { setTokenCookie } from '../../../utils/cookies'
import { trpc } from '../../../utils/trpc'
import { TextInput } from '../text-input'

export const LoginForm = () => {
	const form = useForm<LoginSchema>({
		initialValues: {
			email: '',
			password: '',
		},
		validate: zodResolver(loginSchema),
	})

	const signupMutation = trpc.useMutation(['auth.login'])

	useEffect(() => {
		if (signupMutation.isSuccess) {
			setTokenCookie(signupMutation.data.token)
		}
	}, [signupMutation.isSuccess, signupMutation.data])

	return (
		<form
			onSubmit={form.onSubmit((data) => {
				signupMutation.mutate(data)
			})}
			className='space-y-3'
		>
			<TextInput
				name='email'
				label='Email'
				type='email'
				error={form.errors.fullName}
				{...form.getInputProps('email')}
			/>
			<TextInput
				name='password'
				label='Password'
				type='password'
				error={form.errors.fullName}
				{...form.getInputProps('password')}
			/>

			<div>
				<button className='w-full h-10 px-3 bg-blue-500 focus:ring-blue-500 text-white rounded mt-4 block font-bold text-sm'>
					Login
				</button>
			</div>
		</form>
	)
}
