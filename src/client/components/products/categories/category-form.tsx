import { Box, Button, createStyles, Stack, TextInput } from '@mantine/core'

const useStyles = createStyles((theme) => ({
	box: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.colors.gray[3],
		background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : '#fff',
		borderRadius: theme.radius.md,
		padding: theme.spacing.xl,
	},
}))

export function CategoryForm() {
	const { classes } = useStyles()
	return (
		<Box className={classes.box}>
			<form>
				<Stack>
					<TextInput label='Category name' />
					<Box>
						<Button>Create category</Button>
					</Box>
				</Stack>
			</form>
		</Box>
	)
}
