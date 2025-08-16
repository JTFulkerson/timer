import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../src/styles/input.css';
import { Analytics } from '@vercel/analytics/next';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Timer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
