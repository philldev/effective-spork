import {
	Box,
	Button,
	createStyles,
	Select,
	Stack,
	TextInput,
} from '@mantine/core'
import { useLayoutStyles } from '../../styles/layout'

export function ProductForm() {
	const { classes } = useLayoutStyles()
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
