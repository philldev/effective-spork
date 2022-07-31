import { useState } from 'react'
import { LoginForm } from '../components/login-form'
import { SignupForm } from '../components/signup-form'

const SignupPage = () => {
	const [type, setType] = useState<'login' | 'register'>('login')

	return (
		<div className=''>
			<div className='border border-gray-300 mx-auto mt-12 max-w-sm w-full rounded p-4'>
				<div className='mb-4 text-center'>
					<h1 className='font-bold'>Welcome to POS app</h1>
					<p className='text-sm'>{type} to continue</p>
				</div>
				{type === 'login' ? <LoginForm /> : <SignupForm />}
				<div className='mt-4 flex space-x-2 items-center'>
					<small>
						{type === 'register'
							? 'Already have an account?'
							: `Don't have an account?`}
					</small>
					<button
						onClick={() =>
							setType((p) => (p === 'login' ? 'register' : 'login'))
						}
						className='text-xs font-bold underline text-blue-500 cursor-pointer'
					>
						{type === 'login' ? 'Create account' : 'Login'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default SignupPage
