'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useCity, useRouter, useSearchParams, useStore} from "shared/hooks";
import {UiPage, UiTypography} from "shared/ui";

import './page.scss';
import {LayoutHeader} from "shared/layout";
import {PCompanyFormAside} from "./components/PCompanyFormAside";
import {PVacancyForm} from "./components/PVacancyForm";
import {PCompanyDescription} from "./components/PCompanyDescription";
import {ROUTES} from "shared/contants";
import {PCompanyServices} from "./components/PCompanyServices";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";
import {pageQuery} from "shared/queries/main";
import {NewsModel, PageModel} from "shared/models";
import {html} from "shared/utilities";

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
                items={[ROUTES.VACANCY()]}
                title={store.item.title}
                subtitle={store.item.subtitle}
            />

            <UiPage.Wrap className="p-company--flex">
                <div className="p-company-body">
                        <UiTypography>
                            {html(store.item.description)}
                        </UiTypography>

                    <PCompanyDescription/>
                </div>
                <div className="p-company-aside">
                    <PCompanyFormAside/>
                    <PCompanyServices/>
                </div>
            </UiPage.Wrap>
            <PVacancyForm/>

        </UiPage>
    )
});
