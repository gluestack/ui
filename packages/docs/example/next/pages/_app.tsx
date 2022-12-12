import { Provider } from "@gluestack/docs/provider";
import Head from "next/head";
import React, { useState } from "react";
import "../styles/globals.css";
import type { SolitoAppProps } from "solito";
import "raf/polyfill";
import Layout from "layouts";
import { versions } from "../versions.json";

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const [version, setVersion]: any = useState(Object.keys(versions[0])[0]);

  function getSidebarJsonData() {
    for (let i = 0; i < versions.length; i++) {
      if (Object.keys(versions[i])[0] == version) {
        return versions[i];
      }
    }
  }
  console.log("Loaded", version);

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
        <Layout
          version={version}
          versionInfo={getSidebarJsonData()}
          setVersion={setVersion}
        >
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
