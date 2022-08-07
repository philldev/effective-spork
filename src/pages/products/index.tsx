import { Box, Breadcrumbs, Text, Title } from '@mantine/core'
import { AppLayout } from '../../client/components/app-layout'
import { ProductList } from '../../client/components/products/product-list'
import { createBreadcrumbs } from '../../client/utils/create-breadcrumbs'
import { NextPageWithLayout } from '../_app'

const data = [
	{
		name: 'asd',
		price: '123',
		category: 'hellow',
	},
]

const breadcrumbs = createBreadcrumbs([
	{
		href: '/products',
		title: 'Products',
	},
])

const Home: NextPageWithLayout = () => {
	return (
		<Box>
			<Breadcrumbs>{breadcrumbs}</Breadcrumbs>
			<Title mb='xl'>Products</Title>
			<ProductList data={data} />
		</Box>
	)
}

Home.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>
}

export default Home
