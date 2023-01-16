import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useEffect } from "react";

import { Layout, LayoutSubtitle, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import { UiBoundary, UiBreadcrumbs, UiGrid, UiPagination, UiSeo, UiWrap } from "shared/uikit";
import { useRouter } from "next/router";
import { MENU, ROUTES } from "shared/contants";
import { catalogProductsFiltersRequest, catalogProductsSearchRequest } from "shared/requests/api";
import { useRouterQuery, useObservable } from "shared/hooks";
import { CatalogFilterModel, CatalogProductModel, PaginationModel } from "shared/models";
import { CCatalogFilters, CCatalogHeader, CCatalogProductsGrid } from "shared/components";
import { BootstrapModule } from "shared/modules";

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const SearchPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const router = useRouter();
    const query = useRouterQuery({
        query: '',
        sort: 'search'
    });

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
    })

    const fetchFilters = useCallback(async () => {
        store.set("isLoading", true);
        const { isSuccess, data } = await catalogProductsFiltersRequest({ ...query });
        if (isSuccess && data) {
            catalogFilters.update({
                aside: data.aside.map(item => new CatalogFilterModel(item)),
                header: data.header.map(item => new CatalogFilterModel(item))
            });
        }
        catalogFilters.set("isLoading", false);
    }, [catalogFilters, query, store]);

    const fetchCatalogProducts = useCallback(async () => {
        store.set("isLoading", true);
        const { isSuccess, data } = await catalogProductsSearchRequest({ ...query });
        if (isSuccess && data) {
            store.set("catalogProducts", data.items.map(item => new CatalogProductModel(item)));
            store.set("pagination", new PaginationModel(data.pagination));
        }
        store.update({
            isLoading: false,
            isError: !isSuccess || !data
        })
    }, [store, query]);

    useEffect(() => {
        fetchFilters();
    }, [fetchFilters]);

    useEffect(() => {
        if (!query) {
            router.push(ROUTES.HOME());
            return;
        }
        fetchCatalogProducts();
    }, [query, fetchCatalogProducts, router])

    return (
        <Layout>
            <UiSeo title={`Результаты поиска: ${query.query}`}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.SEARCH()]}/>
                <LayoutTitle
                    value={`Результаты поиска: ${query.query}`}
                    badge={store.isLoading ? null : store.pagination.total}
                />
                <LayoutSubtitle>
                    {store.isLoading ? (
                        <>Идёт поиск...</>
                    ) : (
                        <>Найдено <b>{store.pagination.total}</b> товаров по запросу «{query.query}»</>
                    )}
                </LayoutSubtitle>

                <UiGrid gap={30} columns={'330px 1fr'}>
                    <div>
                        <CCatalogFilters
                            isLoading={catalogFilters.isLoading}
                            catalogFilters={catalogFilters.aside}
                        />
                    </div>
                    <div>
                        <CCatalogHeader catalogFilters={catalogFilters.header}/>
                        <UiBoundary isError={store.isError} onAction={fetchCatalogProducts}>
                            <CCatalogProductsGrid isLoading={store.isLoading} catalogProducts={store.catalogProducts}/>
                        </UiBoundary>
                        <UiPagination pagination={store.pagination}/>
                    </div>
                </UiGrid>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    return {
        props: {
            application: await getApplicationData(),
        },
    }
}

export default SearchPage;
