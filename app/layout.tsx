import React from "react";

import { bootstrapQuery } from "shared/queries/frontend";
import { Cache, Cookie } from "shared/utilities/server";
import { LayoutHeader } from "shared/layout";

import { Bootstrap } from "./bootstrap";

import 'shared/styles/index.scss';

type PropsType = {
    children: React.ReactNode
}

export default async function Layout({ children }: PropsType) {
    const { data } = await Cache.remember(
        'bootstrap',
        async () => await bootstrapQuery(),
        1
    );

    return (
        <React.StrictMode>
            <html lang='ru'>
                <body>
                    <Bootstrap
                        cityId={Cookie.get('cityId')}
                        cities={data?.cities || []}
                    />
                    <LayoutHeader
                        headerMenu={data?.headerMenu || []}
                    />
                    {children}
                </body>
            </html>
        </React.StrictMode>
    )
}

export const runtime = 'nodejs';
