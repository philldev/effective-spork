import { useState } from 'react'
import {
	createStyles,
	Table,
	ScrollArea,
	UnstyledButton,
	Group,
	Text,
	Center,
	TextInput,
	Button,
	ActionIcon,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
	TbSelector,
	TbChevronDown,
	TbChevronUp,
	TbSearch,
	TbPlus,
	TbEdit,
	TbTrash,
} from 'react-icons/tb'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
	th: {
		padding: '0 !important',
	},

	control: {
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	icon: {
		width: 21,
		height: 21,
		borderRadius: 21,
	},
}))

interface RowData {
	category: string
	productCount: string
}

interface TableSortProps {
	data: RowData[]
}

interface ThProps {
	children: React.ReactNode
	reversed?: boolean
	sorted?: boolean
	onSort?(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
	const { classes } = useStyles()
	const Icon = sorted ? (reversed ? TbChevronUp : TbChevronDown) : TbSelector
	return (
		<th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group position='apart'>
					<Text weight={500} size='sm'>
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon size={14} />
					</Center>
				</Group>
			</UnstyledButton>
		</th>
	)
}

function filterData(data: RowData[], search: string) {
	const query = search.toLowerCase().trim()
	return data.filter((item) =>
		keys(data[0]).some((key) =>
			(item[key] as string).toLowerCase().includes(query)
		)
	)
}

function sortData(
	data: RowData[],
	payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
	const { sortBy } = payload

	if (!sortBy) {
		return filterData(data, payload.search)
	}

	return filterData(
		[...data].sort((a, b) => {
			if (payload.reversed) {
				return b[sortBy].localeCompare(a[sortBy])
			}

			return a[sortBy].localeCompare(b[sortBy])
		}),
		payload.search
	)
}

export function CategoryList({ data }: TableSortProps) {
	const [search, setSearch] = useState('')
	const [sortedData, setSortedData] = useState(data)
	const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
	const [reverseSortDirection, setReverseSortDirection] = useState(false)

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false
		setReverseSortDirection(reversed)
		setSortBy(field)
		setSortedData(sortData(data, { sortBy: field, reversed, search }))
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		setSearch(value)
		setSortedData(
			sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
		)
	}

	const rows = sortedData.map((row) => (
		<tr key={row.category}>
			<td>{row.category}</td>
			<td>{row.productCount}</td>
			<td>
				<Group>
					<ActionIcon variant='filled' color='yellow'>
						<TbEdit />
					</ActionIcon>
					<ActionIcon variant='filled' color='red'>
						<TbTrash />
					</ActionIcon>
				</Group>
			</td>
		</tr>
	))

	return (
		<ScrollArea
			p='md'
			sx={(theme) => ({
				flex: '1',
				border: '1px solid',
				borderColor: theme.colors.gray[3],
				background: '#fff',
				borderRadius: theme.radius.md,
			})}
		>
			<Group mb='md'>
				<Link href='/products/categories/new' passHref>
					<Button leftIcon={<TbPlus size={14} />}>Create category</Button>
				</Link>
				<TextInput
					sx={{
						flex: '1',
					}}
					placeholder='Search by any field'
					icon={<TbSearch size={14} />}
					value={search}
					onChange={handleSearchChange}
				/>
			</Group>
			<Table
				horizontalSpacing='md'
				verticalSpacing='xs'
				sx={{ tableLayout: 'fixed', minWidth: 700 }}
			>
				<thead>
					<tr>
						<Th
							sorted={sortBy === 'category'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('category')}
						>
							Name
						</Th>
						<Th
							sorted={sortBy === 'productCount'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('productCount')}
						>
							Product Count
						</Th>
						<Th>Actions</Th>
					</tr>
				</thead>
				<tbody>
					{rows.length > 0 ? (
						rows
					) : (
						<tr>
							<td colSpan={Object.keys(data[0]!).length}>
								<Text weight={500} align='center'>
									Nothing found
								</Text>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</ScrollArea>
	)
}
