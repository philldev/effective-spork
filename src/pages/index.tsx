import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
	return <div></div>
}

Home.getLayout = (page) => {
	return <div>{page}</div>
}

export default Home
