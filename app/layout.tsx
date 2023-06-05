import React from "react";
import { configure } from "mobx";

import { bootQuery } from "shared/queries/frontend";
import { Cache, Cookie } from "shared/utilities/server";
import { LayoutHeader } from "shared/layout";

import { Boot } from "./boot";
import { StylesRegistry } from "./styles-registry";

import 'shared/styles/index.scss';

configure({ enforceActions: "always" })

type PropsType = {
    children: React.ReactNode
}

export default async function Layout({ children }: PropsType) {
    const { data } = await Cache.remember(
        'boot',
        async () => await bootQuery(),
        1
    );
    return (
        <html lang='ru'>
            <StylesRegistry>
                <body>
                    <Boot
                        cityId={Cookie.get('cityId')}
                        cities={data?.cities || []}
                        regions={data?.regions || []}
                        headerMenu={data?.headerMenu || []}
                        searchPrompts={data?.searchPrompts || []}
                        compilations={data?.compilations || []}
                        catalogCategories={data?.catalogCategories || []}
                    />
                    <LayoutHeader/>
                    {children}
                </body>
            </StylesRegistry>
        </html>
    )
}

export const runtime = 'nodejs';
