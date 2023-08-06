'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { CCatalogProductsSlider } from "shared/components/catalog";
import { useAsyncEffect, useObservable } from "shared/hooks";

import { CatalogProductModel } from "shared/models";
import { catalogProductsQuery } from "shared/queries/main";
import { CatalogService } from "shared/services";
import { UiPage } from "shared/ui";

import './index.scss';

export const CCatalogProductsViewed = observer(() => {
    const store = useObservable({
        isInitialized: false,
        catalogProducts: [] as CatalogProductModel[]
    });

    useAsyncEffect(async () => {
        const viewed = await CatalogService.getViews();
        if (viewed.length === 0) {
            return;
        }
        const { isSuccess, data } = await catalogProductsQuery({
            id: viewed
        });
        if (isSuccess && data) {
            store.set("catalogProducts", data.items.map(item => new CatalogProductModel(item)));
            store.set("isInitialized", true);
        }
    }, [store])

    if (!store.isInitialized) {
        return null;
    }

    return (
        <UiPage.Section title={'Вы смотрели'}>
            <CCatalogProductsSlider catalogProducts={store.catalogProducts}/>
        </UiPage.Section>
    )
});
