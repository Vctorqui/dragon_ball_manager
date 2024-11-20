import { Layout } from '@/layouts/Layout'
import Banner from '@/components/Banner'
import Contribution from '@/components/Contribution'
import ListOfCharacters from '@/components/Characters'

const Home = () => {
  return (
    <Layout>
      <Banner />
      <ListOfCharacters />
      <Contribution />
    </Layout>
  )
}

export default Home
