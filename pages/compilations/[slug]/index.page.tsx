import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import { UiBoundary, UiBreadcrumbs, UiPagination, UiSeo, UiWrap } from "shared/uikit";
import { useObservable } from "shared/hooks";
import { CatalogProductModel, CompilationModel, PaginationModel } from "shared/models";
import { compilationsGetRequest } from "shared/requests/api";
import { MENU } from "shared/contants";
import { CCatalogProductsGrid, CCatalogProductsViewed } from "shared/components";
import { BootstrapModule } from "shared/modules";

import './index.scss';

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const CompilationPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const router = useRouter();
    const { slug } = router.query as { slug: string };
    const store = useObservable({
        isLoading: true,
        compilation: new CompilationModel(),
        pagination: new PaginationModel(),
        catalogProducts: [] as CatalogProductModel[]
    });
    const load = useCallback(async () => {
        if (!slug) {
            return;
        }
        store.set("isLoading", true);
        const { isSuccess, data } = await compilationsGetRequest({ slug });
        if (isSuccess && data) {
            store.set("compilation", new CompilationModel(data.item));
            store.set("pagination", new PaginationModel(data.pagination));
            store.set("catalogProducts", data.items.map(item => new CatalogProductModel(item)));
        }
        store.set("isLoading", false);
    }, [store, slug]);

    useEffect(() => {
        load();
    }, [load]);

    const breadcrumbs = [MENU.COMPILATIONS()];
    if (store.compilation.name) {
        breadcrumbs.push(MENU.COMPILATION(store.compilation.name));
    }
    return (
        <Layout>
            <UiSeo title={store.compilation.name}/>
            <UiWrap>
                <UiBreadcrumbs items={breadcrumbs}/>
                <LayoutTitle value={store.compilation.name} badge={store.compilation.catalogProductsCount}/>
                <UiBoundary isLoading={store.isLoading}>
                    <div className="p-compilation__items">
                        <CCatalogProductsGrid columns={4} catalogProducts={store.catalogProducts}/>
                    </div>
                    <UiPagination className="p-compilation__pagination" pagination={store.pagination}/>
                    <CCatalogProductsViewed/>
                </UiBoundary>
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

export default CompilationPage;
