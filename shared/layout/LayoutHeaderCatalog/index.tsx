'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import Link from "next/link";

import { UiScroll, UiWrap } from "shared/ui";
import { CatalogService } from "shared/services";
import { useObservable } from "shared/hooks";
import { ROUTES } from "shared/contants";

import './index.scss';

export const LayoutHeaderCatalog = observer(() => {
    const store = useObservable({
        id: CatalogService.catalogCategoriesByCatalogCategoryId['null'][0].id ?? 0,
    });

    return (
        <div className="layout-header-catalog">
            <UiWrap className={'layout-header-catalog__inner'}>
                <div className="layout-header-catalog-aside">
                    {CatalogService.catalogCategoriesByCatalogCategoryId['null']?.map(catalogCategory => (
                        <div
                            key={catalogCategory.id}
                            className={classnames("layout-header-catalog-category", {
                                'layout-header-catalog-category--selected': store.id === catalogCategory.id
                            })}
                            onMouseEnter={() => {
                                store.set("id", catalogCategory.id);
                            }}
                        >
                            <div
                                className="layout-header-catalog-category__icon"
                                style={{ backgroundImage: `url(${catalogCategory.icon})` }}
                            />
                            <div className="layout-header-catalog-category__name">
                                {catalogCategory.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="layout-header-catalog-main">
                    <UiScroll>
                        <div className="layout-header-catalog-main__items">
                            {CatalogService.catalogCategoriesByCatalogCategoryId[store.id]?.map(catalogCategory2 => (
                                <div key={catalogCategory2.id} className={'layout-header-catalog-category-2'}>
                                    <div className='layout-header-catalog-category-2__name'>
                                        {catalogCategory2.name}
                                    </div>
                                    {CatalogService.catalogCategoriesByCatalogCategoryId[catalogCategory2.id]?.length && (
                                        <div className="layout-header-catalog-category-2__items">
                                            {CatalogService.catalogCategoriesByCatalogCategoryId[catalogCategory2.id].map(catalogCategory3 => (
                                                <Link
                                                    key={catalogCategory3.id}
                                                    href={ROUTES.CATALOG(catalogCategory3.slug)}
                                                    className={'layout-header-catalog-category-3'}
                                                >
                                                    {catalogCategory3.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </UiScroll>
                </div>
            </UiWrap>
            <UiScroll>
            </UiScroll>
        </div>
    );
});
