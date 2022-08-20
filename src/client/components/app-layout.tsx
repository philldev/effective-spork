import {
	ActionIcon,
	createStyles,
	Divider,
	Group,
	Text,
	UnstyledButton,
	useMantineColorScheme,
} from '@mantine/core'
import { ComponentProps } from 'client/types/component'
import { isDark } from 'client/utils/is-dark'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'pages/_app'
import {
	TbAbacus,
	TbGridDots,
	TbListDetails,
	TbMoonStars,
	TbReceipt,
	TbSun,
	TbUser,
} from 'react-icons/tb'
import { Logo } from './logo'

const HEADER_HEIGHT = 60
const SIDEBAR_WIDTH = 260

const useStyles = createStyles((theme) => ({
	appWrapper: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		backgroundColor: isDark(theme.colorScheme)
			? theme.colors.dark[9]
			: theme.colors.gray[0],
		paddingTop: HEADER_HEIGHT,
	},
	header: {
		height: HEADER_HEIGHT,
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 16px',
		borderBottom: `1px solid ${
			isDark(theme.colorScheme) ? theme.colors.dark[5] : theme.colors.gray[3]
		}`,
	},
	headerRight: {
		display: 'flex',
		alignItems: 'center',
	},
	main: {
		flex: 1,
		marginLeft: SIDEBAR_WIDTH,
	},
	sidebar: {
		position: 'fixed',
		top: HEADER_HEIGHT,
		left: 0,
		padding: '40px 0',
		width: SIDEBAR_WIDTH,
		minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
		borderRight: `1px solid ${
			isDark(theme.colorScheme) ? theme.colors.dark[5] : theme.colors.gray[3]
		}`,
	},
}))

export const AppLayout = ({ children }: ComponentProps) => {
	const { classes } = useStyles()

	return (
		<div className={classes.appWrapper}>
			<Header />
			<Sidebar />
			<div className={classes.main}>{children}</div>
		</div>
	)
}

const Sidebar = () => {
	const { classes } = useStyles()
	return (
		<div className={classes.sidebar}>
			<SideNav />
		</div>
	)
}

const useSideNavStyles = createStyles((theme) => ({
	sideNav: {
		display: 'flex',
		flexDirection: 'column',
	},
	sideNavItem: {
		display: 'flex',
		alignItems: 'center',
		padding: '12px 24px',
		fontSize: theme.fontSizes.md,
		[`&:hover`]: {
			backgroundColor: isDark(theme.colorScheme)
				? theme.colors.dark[5]
				: theme.colors.gray[2],
		},
	},
	active: {
		backgroundColor: isDark(theme.colorScheme)
			? theme.colors.dark[4]
			: theme.colors.gray[1],
	},
	icon: {
		marginRight: 16,
		display: 'flex',
		alignItems: 'center',
	},
}))

const SideNav = () => {
	const items = [
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: <TbGridDots size={18} />,
		},
		{
			label: 'Products',
			href: '/products',
			icon: <TbListDetails size={18} />,
		},
		{
			label: 'Orders',
			href: '/orders',
			icon: <TbReceipt size={18} />,
		},
	]

	const { classes, cx } = useSideNavStyles()
	const router = useRouter()

	return (
		<div className={classes.sideNav}>
			{items.map(({ label, href, icon }) => (
				<Link passHref href={href} key={label}>
					<UnstyledButton
						className={cx(classes.sideNavItem, {
							[classes.active]: href === router.pathname,
						})}
					>
						<span className={classes.icon}>{icon}</span>
						<span>{label}</span>
					</UnstyledButton>
				</Link>
			))}
		</div>
	)
}

const Header = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const { classes } = useStyles()
	return (
		<div className={classes.header}>
			<Logo fill={dark ? 'white' : 'black'} />
			<div className={classes.headerRight}>
				<Group>
					<UserButton />
					<ColorSchemeButton />
				</Group>
			</div>
		</div>
	)
}

const UserButton = () => {
	return (
		<ActionIcon variant='outline' title='user'>
			{<TbUser />}
		</ActionIcon>
	)
}

const ColorSchemeButton = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<ActionIcon
			variant='outline'
			onClick={() => toggleColorScheme()}
			title='Toggle color scheme'
		>
			{dark ? <TbSun size={18} /> : <TbMoonStars size={18} />}
		</ActionIcon>
	)
}

export const withAppLayout = (comp: NextPageWithLayout) => {
	comp.getLayout = (page) => {
		return <AppLayout>{page}</AppLayout>
	}
	return comp
}
