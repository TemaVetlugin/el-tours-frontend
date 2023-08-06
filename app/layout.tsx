import React from "react";
import { configure } from "mobx";
import { Metadata } from "next";

import { bootQuery } from "shared/queries/frontend";
import { Cache } from "shared/utilities/server";
import { LayoutCatalogAlphabet, LayoutFooter, LayoutHeader } from "shared/layout";
import { getCity } from "shared/server";

import { Boot } from "./boot";
import { StylesRegistry } from "./styles-registry";

import 'shared/styles/index.scss';

configure({ enforceActions: "always" })

type PropsType = {
    children: React.ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'title',
    };
}

export default async function Layout({ children }: PropsType) {
    const city = await getCity();
    const { data, description } = await Cache.remember(
        `bootQuery:${city.id}`,
        async () => await bootQuery({
            cityId: city.id
        }),
    );
    return (
        <html lang='ru'>
            <StylesRegistry>
                <head>
                    <link rel="shortcut icon" type="image/png" href="/assets/favicon.ico"/>
                </head>
                <body>
                    <Boot
                        cityId={city.id}
                        contentResources={data?.contentResources || []}
                        cities={data?.cities || []}
                        regions={data?.regions || []}
                        headerMenuItems={data?.headerMenuItems || []}
                        footerMenuItems={data?.footerMenuItems || []}
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
