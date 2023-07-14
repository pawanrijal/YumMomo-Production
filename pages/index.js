import Head from 'next/head'
import Body from '../components/Body'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Yum Mo:Mo - Nepali swad ko sath</title>
        <meta name="description" content="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body/>
    </div>
  )
}
