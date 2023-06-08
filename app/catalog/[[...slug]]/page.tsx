'use client';

import React from "react";
import { notFound } from "next/navigation";

import { useObservable, useObserve } from "shared/hooks";
import { UiLink, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CatalogService } from "shared/services";
import { CatalogCategoryModel } from "shared/models";

import { CCatalog } from "shared/components/catalog";

import './page.scss';

type PropsType = {
    params: {
        slug?: string[]
    }
}

export default function CatalogPage({ params }: PropsType) {
    const store = useObservable({
        counter: 5
    });

    let catalogCategory: CatalogCategoryModel | undefined;
    if (params?.slug && params.slug.length > 0) {
        catalogCategory = CatalogService.catalogCategories.find(catalogCategory => {
            return params.slug ? catalogCategory.slug === params.slug[0] : false
        });

        if (!catalogCategory) {
            notFound();
        }
    }

    const catalogCategories = catalogCategory
        ? (CatalogService.catalogCategoriesByCatalogCategoryId[catalogCategory.id] ?? [])
        : CatalogService.catalogCategoriesByCatalogCategoryId['null'];

    return useObserve(() => (
        <UiPage className={'p-catalog'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={CatalogService.breadcrumbs(catalogCategory?.id || null)}
                />
                {catalogCategories.length > 0 && (
                    <>
                        <UiPage.Title value={catalogCategory?.name}/>
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
    ))
}
