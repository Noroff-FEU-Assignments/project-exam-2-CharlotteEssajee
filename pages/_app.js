import { setup } from "goober";
import { prefix } from "goober/prefixer";
import { createElement } from "react";
import "@styles/global.css";
import "@styles/reset.css";
import SessionStorage from "context/sessionStorage";
import LocalStorage from "@context/localStorage";
import SearchModal from "@components/search/index";
import { view } from "@risingstack/react-easy-state";

setup(createElement, prefix);

function MyApp({ Component, pageProps }) {
    return (
        <>
            <SessionStorage />
            <LocalStorage />
            <SearchModal />
            <Component {...pageProps} />
        </>
    );
}

export default view(MyApp);
