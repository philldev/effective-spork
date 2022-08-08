import { createStyles } from '@mantine/core'

export const useLayoutStyles = createStyles((theme) => ({
	box: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.colors.gray[3],
		background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : '#fff',
		borderRadius: theme.radius.md,
		padding: theme.spacing.xl,
	},
}))
