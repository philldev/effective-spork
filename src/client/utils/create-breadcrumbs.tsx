import { Anchor } from '@mantine/core'
import Link from 'next/link'

interface Item {
	title: string
	href: string
}

export function createBreadcrumbs(data: Item[]) {
	return data.map((item, index) => (
		<Anchor component={Link} href={item.href} key={index}>
			{item.title}
		</Anchor>
	))
}
