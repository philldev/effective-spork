import { SignupForm } from '../components/signup-form'
import { TextInput } from '../components/text-input'

const SignupPage = () => {
	return (
		<div className=''>
			<div className='border border-gray-300 mx-auto mt-12 max-w-sm w-full rounded p-4'>
				<div className='mb-4'>
					<h1 className='font-bold'>Welcome to POS app</h1>
					<p className='text-sm'>Create account to continue</p>
				</div>
				<SignupForm />
			</div>
		</div>
	)
}

export default SignupPage
