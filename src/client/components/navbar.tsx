import {
	Center,
	createStyles,
	Navbar,
	Stack,
	Text,
	Tooltip,
	UnstyledButton,
	useMantineTheme,
} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons'
import { TbLogout, TbSwitchHorizontal } from 'react-icons/tb'
import { navLinks } from '../../utils/nav-links'
import { Logo } from './logo'

const useStyles = createStyles((theme, _params, getRef) => ({
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
		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			width: 'auto',
			justifyContent: 'flex-start',
			padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
			[`& .${getRef('text')} `]: {
				display: 'block',
			},
		},
	},

	text: {
		ref: getRef('text'),
		marginLeft: theme.spacing.sm,
		fontSize: theme.fontSizes.sm,
		fontWeight: 'bold',
		display: 'none',
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

	const viewPortSize = useViewportSize()
	const theme = useMantineTheme()
	const isMobile = viewPortSize.width < theme.breakpoints.md

	return (
		<Tooltip
			disabled={!isMobile}
			label={label}
			position='right'
			transitionDuration={0}
		>
			<UnstyledButton
				onClick={onClick}
				className={cx(classes.link, { [classes.active]: active })}
			>
				<Icon size={22} />

				<Text className={classes.text}>{label}</Text>
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
		<Navbar width={{ base: 80, md: 275 }} p='md'>
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
