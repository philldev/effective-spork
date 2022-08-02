import { AppLayout } from '../../client/components/app-layout'
import { NextPageWithLayout } from '../_app'

const AppPage: NextPageWithLayout = () => {
	return <div className=''></div>
}

AppPage.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>
}

export default AppPage
