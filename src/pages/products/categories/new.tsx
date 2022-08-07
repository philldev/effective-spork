import { Box, Breadcrumbs, Title } from '@mantine/core'
import { AppLayout } from '../../../client/components/app-layout'
import { CategoryForm } from '../../../client/components/products/categories/category-form'
import { createBreadcrumbs } from '../../../client/utils/create-breadcrumbs'
import { NextPageWithLayout } from '../../_app'

const breadcrumbs = createBreadcrumbs([
	{
		href: '/products',
		title: 'Products',
	},
	{
		href: '/products/categories',
		title: 'Categories',
	},
	{
		href: '/products/categories/new',
		title: 'New category',
	},
])

const Home: NextPageWithLayout = () => {
	return (
		<Box>
			<Breadcrumbs>{breadcrumbs}</Breadcrumbs>
			<Title mb='xl'>New Category</Title>
			<CategoryForm />
		</Box>
	)
}

Home.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>
}

export default Home
