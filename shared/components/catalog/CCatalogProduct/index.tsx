'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductModel } from "shared/models";

import './index.scss';
import { UiButton, UiIcon, UiLink, UiPrice } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService } from "shared/services/Cart.service";

type PropsType = {
    catalogProduct: CatalogProductModel,
}

export const CCatalogProduct = observer(({ catalogProduct }: PropsType) => {
    return (
        <UiLink href={ROUTES.PRODUCT(catalogProduct.slug).url} className="c-catalog-product">
            <div
                className="c-catalog-product__image"
                style={{ backgroundImage: `url(${catalogProduct.imageThumbnail})` }}
            />
            <div className="c-catalog-product__badges">
                {catalogProduct.withDelivery && (
                    <div className="c-catalog-product-badge" style={{ backgroundColor: '#00A3B3' }}>
                        <div className="c-catalog-product-badge__name">
                            Доставим на дом
                        </div>
                        <UiIcon size={24} name={'delivery'} color={COLORS.WHITE}/>
                    </div>
                )}
                {catalogProduct.withDelivery && (
                    <div className="c-catalog-product-badge" style={{ backgroundColor: '#E21F25' }}>
                        <div className="c-catalog-product-badge__name">
                            Требуется рецепт
                        </div>
                        <UiIcon size={24} name={'exclamationMark'} color={COLORS.WHITE}/>
                    </div>
                )}
            </div>
            <div className="c-catalog-product__name">
                {catalogProduct.name}
            </div>
            <div className="c-catalog-product__price">
                <UiPrice prices={catalogProduct.prices}/>
            </div>
            <div className="c-catalog-product__footer">
                <UiButton onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    CartService.save({
                        catalogProductId: catalogProduct.id,
                        quantity: 1
                    });
                }}>
                    <span>В корзину</span>
                    <UiIcon size={24} name={"cart"}/>
                </UiButton>
                <div className="c-catalog-product__favorite">
                    <UiIcon size={24} name={"heart"}/>
                </div>
            </div>
        </UiLink>
    )
})
