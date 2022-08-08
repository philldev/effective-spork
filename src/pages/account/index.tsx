import { AccountForm } from '../../client/components/account/account-form'
import { AppLayout } from '../../client/components/app-layout'
import { createBreadcrumbs } from '../../client/utils/create-breadcrumbs'
import { NextPageWithLayout } from '../_app'

const breadcrumbs = createBreadcrumbs([
	{
		href: '/products',
		title: 'Products',
	},
])

const Home: NextPageWithLayout = () => {
	return <AccountForm />
}

Home.getLayout = (page) => {
	return (
		<AppLayout title='Products' breadcrumbs={breadcrumbs}>
			{page}
		</AppLayout>
	)
}

export default Home
