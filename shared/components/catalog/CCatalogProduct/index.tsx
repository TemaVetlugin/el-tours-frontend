'use client'

import { observer } from "mobx-react-lite";
import React from "react";

import { COLORS, ROUTES } from "shared/contants";
import { useObservable, useRouter } from "shared/hooks";

import { CatalogProductModel } from "shared/models";
import { CartService } from "shared/services";
import { UiButton, UiIcon, UiLink, UiPrice, UiQuantity } from "shared/ui";
import { date } from "shared/utilities";

import { CCatalogProductFavorite } from "../CCatalogProductFavorite";
import { CCatalogProductRemind } from "../CCatalogProductRemind";
import { CCatalogProductSubscribe } from "../CCatalogProductSubscribe";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel,
    withRemind?: boolean
}

export const CCatalogProduct = observer(({ catalogProduct, withRemind = true }: PropsType) => {
    const router = useRouter();
    const store = useObservable({
        isLoading: false,
        isRemind: false,
        remindAt: date().plus({ days: 7 }).toISO()
    })

    const cartItem = CartService.cartItems.find(cartItem => cartItem.catalogProductId === catalogProduct.id);

    return (
        <div className="c-catalog-product">
            <UiLink
                href={ROUTES.PRODUCT(catalogProduct)}
                className="c-catalog-product__image"
                style={{ backgroundImage: `url(${catalogProduct.image})` }}
            />
            {catalogProduct.badges.length > 0 && (
                <div className="c-catalog-product__badges">
                    {catalogProduct.badges.map(badge => (
                        <div key={badge.icon} className="c-catalog-product-badge" style={{ backgroundColor: badge.color }}>
                            <div className="c-catalog-product-badge__name">{badge.label}</div>
                            <UiIcon size={24} name={badge.icon} color={COLORS.WHITE}/>
                        </div>
                    ))}
                </div>
            )}

            {(catalogProduct.dosage || catalogProduct.packageAmount) && (
                <div className="c-catalog-product__properties">
                    {catalogProduct.dosage && (
                        <div className="c-catalog-product__property c-catalog-product__property--green">
                            {catalogProduct.dosage}
                        </div>
                    )}
                    {catalogProduct.packageAmount && (
                        <div className="c-catalog-product__property c-catalog-product__property--blue">
                            {catalogProduct.packageAmount}
                        </div>
                    )}
                </div>
            )}

            <UiLink href={ROUTES.PRODUCT(catalogProduct)} className="c-catalog-product__name">
                {catalogProduct.name}
            </UiLink>
            {catalogProduct.catalogProductOffers.length === 0 && (
                <>
                    <div className="c-catalog-product__unavailable">
                        Нет в наличии
                    </div>
                    <div className="c-catalog-product__footer">
                        <CCatalogProductSubscribe catalogProduct={catalogProduct}/>
                        <CCatalogProductFavorite catalogProduct={catalogProduct}/>
                    </div>
                </>

            )}
            {catalogProduct.catalogProductOffers.length > 0 && (
                <>
                    <div className="c-catalog-product__price">
                        <UiPrice
                            priceOffer={catalogProduct.priceOffer}
                            price={catalogProduct.price}
                        />
                    </div>
                    <div className="c-catalog-product__footer">
                        {!cartItem && (
                            <>
                                <UiButton onClick={async (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    store.set("isLoading", true);
                                    await CartService.save({
                                        catalogProductId: catalogProduct.id,
                                        quantity: 1
                                    });
                                    store.set("isLoading", false);
                                }}>
                                    <span>В корзину</span>
                                    <UiIcon size={24} name={"cart"}/>
                                </UiButton>
                            </>
                        )}
                        {cartItem && (
                            <>
                                <UiQuantity value={cartItem.quantity} onChange={(data) => {
                                    if (!cartItem || data.value === null) {
                                        return;
                                    }
                                    cartItem.update({
                                        quantity: data.value
                                    })
                                    CartService.save({
                                        catalogProductId: catalogProduct.id,
                                        quantity: data.value
                                    })
                                }}/>
                                <UiButton
                                    colors={{
                                        button: [COLORS.TRANSPARENT, COLORS.LIGHT_BLUE],
                                        label: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                        border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        router.push(ROUTES.CART());
                                    }}
                                    label={'В корзине'}
                                />
                            </>
                        )}
                        <CCatalogProductFavorite catalogProduct={catalogProduct}/>
                    </div>
                </>
            )}
            {withRemind && <CCatalogProductRemind catalogProduct={catalogProduct}/>}
        </div>
    )
})
