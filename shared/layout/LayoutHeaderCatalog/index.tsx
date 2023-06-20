'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import Link from "next/link";

import { UiButton, UiIcon, UiLink, UiScroll, UiWrap } from "shared/ui";
import { CatalogService } from "shared/services";
import { useObservable } from "shared/hooks";
import { ROUTES } from "shared/contants";

import './index.scss';
import { is } from "immutable";

export const LayoutHeaderCatalog = observer(() => {
    const store = useObservable({
        isOpened: false,
        id: CatalogService.catalogCategoriesByCatalogCategoryId['null']
            ? CatalogService.catalogCategoriesByCatalogCategoryId['null'][0].id ?? 0
            : 0
    });

    return (
        <>
            <UiButton
                onClick={() => store.set("isOpened", !store.isOpened)}
            >
                <UiIcon
                    size={24}
                    name={store.isOpened ? "close" : "catalogMenu"}
                />
                <span>Каталог</span>
            </UiButton>
            {store.isOpened && (
                <div className="layout-header-catalog">
                    <UiWrap className={'layout-header-catalog__inner'}>
                        <div className="layout-header-catalog-aside">
                            {CatalogService.catalogCategoriesByCatalogCategoryId['null']?.map(catalogCategory => (
                                <UiLink
                                    key={catalogCategory.id}
                                    className={classnames("layout-header-catalog-category", {
                                        'layout-header-catalog-category--selected': store.id === catalogCategory.id
                                    })}
                                    onMouseEnter={() => {
                                        store.set("id", catalogCategory.id);
                                    }}
                                    href={ROUTES.CATALOG(catalogCategory.slug).url}
                                    onClick={() => {
                                        store.set("isOpened", false);
                                    }}
                                >
                                    <div
                                        className="layout-header-catalog-category__icon"
                                        style={{ backgroundImage: `url(${catalogCategory.icon})` }}
                                    />
                                    <div className="layout-header-catalog-category__name">
                                        {catalogCategory.name}
                                    </div>
                                </UiLink>
                            ))}
                        </div>
                        <div className="layout-header-catalog-main">
                            <UiScroll>
                                <div className="layout-header-catalog-main__items">
                                    {CatalogService.catalogCategoriesByCatalogCategoryId[store.id]?.map(catalogCategory2 => (
                                        <div
                                            key={catalogCategory2.id}
                                            className={'layout-header-catalog-category-2'}
                                        >
                                            <UiLink

                                                className='layout-header-catalog-category-2__name'
                                                href={ROUTES.CATALOG(catalogCategory2.slug).url}
                                                onClick={() => {
                                                    store.set("isOpened", false);
                                                }}
                                            >
                                                {catalogCategory2.name}
                                            </UiLink>
                                            {CatalogService.catalogCategoriesByCatalogCategoryId[catalogCategory2.id]?.length && (
                                                <div className="layout-header-catalog-category-2__items">
                                                    {CatalogService.catalogCategoriesByCatalogCategoryId[catalogCategory2.id].map(catalogCategory3 => (
                                                        <Link
                                                            key={catalogCategory3.id}
                                                            href={ROUTES.CATALOG(catalogCategory3.slug).url}
                                                            className={'layout-header-catalog-category-3'}
                                                            onClick={() => {
                                                                store.set("isOpened", false);
                                                            }}
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
                </div>
            )}
        </>
    );
});
