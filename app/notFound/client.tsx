'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useRouter, useSearchParams, useStore } from "shared/hooks";
import { UiPage } from "shared/ui";
import { LayoutHeader } from "shared/layout";
import { ROUTES } from "shared/contants";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import { pageQuery } from "shared/queries/main";
import { PageModel } from "shared/models";


export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        item: new PageModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1, tagId: null as null | number})

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await pageQuery({
            url: ROUTES.COMPANY().url,
        });
        if (isSuccess && data) {
            store.set("item", new PageModel(data.item));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);


    return (
        <UiPage className="p-company">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                title={'Не найдено'}
            />
        </UiPage>
    )
});
