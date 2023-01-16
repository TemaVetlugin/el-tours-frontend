import React from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";
import { UiBreadcrumbs, UiSeo, UiWrap } from "shared/uikit";
import { Layout } from "shared/layout";
import { BootstrapModule, CatalogModule } from "shared/modules";
import { useCatalogBreadcrumbs } from "shared/hooks";

import { CatalogProducts } from "./components/CatalogProducts";
import { CatalogCategories } from "./components/CatalogCategory";

import './index.scss';

type PropsType = {
    application: ApplicationDataType,
    slug: string,
}

const CatalogPage: NextPage<PropsType> = observer(({ application, slug }) => {
    BootstrapModule.application(application);

    const catalogCategory = CatalogModule.catalogCategories.find(catalogCategory => catalogCategory.slug === slug);
    const catalogCategoryId = catalogCategory ? catalogCategory.id : null;
    const catalogCategories = CatalogModule.catalogCategories.filter(catalogCategory => catalogCategory.catalogCategoryId === catalogCategoryId);
    const breadcrumbs = useCatalogBreadcrumbs(catalogCategoryId);

    return (
        <Layout>
            <UiSeo title={catalogCategory?.name || 'Каталог'}/>
            <UiWrap>
                <UiBreadcrumbs items={breadcrumbs}/>
                {catalogCategories.length === 0 ? (
                    <CatalogProducts catalogCategory={catalogCategory}/>
                ) : (
                    <CatalogCategories catalogCategory={catalogCategory} catalogCategories={catalogCategories}/>
                )}
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    const application = await getApplicationData();
    return {
        props: {
            application,
            slug: (
                context.query.slug
                    ? (Array.isArray(context.query.slug) ? context.query.slug : [context.query.slug])
                    : []
            ).join('/')
        },
    }
}

export default CatalogPage;
