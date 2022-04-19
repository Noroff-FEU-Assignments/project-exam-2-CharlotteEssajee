import { setup } from "goober";
import { prefix } from "goober/prefixer";
import { createElement } from "react";
import "@styles/global.css";
import "@styles/reset.css";

setup(createElement, prefix);

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
