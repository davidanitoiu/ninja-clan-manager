import "@fontsource/permanent-marker";
import Layout from "components/Layout";
import type { AppProps } from 'next/app';
import Head from "next/head";
import { useEffect } from "react";
import 'styles/globals.css';
import { generateNinja } from "utils/engine";
import { Ninja } from "utils/types/character";

interface MyAppProps extends AppProps {
  ninjas: Ninja[]
}

function MyApp({ Component, pageProps, ninjas }: MyAppProps) {
  useEffect(() => {
    const ninjaRoster = localStorage.getItem('ninjaRoster');

    if(!ninjaRoster) {
      localStorage.setItem('ninjaRoster', JSON.stringify(ninjas));
    }
  }, [])

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

MyApp.getInitialProps = async () => {
  const ninjas = [generateNinja(50), generateNinja(70), generateNinja(60), generateNinja(40), generateNinja(20), generateNinja(100), generateNinja(100)];
  return { ninjas }
}

export default MyApp
