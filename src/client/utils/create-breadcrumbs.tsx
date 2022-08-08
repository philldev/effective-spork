import { Anchor, Button } from '@mantine/core'
import Link from 'next/link'

interface Item {
	title: string
	href: string
}

export function createBreadcrumbs(data: Item[]) {
	return data.map((item, index) => (
		<Link href={item.href} passHref key={index}>
			<Anchor size='xs'>{item.title}</Anchor>
		</Link>
	))
}
