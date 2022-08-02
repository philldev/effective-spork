import { ReactElement } from 'react'
import { Sidebar } from './sidebar'

export const AppLayout = ({ children }: { children?: ReactElement }) => {
	return (
		<div className='flex min-h-screen'>
			<Sidebar />
			<div className='flex-1 bg-gray-200 flex'>
				<div>{children}</div>
			</div>
		</div>
	)
}
