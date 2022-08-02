import { AppLayout } from '../../client/components/app-layout'
import { TextInput } from '../../client/components/text-input'
import { useAuth } from '../../client/context/auth'
import { NextPageWithLayout } from '../_app'

const AccountPage: NextPageWithLayout = () => {
	const { user } = useAuth()

	return (
		<div className='border border-gray-300 w-full p-6 rounded shadow max-w-2xl mx-auto'>
			<div className='font-bold mb-4'>My Account</div>
			<div className='text-sm space-y-2'>
				<TextInput label='Name' disabled value={user?.fullName} />
				<TextInput label='Email' disabled type='email' value={user?.email} />
				<TextInput
					label='Password'
					disabled
					type='password'
					value='*********'
				/>
				<div className='py-4 flex flex-col space-y-2 items-start'>
					<button className='text-sm font-bold underline'>
						Reset password
					</button>
				</div>
			</div>
		</div>
	)
}

AccountPage.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>
}

export default AccountPage
