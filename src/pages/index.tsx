import Head from 'next/head';
import { ThemeContextProvider } from '@/context/theme.context';
import dynamic from 'next/dynamic';

const PersonsPage = dynamic(() => import('@/components/persons-page/persons-page'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Next app page router</title>
        <meta name="description" content="Page router" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeContextProvider>
        <PersonsPage />
      </ThemeContextProvider>
    </>
  );
}
