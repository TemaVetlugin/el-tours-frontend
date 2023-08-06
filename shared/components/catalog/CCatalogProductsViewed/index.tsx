'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { useAsyncEffect, useObservable } from "shared/hooks";

import { CatalogProductModel } from "shared/models";
import { CatalogService } from "shared/services";
import { UiPage } from "shared/ui";

import './index.scss';

export const CCatalogProductsViewed = observer(() => {
    const store = useObservable({
        isInitialized: false,
        catalogProducts: [] as CatalogProductModel[]
    });

    useAsyncEffect(async () => {
        store.set("isInitialized", true);
        const viewed = await CatalogService.getViews();
        console.log(viewed)
    }, [store])


    if (!store.isInitialized) {
        return null;
    }

    return (
        <UiPage.Section title={'Вы смотрели'}>

        </UiPage.Section>
    )
});
