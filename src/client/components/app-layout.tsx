import { ReactElement } from 'react'
import { Sidebar } from './sidebar'

export const AppLayout = ({ children }: { children?: ReactElement }) => {
	return (
		<div className='flex min-h-screen'>
			<Sidebar />
			<div className='flex-1 flex'>
				<div className='px-10 py-6 w-full'>{children}</div>
			</div>
		</div>
	)
}
