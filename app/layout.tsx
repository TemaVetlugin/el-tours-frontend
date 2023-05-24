import React from "react";

import { bootstrapQuery } from "shared/queries/frontend";
import { Cache, Cookie } from "shared/utilities/server";

import { Bootstrap } from "./bootstrap";

import 'shared/styles/index.scss';

type PropsType = {
    children: React.ReactNode
}

export default async function Layout({ children }: PropsType) {
    const { isSuccess, data } = await Cache.remember(
        'bootstrap',
        async () => await bootstrapQuery(),
        3600
    );

    const cityId = Cookie.get('cityId');

    return (
        <React.StrictMode>
            <html lang='ru'>
                <body>
                    <Bootstrap cities={data?.cities || []}/>
                    {children}
                </body>
            </html>
        </React.StrictMode>
    )
}

export const runtime = 'nodejs';
