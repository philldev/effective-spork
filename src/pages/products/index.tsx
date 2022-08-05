import { AppLayout } from '../../client/components/app-layout'
import { NextPageWithLayout } from '../_app'

const Home: NextPageWithLayout = () => {
	return <div></div>
}

Home.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>
}

export default Home
