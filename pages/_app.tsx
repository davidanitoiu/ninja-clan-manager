import "@fontsource/permanent-marker";
import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ninja Clan Manager</title>
        <meta name="description" content="Manager type game, inspired by Football Manager, but with Ninjas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
