'use client';

import React from "react";
import {observer} from "mobx-react-lite";

import {UiPage, UiTypography} from "shared/ui";
import {useAsyncEffect, useRouter, useStore} from "shared/hooks";
import {VacancyModel} from "shared/models";
import {vacancyGetQuery} from "shared/queries/main";
import {PVacancyFormAside} from "../components/PVacancyFormAside";
import {PVacancyForm} from "../components/PVacancyForm";
import {LayoutHeader} from "shared/layout";
import {html} from "shared/utilities";
import {ROUTES} from "shared/contants";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";


type PropsType = {
    slug: string
}
export const Client = observer(({slug}: PropsType
) => {
    const router = useRouter()
    const store = useStore({
        item: new VacancyModel(),
        isLoading: true
    });

    useAsyncEffect(async () => {
        const {isSuccess, data} = await vacancyGetQuery({
            slug,
        });
        if (isSuccess && data) {
            store.set("item", new VacancyModel(data.item));
        } else {
            // router.push(ROUTES.NOT_FOUND());
            return;
        }
        store.set("isLoading", false);
    }, [slug, router]);

    return (

        <UiPage className={"p-vacancy"}>
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.VACANCY()}
                title={
                    <h1 className="p-vacancy__title">{store.item.name} <span className="p-vacancy__title--green">{store.item.salary}</span></h1>
                }
                subtitle={store.item.subtitle}
            />
            <UiPage.Wrap className="p-vacancy--flex">
                <UiPage.Main>
                    <UiTypography>
                        {html(store.item.content)}
                    </UiTypography>
                </UiPage.Main>
                <UiPage.Aside>
                    <PVacancyFormAside/>
                </UiPage.Aside>
            </UiPage.Wrap>
            <PVacancyForm/>
        </UiPage>
    );
});
