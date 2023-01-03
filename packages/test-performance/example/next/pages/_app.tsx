import Head from 'next/head';
import React from 'react';
import type { SolitoAppProps } from 'solito';
import 'raf/polyfill';
import { GluestackUIProvider } from '@gluestack/ui-creator';
import { config } from '../ui.config';

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Performance test Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GluestackUIProvider config={config}>
        <Component {...pageProps} />
      </GluestackUIProvider>
    </>
  );
}

export default MyApp;
