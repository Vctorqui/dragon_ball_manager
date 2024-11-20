import { Layout } from '@/layouts/Layout'
import Banner from '@/components/Banner'
import HomeListCharacters from '@/components/HomeListCharacter'

const Home = () => {
  return (
    <Layout>
      <Banner />
      <HomeListCharacters />
    </Layout>
  )
}

export default Home
