import { Box, Button, Stack, TextInput } from '@mantine/core'
import { useLayoutStyles } from '../../../styles/layout'

export function CategoryForm() {
	const { classes } = useLayoutStyles()
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
