import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from "next/router";

import { Layout, LayoutTitle } from "shared/layout";
import { UiBoundary, UiBreadcrumbs, UiCard, UiGrid, UiLink, UiSeo, UiWrap } from "shared/uikit";
import { CATALOG_LETTERS, MEDIA_POINTS, MENU, ROUTES } from "shared/contants";
import { ApplicationDataType } from "shared/types";
import { getApplicationData } from "shared/server";
import { BootstrapModule } from "shared/modules";
import classnames from "classnames";
import { useObservable } from "shared/hooks";
import { CatalogProductModel } from "shared/models";
import { catalogProductsByNameRequest } from "shared/requests/api";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const CatalogByNamePage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const router = useRouter();
    const query = router?.query?.query || CATALOG_LETTERS[0].id;
    const store = useObservable({
        isLoading: true,
        isSuccess: true,
        catalogProducts: [] as CatalogProductModel[]
    });
    useEffect(() => {
        (async () => {
            store.set("isLoading", true);
            const item = CATALOG_LETTERS.find(item => item.id === query);
            if (!item) {
                return;
            }

            const { isSuccess, data } = await catalogProductsByNameRequest({
                query: item.value
            });

            if (isSuccess && data) {
                store.set("catalogProducts", data.items.map(item => new CatalogProductModel(item)));
            }

            store.set("isSuccess", isSuccess);
            store.set("isLoading", false);
        })();
    }, [query, store]);

    return (
        <Layout>
            <UiSeo title='Список товаров по алфавиту'/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.CATALOG_BY_NAME()]}/>
                <LayoutTitle value='Список товаров по алфавиту'/>

                <UiGrid
                    className="p-catalog-by-name"
                    media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 20 },
                        [MEDIA_POINTS.IS_768]: { columns: '214px 1fr', gap: 30 },
                        [MEDIA_POINTS.IS_1024]: { columns: '236px 1fr', gap: 30 },
                        [MEDIA_POINTS.IS_1366]: { columns: '242px 1fr', gap: 40 }
                    }}
                >
                    <UiGrid
                        className="p-catalog-by-name-letters"
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 5, gap: [10, 12] },
                            [MEDIA_POINTS.IS_768]: { columns: 2, gap: [14, 12] },
                            [MEDIA_POINTS.IS_1024]: { columns: 2, gap: [20, 12] },
                            [MEDIA_POINTS.IS_1366]: { columns: 2, gap: [20, 12] }
                        }}
                    >
                        {CATALOG_LETTERS.map(item => {
                            const classNames = classnames('p-catalog-by-name-letters__item', {
                                'p-catalog-by-name-letters__item--active': query === item.id
                            });
                            return (
                                <div
                                    key={item.id}
                                    className={classNames}
                                    onClick={() => {
                                        router.push({
                                            pathname: ROUTES.CATALOG_BY_NAME(),
                                            query: {
                                                query: item.id
                                            }
                                        })
                                    }}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </UiGrid>
                    <UiCard>
                        <UiBoundary isError={!store.isSuccess} isLoading={store.isLoading}>
                            <div className="p-catalog-by-name__items">
                                {store.catalogProducts.map((catalogProduct) => (
                                    <UiLink
                                        key={catalogProduct.id}
                                        className="p-catalog-by-name__item"
                                        href={ROUTES.PRODUCT(catalogProduct.slug)}
                                    >
                                        {catalogProduct.name}
                                    </UiLink>
                                ))}
                            </div>

                        </UiBoundary>
                    </UiCard>
                </UiGrid>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    return {
        props: {
            application: await getApplicationData(),
        }
    }
}

export default CatalogByNamePage;
