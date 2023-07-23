'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { notFound } from "next/navigation";

import { UiLink, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CatalogService } from "shared/services";
import { CatalogCategoryModel } from "shared/models";

import { CCatalog } from "shared/components/catalog";

import './page.scss';

type PropsType = {
    slug?: string[]
}

export const Client = observer(({ slug }: PropsType) => {
    let catalogCategory: CatalogCategoryModel | undefined;
    if (slug && slug.length > 0) {
        catalogCategory = CatalogService.catalogCategories.find(catalogCategory => {
            return slug ? catalogCategory.slug === slug[0] : false
        });

        if (!catalogCategory) {
            notFound();
        }
    }

    const catalogCategories = catalogCategory
        ? (CatalogService.catalogCategoriesByCatalogCategoryId[catalogCategory.id] ?? [])
        : CatalogService.catalogCategoriesByCatalogCategoryId['null'];

    return (
        <UiPage className={'p-catalog'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={CatalogService.breadcrumbs(catalogCategory?.id || null)}
                />
                {catalogCategories.length > 0 && (
                    <>
                        <UiPage.Header title={catalogCategory?.name}/>
                        <div className="p-catalog__categories">
                            {catalogCategories.map(catalogCategory => (
                                <UiLink
                                    key={catalogCategory.id}
                                    href={ROUTES.CATALOG(catalogCategory.slug).url}
                                    className={'p-catalog__category'}
                                >
                                    {catalogCategory.name}
                                </UiLink>
                            ))}
                        </div>
                    </>
                )}
                {(catalogCategories.length === 0 && catalogCategory) && (
                    <CCatalog
                        title={catalogCategory.name}
                        params={{
                            catalogCategoryId: catalogCategory.id
                        }}
                    />
                )}
            </UiWrap>
        </UiPage>
    )
})
