import { AppShell, Box, Breadcrumbs, Stack, Title } from '@mantine/core'
import { ReactElement } from 'react'
import { NavbarMinimal } from './navbar'

interface AppLayoutProps {
	children?: ReactElement
	breadcrumbs: JSX.Element[]
	title: string
}

export const AppLayout = ({ children, breadcrumbs, title }: AppLayoutProps) => {
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
			<Stack sx={{ height: '100%' }} spacing='sm'>
				<Box>
					<Breadcrumbs>{breadcrumbs}</Breadcrumbs>
					<Title order={3}>{title}</Title>
				</Box>
				{children}
			</Stack>
		</AppShell>
	)
}
