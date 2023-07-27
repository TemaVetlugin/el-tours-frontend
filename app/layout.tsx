import React from "react";
import { configure } from "mobx";

import { bootQuery } from "shared/queries/frontend";
import { Cache, Cookie } from "shared/utilities/server";
import { LayoutCatalogAlphabet, LayoutFooter, LayoutHeader } from "shared/layout";

import { Boot } from "./boot";
import { StylesRegistry } from "./styles-registry";

import 'shared/styles/index.scss';
import { Metadata } from "next";
import { headers } from "next/headers";

configure({ enforceActions: "always" })

type PropsType = {
    children: React.ReactNode
}

export async function generateMetadata(params: any, params2: any): Promise<Metadata> {
    return {
        title: 'title',
    };
}

export default async function Layout({ children }: PropsType) {
    const { data, description } = await Cache.remember(
        `bootQuery`,
        async () => await bootQuery(),
    );

    return (
        <html lang='ru'>
            <StylesRegistry>
                <head>
                    <link rel="shortcut icon" type="image/png" href="/assets/favicon.ico"/>
                </head>
                <body>
                    <Boot
                        cityId={Cookie.get('cityId')}
                        contentResources={data?.contentResources || []}
                        cities={data?.cities || []}
                        regions={data?.regions || []}
                        headerMenuItems={data?.headerMenuItems || []}
                        searchPrompts={data?.searchPrompts || []}
                        compilations={data?.compilations || []}
                        catalogCategories={data?.catalogCategories || []}
                    />
                    <LayoutHeader/>
                    {children}
                    <LayoutCatalogAlphabet/>
                    <LayoutFooter/>
                </body>
            </StylesRegistry>
        </html>
    )
}
export const dynamic = 'force-dynamic'
