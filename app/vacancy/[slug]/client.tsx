'use client';

import React from "react";
import {UiPage, UiTypography} from "shared/ui";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useRouter, useStore} from "shared/hooks";
import {VacancyModel} from "shared/models";
import {vacancyGetQuery} from "shared/queries/main";
import {PVacancyFormAside} from "../components/PVacancyFormAside";
import {PVacancyForm} from "../components/PVacancyForm";
import {LayoutHeader} from "shared/layout";
import {LayoutHeaderSearch} from "../components/PVacancyHeaderSearch";
import {html} from "shared/utilities";
import {ROUTES} from "shared/contants";


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
        <UiPage className="vacancy-page">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header

                items={[ROUTES.VACANCY(), ROUTES.VACANCY()]}
                title={store.item.name}
                subtitle={store.item.subtitle}
            />
            <div className="vacancy-page">
                <UiPage.Wrap className="vacancy-page--flex">
                    <div className="vacancy-page-body">
                        <UiTypography>
                            {html(store.item.content)}
                        </UiTypography>
                    </div>
                    <PVacancyFormAside/>
                </UiPage.Wrap>
                <PVacancyForm/>
            </div>
        </UiPage>
    );
});
