import { useForm, zodResolver } from '@mantine/form'
import { useEffect } from 'react'
import { SignupSchema, signupSchema } from '../../../models/signup'
import { setTokenCookie } from '../../../utils/cookies'
import { trpc } from '../../../utils/trpc'
import { TextInput } from '../text-input'

export const SignupForm = () => {
	const form = useForm<SignupSchema>({
		initialValues: {
			email: '',
			password: '',
			fullName: '',
		},
		validate: zodResolver(signupSchema),
	})

	const ctx = trpc.useContext()
	const signupMutation = trpc.useMutation(['auth.signup'], {
		onSuccess(data, variables, context) {
			setTokenCookie(data.token)
			ctx.queryClient.invalidateQueries()
		},
	})

	return (
		<form
			onSubmit={form.onSubmit((data) => {
				signupMutation.mutate(data)
			})}
			className='space-y-3'
		>
			<TextInput
				name='fullName'
				label='Full name'
				error={form.errors.fullName}
				{...form.getInputProps('fullName')}
			/>
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
					Create Account
				</button>
			</div>
		</form>
	)
}
