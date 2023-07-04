import React from "react";
import { configure } from "mobx";

import { bootQuery } from "shared/queries/frontend";
import { Cache, Cookie } from "shared/utilities/server";
import { LayoutFooter, LayoutHeader } from "shared/layout";

import { Boot } from "./boot";
import { StylesRegistry } from "./styles-registry";

import 'shared/styles/index.scss';

configure({ enforceActions: "always" })

type PropsType = {
    children: React.ReactNode
}

export default async function Layout({ children }: PropsType) {
    const { data, description } = await Cache.remember(
        'boot',
        async () => await bootQuery(),
    );
    return (
        <html lang='ru'>
            <StylesRegistry>
                <body>
                    <Boot
                        cityId={Cookie.get('cityId')}
                        contentResources={data?.contentResources || []}
                        cities={data?.cities || []}
                        regions={data?.regions || []}
                        headerMenu={data?.headerMenu || []}
                        searchPrompts={data?.searchPrompts || []}
                        compilations={data?.compilations || []}
                        catalogCategories={data?.catalogCategories || []}
                    />
                    <LayoutHeader/>
                    {children}
                    <LayoutFooter/>
                </body>
            </StylesRegistry>
        </html>
    )
}
