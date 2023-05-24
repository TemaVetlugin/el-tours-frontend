import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { CatalogModule } from "shared/modules";
import { useMedia, useObservable, useReaction, useWindowBounds } from "shared/hooks";
import { UiButton, UiIcon, UiLink, UiScroll } from "shared/uikit";
import { CatalogCategoryModel } from "shared/models";
import { COLORS, ROUTES } from "shared/contants";
import { useRouter } from "next/router";

import './index.scss';

type PropsType = {
    isOpened: boolean,
    onClose: () => void
}

export const LayoutHeaderCatalog = observer((
    {
        isOpened,
        onClose = () => {
        }
    }: PropsType
) => {
    const router = useRouter();
    const store = useObservable({
        catalogCategoryId: -1,
        level: 'aside' as 'aside' | 'main',
    });

    const windowBounds = useWindowBounds();
    const { is360, is768 } = useMedia();

    useReaction(() => {
        if (CatalogModule.catalogCategories.length > 0) {
            store.set("catalogCategoryId", CatalogModule.catalogCategories[0].id);
        }
    }, () => CatalogModule.catalogCategories);

    const handleChangeCategory = (catalogCategory: CatalogCategoryModel, isHover = false) => (e: React.SyntheticEvent) => {
        if (CatalogModule.catalogCategoriesByCatalogCategoryId[catalogCategory.id]?.length) {
            e.preventDefault();
            store.set("catalogCategoryId", catalogCategory.id);
            store.set("level", 'main');
        }
        if (!isHover) {
            router.push(ROUTES.CATALOG(catalogCategory.slug));
            onClose();
        }
    }

    if (!isOpened) {
        return null;
    }

    const isMobileOrTablet = (is360 || is768);

    console.log({is360, is768})

    const scrollAsideHeight = isMobileOrTablet
        ? windowBounds.height - 136
        : windowBounds.height - 350;

    const scrollContentHeight = isMobileOrTablet
        ? windowBounds.height - 88
        : windowBounds.height - 276;

    const catalogCategory = CatalogModule.catalogCategories.find(catalogCategory => catalogCategory.id === store.catalogCategoryId) || null;

    return (
        <div className={classnames('layout-header-catalog', `layout-header-catalog--${store.level}`)}>
            <div className="layout-header-catalog__overlay" onClick={() => onClose()}/>
            <div className="layout-header-catalog__inner">
                <div className="layout-header-catalog-aside">
                    <UiScroll maxHeight={scrollAsideHeight}>
                        <div className="layout-header-catalog-aside__items">
                            {CatalogModule.catalogCategoriesByCatalogCategoryId[0]?.map(catalogCategory => {
                                if (!CatalogModule.catalogCategoriesByCatalogCategoryId[catalogCategory.id] && !catalogCategory.catalogProductsCount) {
                                    return null;
                                }

                                const className = classnames('layout-header-catalog-category-1', {
                                    'layout-header-catalog-category-1--active': catalogCategory.id === store.catalogCategoryId
                                });

                                if (isMobileOrTablet) {
                                    return (
                                        <div
                                            key={catalogCategory.id}
                                            className={className}
                                        >
                                            <div
                                                className="layout-header-catalog-category-1__icon"
                                                style={{ backgroundImage: `url(${catalogCategory.icon})` }}
                                            />
                                            <UiLink
                                                href={ROUTES.CATALOG(catalogCategory.slug)}
                                                className="layout-header-catalog-category-1__name"
                                            >
                                                {catalogCategory.name}
                                            </UiLink>
                                            {!!CatalogModule.catalogCategoriesByCatalogCategoryId[catalogCategory.id]?.length && (
                                                <div
                                                    className="layout-header-catalog-category-1__arrow"
                                                    onClick={handleChangeCategory(catalogCategory, true)}
                                                >
                                                    <UiIcon size={14} name={'chevronRight'} color={COLORS.GRAY_ICON}/>
                                                </div>
                                            )}
                                        </div>
                                    )
                                }
                                return (
                                    <UiLink
                                        key={catalogCategory.id}
                                        href={ROUTES.CATALOG(catalogCategory.slug)}
                                        className={className}
                                        onClick={handleChangeCategory(catalogCategory)}
                                        onMouseEnter={handleChangeCategory(catalogCategory, true)}
                                    >
                                        <div
                                            className="layout-header-catalog-category-1__icon"
                                            style={{ backgroundImage: `url(${catalogCategory.icon})` }}
                                        />
                                        <div className="layout-header-catalog-category-1__name">
                                            {catalogCategory.name}
                                        </div>
                                    </UiLink>
                                )
                            })}
                        </div>
                    </UiScroll>
                    <div className="layout-header-catalog-aside__footer">
                        <UiButton
                            href={ROUTES.COMPILATIONS()}
                            isRounded
                            hasBorder={false}
                            size='small'
                            onClick={() => {
                                onClose();
                            }}
                            colors={{
                                button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                                label: COLORS.WHITE
                            }}
                        >
                            <span>Подборки</span>
                        </UiButton>
                        <UiButton
                            href={ROUTES.PROMO_ACTIONS()}
                            isRounded
                            hasBorder={false}
                            size='small'
                            onClick={() => {
                                onClose();
                            }}
                            colors={{
                                button: [COLORS.SECONDARY_GRADIENT, COLORS.SECONDARY],
                                label: COLORS.WHITE
                            }}
                        >
                            <UiIcon size={22} name={'discountStar'} color={[COLORS.WHITE, COLORS.SECONDARY]}/>
                            <span>Акции</span>
                        </UiButton>
                    </div>
                </div>
                <div className="layout-header-catalog-main">
                    {catalogCategory && (
                        <div className="layout-header-catalog-main__header">
                            <div
                                className="layout-header-catalog-main__back"
                                onClick={() => store.set("level", 'aside')}
                            >
                                <UiIcon size={14} name={'chevronLeft'} color={COLORS.GRAY_ICON}/>
                            </div>
                            <div className="layout-header-catalog-main__name">{catalogCategory.name}</div>
                        </div>
                    )}
                    <UiScroll maxHeight={scrollContentHeight}>
                        <div className="layout-header-catalog-main__items">
                            {CatalogModule.catalogCategoriesByCatalogCategoryId[store.catalogCategoryId]?.map(catalogCategory => {
                                return (
                                    <div key={catalogCategory.id} className="layout-header-catalog-category-2">
                                        <UiLink
                                            key={catalogCategory.id}
                                            href={ROUTES.CATALOG(catalogCategory.slug)}
                                            className="layout-header-catalog-category-2__name"
                                            onClick={() => {
                                                onClose()
                                            }}
                                        >
                                            {catalogCategory.name}
                                        </UiLink>
                                        <div className="layout-header-catalog-category-2__inner">
                                            {CatalogModule.catalogCategoriesByCatalogCategoryId[catalogCategory.id]?.map(catalogCategory => {
                                                return (
                                                    <UiLink
                                                        key={catalogCategory.id}
                                                        href={ROUTES.CATALOG(catalogCategory.slug)}
                                                        className="layout-header-catalog-category-3"
                                                        onClick={() => {
                                                            onClose()
                                                        }}
                                                    >
                                                        {catalogCategory.name}
                                                    </UiLink>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </UiScroll>
                </div>
            </div>
        </div>
    )
})
