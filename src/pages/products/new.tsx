import { Box, Breadcrumbs, Title } from '@mantine/core'
import { AppLayout } from '../../client/components/app-layout'
import { ProductForm } from '../../client/components/products/product-form'
import { createBreadcrumbs } from '../../client/utils/create-breadcrumbs'
import { NextPageWithLayout } from '../_app'

const breadcrumbs = createBreadcrumbs([
	{
		href: '/products',
		title: 'Products',
	},
	{
		href: '/products/new',
		title: 'New product',
	},
])

const Home: NextPageWithLayout = () => {
	return <ProductForm />
}

Home.getLayout = (page) => {
	return (
		<AppLayout title='New product' breadcrumbs={breadcrumbs}>
			{page}
		</AppLayout>
	)
}

export default Home
