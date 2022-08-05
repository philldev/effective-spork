import { AppShell } from '@mantine/core'
import { ReactElement } from 'react'
import { DoubleNavbar } from './navbar'

interface AppLayoutProps {
	children?: ReactElement
}

export const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<AppShell
			padding='md'
			navbar={<DoubleNavbar />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],

					padding: theme.spacing.lg,
					marginLeft: 60,
					flex: '1',
					width: 'auto',
				},
			})}
		>
			{children}
		</AppShell>
	)
}
