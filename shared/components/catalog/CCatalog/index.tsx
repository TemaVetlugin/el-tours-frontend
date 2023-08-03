'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { useAsyncEffect, useCity, useObservable, useSearchParams } from "shared/hooks";
import { CatalogFilterModel, CatalogProductModel, PaginationModel } from "shared/models";
import { catalogProductsFiltersQuery, catalogProductsQuery } from "shared/queries/main";
import { UiPage } from "shared/ui";

import { CCatalogFilter } from "../CCatalogFilter";
import { CCatalogHeader } from "../CCatalogHeader";
import { CCatalogProducts } from "../CCatalogProducts";
import { CCatalogSort } from "../CCatalogSort";

import './index.scss';

type PropsType = {
    title?: string,
    params?: Parameters<typeof catalogProductsQuery>[0] | Parameters<typeof catalogProductsFiltersQuery>[0];
}

export const CCatalog = observer((
    {
        title,
        params
    }: PropsType
) => {
    const store = useObservable({
        isCatalogFiltersLoading: true,
        isCatalogProductsLoading: true,
        catalogFilters: [] as CatalogFilterModel[],
        catalogProducts: [] as CatalogProductModel[],
        pagination: new PaginationModel()
    });
    const city = useCity();
    const searchParams = useSearchParams();

    useAsyncEffect(async () => {
        const { data, isSuccess } = await catalogProductsFiltersQuery({
            ...(params || {}),
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("catalogFilters", data.items.map(item => new CatalogFilterModel(item)))
        }
        store.set('isCatalogFiltersLoading', false);
    }, [store, params, city]);

    useAsyncEffect(async () => {
        store.set('isCatalogProductsLoading', true);
        const { data, isSuccess } = await catalogProductsQuery({
            ...params,
            ...searchParams,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("catalogProducts", data.items.map(item => new CatalogProductModel(item)))
            store.set("pagination", new PaginationModel(data.pagination));
        }
        store.set('isCatalogProductsLoading', false);
    }, [store, searchParams, params, city.id]);

    return (
        <div className={'c-catalog'}>
            <div className="c-catalog__header">
                <div className="c-catalog__title">
                    <UiPage.Header style={{ marginBottom: 0 }} title={title}/>
                </div>
                {!store.isCatalogProductsLoading && (
                    <div className="c-catalog__count">
                        {store.pagination.total} товаров
                    </div>
                )}
                <div className="c-catalog__sort">
                    <CCatalogSort/>
                </div>
            </div>
            <div className="c-catalog__body">
                <div className="c-catalog__filters">
                    <CCatalogFilter
                        isLoading={store.isCatalogFiltersLoading}
                        catalogFilters={store.catalogFilters}
                    />
                </div>
                <div className="c-catalog__items">
                    <CCatalogHeader catalogFilters={store.catalogFilters}/>
                    <CCatalogProducts
                        isLoading={store.isCatalogProductsLoading}
                        catalogProducts={store.catalogProducts}
                    />
                    <UiPage.Pagination pagination={store.pagination}/>
                </div>
            </div>
        </div>
    )
});
