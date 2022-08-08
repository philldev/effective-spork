import { Box, Breadcrumbs, Stack, Title } from '@mantine/core'
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
	return <CategoryList data={data} />
}

Home.getLayout = (page) => {
	return (
		<AppLayout title='Product Categories' breadcrumbs={breadcrumbs}>
			{page}
		</AppLayout>
	)
}

export default Home
