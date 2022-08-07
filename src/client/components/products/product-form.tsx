import {
	Box,
	Button,
	createStyles,
	Select,
	Stack,
	TextInput,
} from '@mantine/core'

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

export function ProductForm() {
	const { classes } = useStyles()
	return (
		<Box className={classes.box}>
			<form>
				<Stack>
					<TextInput label='Name' placeholder='Enter product name' />
					<TextInput
						label='Price'
						type='number'
						placeholder='Enter product price amount'
					/>
					<Select
						label='Category'
						placeholder='Pick one'
						data={[
							{ value: 'react', label: 'React' },
							{ value: 'ng', label: 'Angular' },
							{ value: 'svelte', label: 'Svelte' },
						]}
					/>
					<Box>
						<Button>Create product</Button>
					</Box>
				</Stack>
			</form>
		</Box>
	)
}
