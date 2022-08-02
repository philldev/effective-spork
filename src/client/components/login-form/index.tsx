import { useForm, zodResolver } from '@mantine/form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { loginSchema, LoginSchema } from '../../../models/login'
import { setTokenCookie } from '../../../utils/cookies'
import { trpc } from '../../../utils/trpc'
import { useAuth } from '../../context/auth'
import { TextInput } from '../text-input'

export const LoginForm = () => {
	const form = useForm<LoginSchema>({
		initialValues: {
			email: '',
			password: '',
		},
		validate: zodResolver(loginSchema),
	})

	const ctx = trpc.useContext()

	const loginMutation = trpc.useMutation(['auth.login'], {
		onSuccess(data) {
			setTokenCookie(data.token)
			ctx.queryClient.invalidateQueries()
		},
	})

	return (
		<form
			onSubmit={form.onSubmit((data) => {
				loginMutation.mutate(data)
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
