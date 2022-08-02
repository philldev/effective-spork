import Link from 'next/link'
import { useRouter } from 'next/router'
import { ButtonHTMLAttributes, HTMLProps, ReactNode } from 'react'

export const Sidebar = () => {
	return (
		<div className='w-[225px] flex flex-col border-r shadow'>
			<div className='flex flex-col flex-1 p-4'>
				<div className='flex flex-col space-y-1'>
					<NavItem href='/app'>Dashboard</NavItem>
					<NavItem href='/app/products'>Products</NavItem>
					<NavItem href='/app/account'>Account</NavItem>
				</div>
				<div className='flex flex-col space-y-1 mt-auto'>
					<NavItemBtn
						onClick={() => {}}
						className='hover:bg-red-500 text-red-400'
					>
						Logout
					</NavItemBtn>
				</div>
			</div>
		</div>
	)
}

const NavItem = ({
	children,
	href,
	...props
}: {
	children: ReactNode
	href: string
} & HTMLProps<HTMLAnchorElement>) => {
	const router = useRouter()
	const ROOT_PATH = '/app'
	const isRoot = href === ROOT_PATH
	const active = isRoot
		? router.pathname === ROOT_PATH
		: router.asPath.includes(href)

	console.log(router.asPath, href)

	return (
		<Link href={href} passHref>
			<a
				className={`${
					active ? ' text-black' : 'text-gray-500'
				} transition-all font-bold hover:bg-blue-500 hover:text-white py-2 px-2 rounded cursor-pointer`}
				{...props}
			>
				{children}
			</a>
		</Link>
	)
}

const NavItemBtn = ({
	children,
	className,
	...props
}: {
	children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={`${className} transition-all text-left font-medium hover:bg-blue-500 hover:text-white py-2 px-2 rounded cursor-pointer`}
			{...props}
		>
			{children}
		</button>
	)
}
