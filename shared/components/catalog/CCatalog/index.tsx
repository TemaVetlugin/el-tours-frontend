'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useObservable, useSearchParams } from "shared/hooks";
import { CatalogFilterModel, CatalogProductModel, PaginationModel } from "shared/models";
import { catalogProductsFiltersQuery, catalogProductsQuery } from "shared/queries/main";

import { CCatalogFilter } from "../CCatalogFilter";

import './index.scss';
import { CCatalogProducts } from "shared/components/catalog/CCatalogProducts";
import { UiPage } from "shared/ui";
import { CCatalogActiveFilters } from "shared/components/catalog/CCatalogActiveFilters";

type PropsType = {
    title?: string,
    params?: {
        query?: string,
        catalogCategoryId?: number,
        id?: number[]
    }
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
    const searchParams = useSearchParams({});

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
                    <UiPage.Title style={{marginBottom: 0}} value={title}/>
                </div>
                {!store.isCatalogProductsLoading && (
                    <div className="c-catalog__count">
                        {store.pagination.total} товаров
                    </div>
                )}
            </div>
            <div className="c-catalog__body">
                <div className="c-catalog__filters">
                    <CCatalogFilter
                        isLoading={store.isCatalogFiltersLoading}
                        catalogFilters={store.catalogFilters}
                    />
                </div>
                <div className="c-catalog__items">
                    <CCatalogActiveFilters catalogFilters={store.catalogFilters}/>
                    <CCatalogProducts
                        isLoading={store.isCatalogProductsLoading}
                        catalogProducts={store.catalogProducts}
                    />
                </div>
            </div>
        </div>
    )
});
