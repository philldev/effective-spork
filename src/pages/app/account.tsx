import { AppLayout } from '../../client/components/app-layout'
import { NextPageWithLayout } from '../_app'

const AccountPage: NextPageWithLayout = () => {
	return <div></div>
}

AccountPage.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>
}

export default AccountPage
