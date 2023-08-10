'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";

import { useAsyncEffect, useCity, useSearchParams, useStore } from "shared/hooks";
import { CatalogFilterModel, CatalogProductModel, PaginationModel } from "shared/models";
import { catalogProductsFiltersQuery, catalogProductsQuery } from "shared/queries/main";
import { UiLoading, UiPage } from "shared/ui";
import { lodash } from "shared/utilities";

import { CCatalogFilter } from "../CCatalogFilter";
import { CCatalogHeader } from "../CCatalogHeader";
import { CCatalogProducts } from "../CCatalogProducts";
import { CCatalogSort } from "../CCatalogSort";

import './index.scss';

type PropsType = {
    title?: string,
    params?: Parameters<typeof catalogProductsQuery>[0] | Parameters<typeof catalogProductsFiltersQuery>[0];
    autoFilter?: boolean
}

export const CCatalog = observer((
    {
        title,
        params,
        autoFilter = true
    }: PropsType
) => {
    const store = useStore({
        isCatalogFiltersLoading: true,
        isCatalogFiltersSyncing: true,
        isCatalogProductsLoading: true,
        catalogFilters: [] as CatalogFilterModel[],
        catalogProducts: [] as CatalogProductModel[],
        pagination: new PaginationModel()
    });
    const city = useCity();
    const searchParams = useSearchParams();
    const syncСatalogFilters = (catalogFilters: CatalogFilterModel[]) => {
        const syncedCatalogFilters: CatalogFilterModel[] = [];
        catalogFilters.forEach(catalogFilter => {
            const existCatalogFilter = store.catalogFilters.find(catalogFilter => catalogFilter);
        });
    }

    useAsyncEffect(async () => {
        store.set('isCatalogFiltersSyncing', true);

        const apply: string[] = [
            ...Object.keys(params || {}),
            ...Object.keys(searchParams || {}),
        ].map(item => lodash.snakeCase(item).replace('_id', ''));

        const { data, isSuccess } = await catalogProductsFiltersQuery({
            ...params,
            ...searchParams,
            apply,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("catalogFilters", data.items.map(item => new CatalogFilterModel(item)))
        }
        store.set('isCatalogFiltersLoading', false);
        store.set('isCatalogFiltersSyncing', false);
    }, [store, searchParams, params, city]);

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
                {title && (
                    <>
                        <div className="c-catalog__title">
                            <UiPage.Header style={{ marginBottom: 0 }} title={title}/>
                        </div>
                        {!store.isCatalogProductsLoading && (
                            <div className="c-catalog__count">
                                {store.pagination.total} товаров
                            </div>
                        )}
                    </>
                )}
                <div className="c-catalog__sort">
                    <CCatalogSort/>
                </div>
            </div>
            <div className="c-catalog__body">
                <div className={classnames('c-catalog-filters', {
                    'c-catalog-filters--syncing': store.isCatalogFiltersSyncing
                })}>
                    <CCatalogFilter
                        isLoading={store.isCatalogFiltersLoading}
                        catalogFilters={store.catalogFilters}
                    />
                    <div className="c-catalog-filters__syncer">
                        <UiLoading size={26}/>
                    </div>
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
