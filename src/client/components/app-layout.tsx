import {
	AppShell,
	Center,
	createStyles,
	Group,
	Header,
	Stack,
} from '@mantine/core'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../pages/_app'
import { Logo } from './logo'
import { NavbarMinimal } from './navbar'
import { UserButton } from './user-button'

const useStyles = createStyles((theme) => ({
	mainWrapper: {
		maxWidth: theme.breakpoints.md,
		height: '100%',
	},
}))

interface AppLayoutProps {
	children?: ReactElement
}

export const AppLayout = ({ children }: AppLayoutProps) => {
	const { classes } = useStyles()
	return (
		<AppShell
			padding='md'
			navbar={<NavbarMinimal />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],

					padding: theme.spacing.lg,
					marginLeft: 80,
				},
			})}
		>
			<Stack className={classes.mainWrapper} spacing='sm'>
				{children}
			</Stack>
		</AppShell>
	)
}

export const withAppLayout = (comp: NextPageWithLayout) => {
	comp.getLayout = (page) => {
		return <AppLayout>{page}</AppLayout>
	}
	return comp
}
