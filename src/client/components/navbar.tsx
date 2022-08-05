import {
	createStyles,
	Navbar,
	Title,
	Tooltip,
	UnstyledButton,
	useMantineTheme,
} from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'
import { TbGauge, TbHome2, TbInbox, TbSettings, TbUser } from 'react-icons/tb'
import { BsInboxes } from 'react-icons/bs'
import { Logo } from './logo'
import { useRouter } from 'next/router'
const useStyles = createStyles((theme) => ({
	wrapper: {
		display: 'flex',
	},

	aside: {
		flex: '0 0 60px',
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRight: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
		}`,
	},

	main: {
		flex: 1,
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
	},

	mainLink: {
		width: 44,
		height: 44,
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

	mainLinkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},

	title: {
		boxSizing: 'border-box',
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		marginBottom: theme.spacing.xl,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		padding: theme.spacing.md,
		paddingTop: 18,
		height: 60,
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
		}`,
	},

	logo: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		height: 60,
		paddingTop: theme.spacing.md,
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
		}`,
		marginBottom: theme.spacing.xl,
	},

	link: {
		boxSizing: 'border-box',
		display: 'block',
		textDecoration: 'none',
		borderTopRightRadius: theme.radius.md,
		borderBottomRightRadius: theme.radius.md,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		padding: `0 ${theme.spacing.md}px`,
		fontSize: theme.fontSizes.sm,
		marginRight: theme.spacing.md,
		fontWeight: 500,
		height: 44,
		lineHeight: '44px',

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[1],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	linkActive: {
		'&, &:hover': {
			borderLeftColor: theme.fn.variant({
				variant: 'filled',
				color: theme.primaryColor,
			}).background,
			backgroundColor: theme.fn.variant({
				variant: 'filled',
				color: theme.primaryColor,
			}).background,
			color: theme.white,
		},
	},
}))

const mainLinksMockdata = [
	{ icon: TbHome2, label: 'Home', href: '/' },
	{ icon: TbGauge, label: 'Dashboard', href: '/dashboard' },
	{ icon: TbInbox, label: 'Products', href: '/products' },
	{ icon: TbUser, label: 'Account', href: '/account' },
	{ icon: TbSettings, label: 'Settings', href: '/settings' },
]

export function DoubleNavbar() {
	const { classes, cx } = useStyles()
	const [active, setActive] = useState('Releases')
	const router = useRouter()
	const mainLinks = mainLinksMockdata.map((link) => (
		<Tooltip
			label={link.label}
			position='right'
			withArrow
			transitionDuration={0}
			key={link.label}
		>
			<Link href={link.href} passHref>
				<UnstyledButton
					onClick={() => setActive(link.label)}
					className={cx(classes.mainLink, {
						[classes.mainLinkActive]:
							link.href === '/'
								? router.pathname === '/'
								: router.asPath.includes(link.href),
					})}
				>
					<link.icon size='18px' />
				</UnstyledButton>
			</Link>
		</Tooltip>
	))

	return (
		<Navbar>
			<Navbar.Section grow className={classes.wrapper}>
				<div className={classes.aside}>
					<div className={classes.logo}>
						<Logo />
					</div>
					{mainLinks}
				</div>
			</Navbar.Section>
		</Navbar>
	)
}
