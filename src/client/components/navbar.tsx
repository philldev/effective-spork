import { ReactElement, useState } from 'react'
import {
	Navbar,
	Center,
	Tooltip,
	UnstyledButton,
	createStyles,
	Stack,
} from '@mantine/core'
import { navLinks } from '../../utils/nav-links'
import { IconType } from 'react-icons'
import { Logo } from './logo'
import { TbLogout, TbSwitchHorizontal } from 'react-icons/tb'
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
	link: {
		width: 50,
		height: 50,
		borderRadius: theme.radius.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[0],
		},
	},

	active: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},
}))

interface NavbarLinkProps {
	icon: IconType
	label: string
	active?: boolean
	onClick?(): void
	href?: string
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
	const { classes, cx } = useStyles()
	return (
		<Tooltip label={label} position='right' transitionDuration={0}>
			<UnstyledButton
				onClick={onClick}
				className={cx(classes.link, { [classes.active]: active })}
			>
				<Icon size={22} />
			</UnstyledButton>
		</Tooltip>
	)
}

export function NavbarMinimal() {
	const router = useRouter()
	const links = navLinks.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={
				router.pathname === '/'
					? router.pathname === link.href
					: link.href.includes(router.asPath)
			}
			onClick={() => router.push(link.href)}
		/>
	))

	return (
		<Navbar width={{ base: 80 }} p='md'>
			<Center>
				<Logo />
			</Center>
			<Navbar.Section grow mt={50}>
				<Stack justify='center' spacing={0}>
					{links}
				</Stack>
			</Navbar.Section>
			<Navbar.Section>
				<Stack justify='center' spacing={0}>
					<NavbarLink icon={TbSwitchHorizontal} label='Change account' />
					<NavbarLink icon={TbLogout} label='Logout' />
				</Stack>
			</Navbar.Section>
		</Navbar>
	)
}
