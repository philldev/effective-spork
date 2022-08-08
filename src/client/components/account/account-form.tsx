import {
	Box,
	createStyles,
	Divider,
	Group,
	Input,
	SimpleGrid,
	Stack,
	Title,
} from '@mantine/core'
import { useLayoutStyles } from '../../styles/layout'

const useStyles = createStyles((theme) => ({
	wrapper: {
		// maxWidth: 760,
		width: '100%',
	},
	field: {
		width: '100%',
		alignItems: 'center',
	},

	input: {
		maxWidth: 450,
	},
}))

export function AccountForm() {
	const { classes: layoutClasses } = useLayoutStyles()
	const { classes } = useStyles()
	return (
		<Box className={layoutClasses.box}>
			<Title order={5} mb='sm'>
				Account details
			</Title>
			<Divider />
			<Stack className={classes.wrapper} spacing='xl' py='lg'>
				<SimpleGrid cols={2} className={classes.field}>
					<Input.Label>Username</Input.Label>
					<Input className={classes.input} />
				</SimpleGrid>
				<SimpleGrid cols={2} className={classes.field}>
					<Input.Label>Email</Input.Label>
					<Input className={classes.input} />
				</SimpleGrid>
				<SimpleGrid cols={2} className={classes.field}>
					<Input.Label>Password</Input.Label>
					<Input className={classes.input} />
				</SimpleGrid>
			</Stack>
		</Box>
	)
}
