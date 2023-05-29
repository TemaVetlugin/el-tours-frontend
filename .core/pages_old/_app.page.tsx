import type { AppProps } from 'next/app'
import React, { useEffect } from "react";
import { configure } from "mobx"
import { enableStaticRendering } from 'mobx-react'
import Head from "next/head";

import { BootstrapModule, UserModule } from "shared/modules";
import { ErrorTracker } from "shared/utilities";

import favicon from "shared/assets/favicon.png";
import 'shared/styles/index.scss';

enableStaticRendering(typeof window === "undefined");
configure({ enforceActions: "always" })

if (typeof window !== 'undefined') {
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'local';
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME || '';
    if (environment !== 'local' && window.location.hostname !== hostname) {
        window.location.href = `http://${hostname}`;
    }
}

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        (async () => {
            await ErrorTracker.start();
            await BootstrapModule.client();
            ErrorTracker.setUser(UserModule.user);
        })();
    }, [])
    return (
        <>
            <Head>
                <link rel="icon" href={favicon.src}/>
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default App;
