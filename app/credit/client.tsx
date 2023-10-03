'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useSearchParams, useStore } from "shared/hooks";
import { UiPage, UiTypography } from "shared/ui";
import { LayoutHeader } from "shared/layout";
import { ROUTES } from "shared/contants";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import { PageModel } from "shared/models";
import { PCreditServices } from "./components/PCreditServices";
import { PCreditCalculator } from "./components/PCreditCalculator";
import { pageQuery } from "shared/queries/main";
import { html } from "shared/utilities";


export const Client = observer(() => {
    const store = useStore({
        item: new PageModel(),
        page: new PageModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1,})

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await pageQuery({
            url: ROUTES.CREDIT().url,
        });
        if (isSuccess && data) {
            store.set("page", new PageModel(data.item));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page]);

    return (
        <UiPage className="p-credit">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.SERVICES()}
                title={store.page.title}
                subtitle={store.page.subtitle}
            />

            <UiPage.Wrap className="p-credit--flex" template={'aside'}>
                <UiPage.Main>
                    <UiTypography>
                        {html(store.page.description)}
                    </UiTypography>
                    <PCreditCalculator/>
                </UiPage.Main>
                <UiPage.Aside>
                    <div className="p-credit-aside">
                        <PCreditServices/>
                    </div>
                </UiPage.Aside>
            </UiPage.Wrap>

        </UiPage>
    )
});
