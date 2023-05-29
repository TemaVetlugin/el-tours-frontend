import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useEffect } from "react";

import { Layout, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import { UiBoundary, UiBreadcrumbs, UiEmpty, UiIcon, UiSeo, UiWrap } from "shared/uikit";
import { withRequireAuthorize } from "shared/hoc";
import { useReaction, useObservable } from "shared/hooks";
import { COLORS, BREADCRUMBS } from "shared/contants";
import { CatalogProductModel } from "shared/models";
import { catalogProductsRequest } from "shared/requests/api";
import { BootstrapModule, CatalogModule } from "shared/modules";
import { CCatalogProductsGrid, CCatalogProductsViewed } from "shared/components";

import './index.scss';

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const FavoritePage: NextPage<PropsType> = withRequireAuthorize(observer(({ application }) => {
    BootstrapModule.application(application);

    const store = useObservable({
        isLoading: false,
        isSuccess: true,
        catalogProducts: [] as CatalogProductModel[],
    });

    const load = useCallback(async (preventIsLoading = false) => {
        if (CatalogModule.favorite.length === 0) {
            store.set("isLoading", false);
            return;
        }
        if (store.isLoading) {
            return;
        }

        store.set("isLoading", !preventIsLoading);

        const { isSuccess, data } = await catalogProductsRequest({
            id: CatalogModule.favorite
        });

        if (isSuccess && data) {
            store.set('catalogProducts', data.items.map(item => new CatalogProductModel(item)));
        }

        store.set("isSuccess", isSuccess && !!data);
        store.set("isLoading", false);
    }, [store]);

    useEffect(() => {
        load()
    }, [load]);
    useReaction(() => load(true), () => CatalogModule.favorite);

    return (
        <Layout>
            <UiSeo title={'Избранное'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.FAVORITE()]}/>
                <LayoutTitle value='Избранное'/>
                <UiBoundary isError={!store.isSuccess} isLoading={store.isLoading}>
                    {store.catalogProducts.length === 0 && (
                        <div className="p-favorite__empty">
                            <UiEmpty
                                title={'В Избранном пока ничего нет'}
                                description={(
                                    <>
                                        Добавляйте товары в Избранное<br/> с помощью <UiIcon size={12} name={'heart'}
                                                                                             color={[COLORS.SECONDARY, COLORS.SECONDARY]}/>
                                    </>
                                )}
                                link={null}
                                withSearch={false}
                            />
                        </div>
                    )}
                    {store.catalogProducts.length > 0 && (
                        <div className="p-favorite__items">
                            <CCatalogProductsGrid columns={4} catalogProducts={store.catalogProducts}/>
                        </div>
                    )}
                </UiBoundary>
                <CCatalogProductsViewed/>
            </UiWrap>
        </Layout>
    )
}));

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    return {
        props: {
            application: await getApplicationData(),
        },
    }
}

export default FavoritePage;
