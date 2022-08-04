import { AppShell } from '@mantine/core'
import { Code, createStyles, Group, Navbar } from '@mantine/core'
import {
	Icon2fa,
	IconBellRinging,
	IconDatabaseImport,
	IconFingerprint,
	IconKey,
	IconLogout,
	IconReceipt2,
	IconSettings,
	IconSwitchHorizontal,
} from '@tabler/icons'
import { ReactElement, useState } from 'react'

interface AppLayoutProps {
	children?: ReactElement
}

export const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<AppShell
			padding='md'
			navbar={<NavbarSimpleColored />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			{children}
		</AppShell>
	)
}

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef('icon')
	return {
		navbar: {
			backgroundColor: theme.fn.variant({
				variant: 'filled',
				color: theme.primaryColor,
			}).background,
		},

		version: {
			backgroundColor: theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
					.background,
				0.1
			),
			color: theme.white,
			fontWeight: 700,
		},

		header: {
			paddingBottom: theme.spacing.md,
			marginBottom: theme.spacing.md * 1.5,
			borderBottom: `1px solid ${theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
					.background,
				0.1
			)}`,
		},

		footer: {
			paddingTop: theme.spacing.md,
			marginTop: theme.spacing.md,
			borderTop: `1px solid ${theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
					.background,
				0.1
			)}`,
		},

		link: {
			...theme.fn.focusStyles(),
			display: 'flex',
			alignItems: 'center',
			textDecoration: 'none',
			fontSize: theme.fontSizes.sm,
			color: theme.white,
			padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			borderRadius: theme.radius.sm,
			fontWeight: 500,

			'&:hover': {
				backgroundColor: theme.fn.lighten(
					theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
						.background,
					0.1
				),
			},
		},

		linkIcon: {
			ref: icon,
			color: theme.white,
			opacity: 0.75,
			marginRight: theme.spacing.sm,
		},

		linkActive: {
			'&, &:hover': {
				backgroundColor: theme.fn.lighten(
					theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
						.background,
					0.15
				),
				[`& .${icon}`]: {
					opacity: 0.9,
				},
			},
		},
	}
})

const data = [
	{ link: '', label: 'Notifications', icon: IconBellRinging },
	{ link: '', label: 'Billing', icon: IconReceipt2 },
	{ link: '', label: 'Security', icon: IconFingerprint },
	{ link: '', label: 'SSH Keys', icon: IconKey },
	{ link: '', label: 'Databases', icon: IconDatabaseImport },
	{ link: '', label: 'Authentication', icon: Icon2fa },
	{ link: '', label: 'Other Settings', icon: IconSettings },
]

function NavbarSimpleColored() {
	const { classes, cx } = useStyles()
	const [active, setActive] = useState('Billing')

	const links = data.map((item) => (
		<a
			className={cx(classes.link, {
				[classes.linkActive]: item.label === active,
			})}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault()
				setActive(item.label)
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	))

	return (
		<Navbar width={{ sm: 300 }} p='md' className={classes.navbar}>
			<Navbar.Section grow>
				<Group className={classes.header} position='apart'>
					<Logo />
					<Code className={classes.version}>v3.1.2</Code>
				</Group>
				{links}
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				<a
					href='#'
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
					<span>Change account</span>
				</a>

				<a
					href='#'
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</a>
			</Navbar.Section>
		</Navbar>
	)
}

