import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Global, css } from "@emotion/react";

/**
 * Css normalize - reset all default values.
 */
function CssNormalized() {
  return (
    <Global
      styles={css`
        body {
          margin: 0px;
          padding: 0px;
          font-family: "Helvetica Nueue" "Roboto", sans-serif;
        }
        iframe {
          border: none;
        }
      `}
    />
  );
}

function HeadInjection() {
  return (
    <Head>
      <CssNormalized />
      <SeoMeta />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&"
        rel="stylesheet"
        type="text/css"
      />
    </Head>
  );
}

function SeoMeta() {
  return (
    <>
      <meta property="title" content="Design to Codes" />
      <meta property="description" content="Design to Codes description" />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadInjection />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
