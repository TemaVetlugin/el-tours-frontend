'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useObservable } from "shared/hooks";
import { UiButton, UiCard, UiIcon, UiLink, UiPage, UiPrice, UiQuantity } from "shared/ui";
import { CatalogProductModel, CatalogProductModelInterface, CatalogProductOfferModel } from "shared/models";
import { CartService, CatalogService } from "shared/services";
import { COLORS, ROUTES } from "shared/contants";
import { CCatalogProductsSlider } from "shared/components/catalog";

import { PProductStore } from "./components/PProductStore";

import { TABS } from "./constants/tabs";
import { PROPERTIES } from "./constants/properties";

import './page.scss';

type PropsType = {
    catalogProduct: CatalogProductModelInterface
}

export const Client = observer(({ catalogProduct }: PropsType) => {
    const store = useObservable({
        tab: 'description',
        catalogProduct: new CatalogProductModel(catalogProduct),
        catalogProductOffers: [] as CatalogProductOfferModel[]
    });

    const tab = TABS.find(tab => tab.id === store.tab);
    const cartItem = CartService.cartItems.find(cartItem => cartItem.catalogProductId === catalogProduct.id);


    return (
        <UiPage className={'p-product'}>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs
                    items={[
                        ...CatalogService.breadcrumbs(catalogProduct.catalogCategoryId),
                        ROUTES.PRODUCT(catalogProduct.slug, catalogProduct.name)
                    ]}
                />
                <UiPage.Header title={store.catalogProduct.name}/>
                <div className="p-product__preview">
                    <div className="p-product__media">
                        <div
                            className="p-product__image"
                            style={{ backgroundImage: `url(${store.catalogProduct.image})` }}
                        />
                        <div className="p-product__badges">
                            {store.catalogProduct.isDeliverable && (
                                <div className="p-product-badge" style={{ backgroundColor: '#00A3B3' }}>
                                    <div className="p-product-badge__name">
                                        Доставим на дом
                                    </div>
                                    <UiIcon size={24} name={'deliveryCourier'} color={COLORS.WHITE}/>
                                </div>
                            )}
                            {store.catalogProduct.isDeliverable && (
                                <div className="p-product-badge" style={{ backgroundColor: '#E21F25' }}>
                                    <div className="p-product-badge__name">
                                        Требуется рецепт
                                    </div>
                                    <UiIcon size={24} name={'exclamationMark'} color={COLORS.WHITE}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-product__properties">
                        {PROPERTIES.map(property => {
                            const href = property.href(store.catalogProduct);
                            const value = property.value(store.catalogProduct);
                            const image = property.image(store.catalogProduct);
                            if (!value) {
                                return null;
                            }
                            return (
                                <div key={property.id} className="p-product-property">
                                    <div className="p-product-property__name">
                                        <span>{property.label}</span>
                                        <div className="p-product-property__row"/>
                                    </div>
                                    <div className="p-product-property__aside">
                                        {href ? (
                                            <UiLink href={href} className="p-product-property__value p-product-property__value--link">
                                                {value}
                                            </UiLink>
                                        ) : (
                                            <div className="p-product-property__value">
                                                {value}
                                            </div>
                                        )}
                                        {image && (
                                            <img className="p-product-property__image" src={image} alt={property.label}/>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="p-product-commerce">
                        <UiCard>
                            {store.catalogProduct.catalogProductOffers.length > 0 && (
                                <>
                                    <div className="p-product-commerce__price">
                                        <UiPrice
                                            price={store.catalogProduct.price}
                                        />
                                    </div>

                                    <div className="p-product-commerce__action">
                                        {!cartItem && (
                                            <>
                                                <UiButton onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    CartService.save({
                                                        catalogProductId: store.catalogProduct.id,
                                                        quantity: 1
                                                    });
                                                }}>
                                                    <span>В корзину</span>
                                                    <UiIcon size={24} name={"cart"}/>
                                                </UiButton>
                                            </>
                                        )}
                                        {cartItem && (
                                            <>
                                                <UiQuantity value={cartItem.quantity} onChange={(data) => {
                                                    if (!cartItem || !data.value) {
                                                        return;
                                                    }
                                                    cartItem.update({
                                                        quantity: data.value
                                                    })
                                                    CartService.save({
                                                        catalogProductId: store.catalogProduct.id,
                                                        quantity: data.value
                                                    })
                                                }}/>
                                                <UiButton
                                                    colors={{
                                                        button: [COLORS.TRANSPARENT, COLORS.LIGHT_BLUE],
                                                        label: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                                        border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                                    }}
                                                    href={ROUTES.CART().url}
                                                    label={'В корзине'}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className="p-product-commerce__hint">
                                        Цена актуальна на момент заказа
                                    </div>
                                </>
                            )}
                            <div className="p-product-commerce__availability">
                                В наличии в <span>{store.catalogProduct.catalogProductOffers.length} аптеках</span>
                            </div>
                        </UiCard>
                    </div>
                </div>
                <div className="p-product__info">
                    <div className="p-product__tabs">
                        {TABS.map(tab => {
                            const isActive = tab.id === store.tab;
                            return (
                                <UiButton
                                    key={tab.id}
                                    size={'small'}
                                    label={tab.name}
                                    onClick={() => store.set("tab", tab.id)}
                                    colors={isActive ? {
                                        button: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                                        border: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                                        label: [COLORS.WHITE, COLORS.WHITE]
                                    } : {
                                        button: [COLORS.TRANSPARENT, COLORS.LIGHT_BLUE],
                                        border: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                                        label: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY]
                                    }}
                                />
                            )
                        })}
                    </div>
                    {tab && (
                        <div className="p-product-description">
                            <div className="p-product-description__name">
                                {tab.name}
                            </div>
                            <div className="p-product-description__value">
                                {store.catalogProduct[tab.id]}
                            </div>
                        </div>
                    )}
                </div>
                <UiPage.Section title={'Аналоги'}>
                    <CCatalogProductsSlider catalogProducts={store.catalogProduct.analogues}/>
                </UiPage.Section>
                <UiPage.Section title={'Доступность в аптеках'}>
                    {store.catalogProduct.catalogProductOffers.map(offer => (
                        <PProductStore key={offer.id} catalogProductOffer={offer}/>
                    ))}
                </UiPage.Section>
                <UiPage.Section title={'С этим товаром покупают'}>
                    <CCatalogProductsSlider catalogProducts={store.catalogProduct.recommendations}/>
                </UiPage.Section>
            </UiPage.Wrap>
        </UiPage>
    )
        ;
});
