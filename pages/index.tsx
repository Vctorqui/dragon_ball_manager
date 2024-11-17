import { Layout } from '@/layouts/Layout'
import Banner from '@/components/Banner'
import Contribution from '@/components/Contribution'
import SearchSection from '@/components/Seach'

const Home = () => {
  return (
    <Layout>
      <Banner />
      <SearchSection />
      <Contribution />
    </Layout>
  )
}

export default Home
