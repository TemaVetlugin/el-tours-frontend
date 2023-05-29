import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { CatalogCategoryModel, CatalogFilterModel, CatalogProductModel, PaginationModel } from "shared/models";
import { catalogProductsFiltersRequest, catalogProductsRequest } from "shared/requests/api";
import { CCatalogFilters, CCatalogHeader, CCatalogProductsGrid } from "shared/components";
import { useObservable } from "shared/hooks";
import { UiBoundary, UiGrid, UiPagination, UiSeo } from "shared/uikit";
import { LayoutTitle } from "shared/layout";
import { MEDIA_POINTS } from "shared/contants";

import './index.scss';

type PropsType = {
    catalogCategory?: CatalogCategoryModel,
}

export const CatalogProducts = observer(({ catalogCategory }: PropsType) => {
    const router = useRouter();

    const catalogFilters = useObservable({
        isLoading: true,
        aside: [] as CatalogFilterModel[],
        header: [] as CatalogFilterModel[]
    });

    const store = useObservable({
        isLoading: true,
        isError: false,
        catalogProducts: [] as CatalogProductModel[],
        pagination: new PaginationModel()
    });

    const fetchFilters = useCallback(async () => {
        if (!catalogCategory) {
            return;
        }
        store.set("isLoading", true);
        const { isSuccess, data } = await catalogProductsFiltersRequest({
            catalogCategoryId: catalogCategory.id
        });
        if (isSuccess && data) {
            catalogFilters.update({
                aside: data.aside.map(item => new CatalogFilterModel(item)),
                header: data.header.map(item => new CatalogFilterModel(item))
            });
        }
        catalogFilters.set("isLoading", false);
    }, [catalogFilters, catalogCategory, store]);

    const fetchCatalogProducts = useCallback(async () => {
        if (!catalogCategory) {
            return;
        }
        store.set("isLoading", true);
        const { isSuccess, data } = await catalogProductsRequest({
            ...router.query,
            catalogCategoryId: catalogCategory.id
        });
        if (isSuccess && data) {
            store.set("catalogProducts", data.items.map(item => new CatalogProductModel(item)));
            store.set("pagination", new PaginationModel(data.pagination));
        }
        store.update({
            isLoading: false,
            isError: !isSuccess || !data
        })
    }, [store, catalogCategory, router]);

    useEffect(() => {
        fetchFilters();
    }, [fetchFilters]);

    useEffect(() => {
        fetchCatalogProducts();
    }, [fetchCatalogProducts])

    return (
        <>
            <LayoutTitle value={catalogCategory?.name || 'Каталог'} badge={store.pagination.total}/>
            <UiGrid media={{
                [MEDIA_POINTS.IS_360]: { gap: 0, columns: 1 },
                [MEDIA_POINTS.IS_1024]: { gap: 30, columns: '310px 1fr' },
                [MEDIA_POINTS.IS_1366]: { gap: 30, columns: '330px 1fr' },
            }}>
                <CCatalogFilters
                    isLoading={catalogFilters.isLoading}
                    catalogFilters={catalogFilters.aside}
                />
                <div>
                    <CCatalogHeader catalogFilters={catalogFilters.header}/>
                    <UiBoundary isError={store.isError} onAction={fetchCatalogProducts}>
                        <CCatalogProductsGrid
                            columns={3}
                            catalogProducts={store.catalogProducts}
                            isLoading={store.isLoading}
                        />
                    </UiBoundary>
                    <UiPagination pagination={store.pagination}/>
                </div>
            </UiGrid>
        </>
    );
});
