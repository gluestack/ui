import { Provider } from "@gluestack/docs/provider";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import type { SolitoAppProps } from "solito";
import "raf/polyfill";

function MyApp({ Component, pageProps }: SolitoAppProps) {
  console.log("HEERE");
  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