function Logo() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='153'
			height='38'
			fill='none'
			viewBox='0 0 153 38'
		>
			<path
				fill='#192657'
				d='M.879 28.182V9.394l9.394 5.219v8.402l7.515 4.227 7.515-4.227v-8.402l9.394-5.22v18.789l-16.91 9.394L.88 28.182z'
			></path>
			<path
				fill='url(#paint0_linear_0_8)'
				fillRule='evenodd'
				d='M5.576 12.003L.879 9.393 17.788 0l16.909 9.394L30 12.004v13.83l-12.212 7.045-12.212-7.046v-13.83zm23.915.283l-4.188 2.327v-.052l-7.515-4.228-7.515 4.228v.052l-4.188-2.327v13.258l11.703 6.752 11.703-6.752V12.286z'
				clipRule='evenodd'
			></path>
			<path
				fill='#192657'
				d='M43.7 26.697V10.915h2.976v13.076h7.215v2.706H43.7zM60.316 27.013c-1.112 0-2.112-.226-2.999-.677a5.072 5.072 0 01-2.096-1.961c-.511-.857-.767-1.887-.767-3.089v-.36c0-1.203.256-2.233.767-3.09a5.072 5.072 0 012.096-1.96c.887-.452 1.887-.677 2.999-.677s2.112.225 2.998.676a5.072 5.072 0 012.097 1.962c.511.856.767 1.886.767 3.088v.361c0 1.202-.256 2.232-.767 3.089a5.072 5.072 0 01-2.096 1.961c-.887.451-1.887.677-3 .677zm0-2.526c.872 0 1.593-.277 2.164-.834.572-.57.857-1.383.857-2.435v-.225c0-1.052-.286-1.856-.857-2.412-.556-.572-1.277-.857-2.164-.857-.872 0-1.593.285-2.164.857-.572.556-.857 1.36-.857 2.412v.225c0 1.052.285 1.864.857 2.435.57.556 1.292.835 2.164.835zM67.244 21.15v-.36c0-1.172.233-2.172.7-2.998.465-.842 1.081-1.481 1.848-1.917a5.01 5.01 0 012.547-.676c1.023 0 1.797.18 2.323.54.526.362.91.737 1.15 1.128h.405v-1.353h2.796v13.167c0 .767-.226 1.375-.676 1.826-.451.466-1.053.7-1.804.7h-7.485v-2.48h6.493c.42 0 .631-.226.631-.677V25.14h-.406c-.15.24-.36.489-.63.744-.271.24-.632.444-1.083.61-.45.164-1.022.247-1.713.247a5.144 5.144 0 01-2.548-.654c-.767-.45-1.383-1.09-1.849-1.916-.466-.842-.699-1.849-.699-3.021zm5.907 3.112c.872 0 1.6-.278 2.187-.834.586-.556.88-1.338.88-2.345v-.225c0-1.022-.294-1.804-.88-2.345-.571-.556-1.3-.834-2.187-.834-.872 0-1.6.278-2.187.834-.586.541-.879 1.323-.879 2.345v.225c0 1.007.293 1.789.88 2.345.585.556 1.314.834 2.186.834zM86.469 27.013c-1.113 0-2.112-.226-2.999-.677a5.072 5.072 0 01-2.097-1.961c-.51-.857-.766-1.887-.766-3.089v-.36c0-1.203.255-2.233.766-3.09a5.072 5.072 0 012.097-1.96c.887-.452 1.886-.677 2.999-.677 1.112 0 2.111.225 2.998.676a5.072 5.072 0 012.097 1.962c.511.856.767 1.886.767 3.088v.361c0 1.202-.256 2.232-.767 3.089a5.072 5.072 0 01-2.097 1.961c-.887.451-1.886.677-2.998.677zm0-2.526c.871 0 1.593-.277 2.164-.834.571-.57.857-1.383.857-2.435v-.225c0-1.052-.286-1.856-.857-2.412-.556-.572-1.277-.857-2.164-.857-.872 0-1.593.285-2.165.857-.57.556-.856 1.36-.856 2.412v.225c0 1.052.285 1.864.856 2.435.572.556 1.293.835 2.165.835zM93.938 26.697V15.514h2.84v11.183h-2.84zm1.42-12.49c-.51 0-.947-.166-1.307-.496-.346-.33-.519-.767-.519-1.308 0-.54.173-.977.519-1.308.36-.33.796-.495 1.307-.495.526 0 .962.165 1.308.495.346.331.519.767.519 1.308s-.173.977-.519 1.308c-.346.33-.781.496-1.308.496zM98.912 31.206V15.514h2.796v1.353h.406c.255-.436.653-.819 1.195-1.15.541-.345 1.315-.518 2.322-.518.902 0 1.736.225 2.502.676.767.436 1.383 1.082 1.849 1.94.466.856.699 1.893.699 3.11v.361c0 1.217-.233 2.255-.699 3.111-.466.857-1.082 1.51-1.849 1.962-.766.436-1.6.654-2.502.654-.677 0-1.248-.083-1.714-.248-.451-.15-.819-.346-1.104-.587a4.2 4.2 0 01-.654-.766h-.406v5.794h-2.84zm5.862-6.673c.887 0 1.616-.279 2.187-.835.586-.57.879-1.397.879-2.48v-.225c0-1.082-.293-1.901-.879-2.457-.586-.572-1.315-.857-2.187-.857-.872 0-1.601.285-2.187.857-.586.556-.879 1.375-.879 2.457v.225c0 1.083.293 1.91.879 2.48.586.556 1.315.835 2.187.835zM116.919 27.013c-1.458 0-2.653-.316-3.585-.947-.931-.632-1.495-1.533-1.691-2.706l2.616-.676c.105.526.278.94.518 1.24.256.3.564.518.925.654.375.12.781.18 1.217.18.661 0 1.15-.113 1.466-.338.315-.24.473-.534.473-.88a.866.866 0 00-.451-.788c-.3-.196-.781-.354-1.443-.474l-.631-.113a11.957 11.957 0 01-2.142-.608c-.646-.27-1.165-.64-1.556-1.105-.39-.466-.586-1.067-.586-1.804 0-1.112.406-1.961 1.218-2.547.811-.602 1.879-.902 3.201-.902 1.248 0 2.285.278 3.111.834.827.556 1.368 1.285 1.624 2.187l-2.638.812c-.12-.572-.368-.977-.744-1.218-.361-.24-.812-.36-1.353-.36-.541 0-.954.097-1.24.292a.858.858 0 00-.428.767c0 .36.15.631.451.812.3.165.706.293 1.217.383l.631.113c.842.15 1.601.353 2.278.608.691.24 1.232.594 1.623 1.06.406.45.609 1.067.609 1.849 0 1.172-.429 2.081-1.286 2.728-.841.631-1.976.947-3.404.947zM127.344 26.877c-.871 0-1.638-.195-2.299-.586a4.167 4.167 0 01-1.511-1.668c-.36-.707-.541-1.518-.541-2.435v-6.674h2.841v6.448c0 .842.203 1.473.609 1.894.42.421 1.014.631 1.781.631.871 0 1.548-.285 2.029-.856.481-.586.721-1.398.721-2.435v-5.682h2.841v11.183h-2.796v-1.465h-.405c-.181.375-.519.744-1.015 1.104-.496.361-1.248.541-2.255.541zM135.962 26.697V15.514h2.795v1.218h.406c.195-.376.519-.699.969-.97.451-.285 1.045-.428 1.782-.428.796 0 1.435.158 1.916.473.481.301.849.7 1.105 1.195h.405c.256-.48.617-.879 1.083-1.194.466-.316 1.127-.474 1.984-.474.691 0 1.315.15 1.871.451.571.285 1.022.729 1.353 1.33.345.586.518 1.33.518 2.232v7.35h-2.841V19.55c0-.616-.157-1.075-.473-1.375-.316-.316-.759-.474-1.33-.474-.646 0-1.15.21-1.511.632-.345.405-.518.992-.518 1.758v6.606h-2.841V19.55c0-.616-.158-1.075-.473-1.375-.316-.316-.759-.474-1.331-.474-.646 0-1.149.21-1.51.632-.346.405-.519.992-.519 1.758v6.606h-2.84z'
			></path>
			<defs>
				<linearGradient
					id='paint0_linear_0_8'
					x1='5.576'
					x2='30.939'
					y1='7.306'
					y2='7.306'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#64C2DB'></stop>
					<stop offset='0.307' stopColor='#7476ED'></stop>
					<stop offset='0.604' stopColor='#C994DF'></stop>
					<stop offset='1' stopColor='#E56F8C'></stop>
				</linearGradient>
			</defs>
		</svg>
	)
}
