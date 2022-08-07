import { AppShell } from '@mantine/core'
import { ReactElement } from 'react'
import { NavbarMinimal } from './navbar'

interface AppLayoutProps {
	children?: ReactElement
}

export const AppLayout = ({ children }: AppLayoutProps) => {
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
			{children}
		</AppShell>
	)
}
