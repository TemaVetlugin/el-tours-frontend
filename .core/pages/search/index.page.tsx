import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import React, { useCallback, useEffect } from "react";

import { Layout, LayoutSubtitle, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import { UiBoundary, UiBreadcrumbs, UiEmpty2, UiGrid, UiPagination, UiSeo, UiTabs, UiWrap } from "shared/uikit";
import { useRouter } from "next/router";
import { BREADCRUMBS, ROUTES } from "shared/contants";
import { catalogProductsFiltersRequest, catalogProductsSearchRequest } from "shared/requests/api";
import { useRouterQuery, useObservable } from "shared/hooks";
import { CatalogFilterModel, CatalogProductModel, PaginationModel } from "shared/models";
import { CCatalogFilters, CCatalogHeader, CCatalogProductsGrid } from "shared/components";
import { BootstrapModule } from "shared/modules";

import "./index.scss";

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
        pagination: new PaginationModel(),
        tab: 'products'
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
                <UiBreadcrumbs items={[BREADCRUMBS.SEARCH()]}/>
                <div className="p-search">
                    <div className="p-search__head">
                        <h1 className="p-search__title">Результаты поиска</h1>
                        <div className="p-search__tabs">
                            <div className="p-search__tabs-inner">
                                <UiTabs
                                    items={[
                                        {
                                            id: 'products',
                                            name: '0 товаров',
                                        },
                                        {
                                            id: 'selections',
                                            name: '1 подборка',
                                        },
                                    ]}
                                    value={store.tab}
                                    name={'tab'}
                                    onChange={store.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    {store.tab === 'products' && (
                        <div>
                            {store.pagination.total === 0 && (
                                <UiEmpty2
                                    title={`По запросу «${query.query}» ничего не найдено`}
                                    description="Используйте Каталог или оформите заявку на товар, которого нет в Вашем городе"
                                    isSearch
                                />
                            )}
                            {store.pagination.total < 0 && (
                                <UiGrid gap={50} columns={'280px 1fr'}>
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
                            )}
                        </div>
                    )}
                </div>
            </UiWrap>
        </Layout>
        // <Layout>
        //     <UiSeo title={`Результаты поиска: ${query.query}`}/>
        //     <UiWrap>
        //         <UiBreadcrumbs items={[MENU.SEARCH()]}/>
        //         <LayoutTitle
        //             value={`Результаты поиска: ${query.query}`}
        //             badge={store.isLoading ? null : store.pagination.total}
        //         />
        //         <LayoutSubtitle>
        //             {store.isLoading ? (
        //                 <>Идёт поиск...</>
        //             ) : (
        //                 <>Найдено <b>{store.pagination.total}</b> товаров по запросу «{query.query}»</>
        //             )}
        //         </LayoutSubtitle>
        //
        //         <UiGrid gap={30} columns={'330px 1fr'}>
        //             <div>
        //                 <CCatalogFilters
        //                     isLoading={catalogFilters.isLoading}
        //                     catalogFilters={catalogFilters.aside}
        //                 />
        //             </div>
        //             <div>
        //                 <CCatalogHeader catalogFilters={catalogFilters.header}/>
        //                 <UiBoundary isError={store.isError} onAction={fetchCatalogProducts}>
        //                     <CCatalogProductsGrid isLoading={store.isLoading} catalogProducts={store.catalogProducts}/>
        //                 </UiBoundary>
        //                 <UiPagination pagination={store.pagination}/>
        //             </div>
        //         </UiGrid>
        //     </UiWrap>
        // </Layout>
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
