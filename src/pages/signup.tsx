import { TextInput } from '../components/text-input'

const SignupPage = () => {
	return (
		<div className=''>
			<div className='border border-gray-300 mx-auto mt-12 max-w-sm w-full rounded p-4'>
				<div className='mb-4'>
					<h1 className='font-bold'>Welcome to POS app</h1>
					<p className='text-sm'>Create account to continue</p>
				</div>
				<form className='space-y-3'>
					<TextInput label='Full name' />
					<TextInput label='Email' type='email' />
					<TextInput label='Password' type='password' />
					<div>
						<small>By creating account you agree with tnc</small>
					</div>
					<div>
						<button className='w-full h-10 px-3 bg-blue-500 focus:ring-blue-500 text-white rounded mt-4 block font-bold text-sm'>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignupPage
