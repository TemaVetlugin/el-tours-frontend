import Script from "next/script";
import React from "react";
import { configure } from "mobx";
import { Metadata } from "next";


import { bootQuery } from "shared/queries/frontend";
import { Cache } from "shared/utilities/server";
import { LayoutFooter, LayoutHeader, LayoutCookie, LayoutFooterForm } from "shared/layout";
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
                    <Script id={'talkme'}>
                        {`
                            (function(){(function c(d,w,m,i) {
                                window.supportAPIMethod = m;
                                var s = d.createElement('script');
                                s.id = 'supportScript';
                                var id = '822b8068a863e9e5c22e000b2f5a15b0';
                                s.src = (!i ? 'https://lcab.talk-me.ru/support/support.js' : 'https://static.site-chat.me/support/support.int.js') + '?h=' + id;
                                s.onerror = i ? undefined : function(){c(d,w,m,true)};
                                w[m] = w[m] ? w[m] : function(){(w[m].q = w[m].q ? w[m].q : []).push(arguments);};
                                (d.head ? d.head : d.body).appendChild(s);
                            })(document,window,'TalkMe')})();
                        `}
                    </Script>
                </head>
                <body>
                    <Boot
                        cityId={city.id}
                        contentResources={data?.contentResources || []}
                        cities={data?.cities || []}
                        regions={data?.regions || []}
                        headerMenuItems={data?.headerMenuItems || []}
                        footerMenuItems={data?.footerMenuItems || []}
                        footerBanners={data?.footerBanners || []}
                        searchPrompts={data?.searchPrompts || []}
                        compilations={data?.compilations || []}
                        catalogCategories={data?.catalogCategories || []}
                    />
                    {children}
                    <LayoutFooterForm/>
                    <LayoutFooter/>
                    <LayoutCookie/>
                </body>
            </StylesRegistry>
        </html>
    )
}
export const dynamic = 'force-dynamic'
