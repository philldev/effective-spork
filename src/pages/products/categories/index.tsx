import { Box, Breadcrumbs, Title } from '@mantine/core'
import { AppLayout } from '../../../client/components/app-layout'
import { CategoryList } from '../../../client/components/products/categories/category-list'
import { createBreadcrumbs } from '../../../client/utils/create-breadcrumbs'
import { NextPageWithLayout } from '../../_app'

const data = [
	{
		category: 'Drinks',
		productCount: '5',
	},
]

const breadcrumbs = createBreadcrumbs([
	{
		href: '/products',
		title: 'Products',
	},
	{
		href: '/products/categories',
		title: 'Categories',
	},
])

const Home: NextPageWithLayout = () => {
	return (
		<Box>
			<Breadcrumbs>{breadcrumbs}</Breadcrumbs>
			<Title mb='xl'>Products Categories</Title>
			<CategoryList data={data} />
		</Box>
	)
}

Home.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>
}

export default Home
