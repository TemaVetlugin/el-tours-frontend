'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useObservable } from "shared/hooks";
import { UiButton, UiCard, UiIcon, UiPage, UiPrice, UiQuantity } from "shared/ui";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models";
import { CartService, CatalogService } from "shared/services";
import { COLORS, ROUTES } from "shared/contants";
import { CCatalogProductsSlider } from "shared/components/catalog";

import './page.scss';
import { CProductStore } from "shared/components/product";

type PropsType = {
    catalogProduct: CatalogProductModelInterface
}

const TABS = [{
    id: 'description',
    name: 'Описание'
}, {
    id: 'storageConditions',
    name: 'Условия хранения'
}, {
    id: 'composition',
    name: 'Состав'
}, {
    id: 'contraindications',
    name: 'Противопоказания'
},]

export const Client = observer(({ catalogProduct }: PropsType) => {
    const store = useObservable({
        tab: 'description',
        catalogProduct: new CatalogProductModel(catalogProduct)
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
                <UiPage.Title value={store.catalogProduct.name}/>
                <div className="p-product__preview">
                    <div className="p-product__media">
                        <div
                            className="p-product__image"
                            style={{ backgroundImage: `url(${store.catalogProduct.imageThumbnail})` }}
                        />
                        <div className="p-product__badges">
                            {store.catalogProduct.withDelivery && (
                                <div className="p-product-badge" style={{ backgroundColor: '#00A3B3' }}>
                                    <div className="p-product-badge__name">
                                        Доставим на дом
                                    </div>
                                    <UiIcon size={24} name={'delivery'} color={COLORS.WHITE}/>
                                </div>
                            )}
                            {store.catalogProduct.withDelivery && (
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
                        <div className="p-product-property">
                            <div className="p-product-property__name">
                                <span>Форма выпуска</span>
                                <div className="p-product-property__row"/>
                            </div>
                            <div className="p-product-property__value">
                                {store.catalogProduct.releaseForm}
                            </div>
                        </div>
                        <div className="p-product-property">
                            <div className="p-product-property__name">
                                <span>Действующее вещество</span>
                                <div className="p-product-property__row"/>
                            </div>
                            <div className="p-product-property__value">
                                {store.catalogProduct.substances?.map(substance => substance.name).join(', ')}
                            </div>
                        </div>
                        <div className="p-product-property">
                            <div className="p-product-property__name">
                                <span>Производитель</span>
                                <div className="p-product-property__row"/>
                            </div>
                            <div className="p-product-property__value">
                                {store.catalogProduct.manufacturer?.name}
                            </div>
                        </div>
                        <div className="p-product-property">
                            <div className="p-product-property__name">
                                <span>Страна производства</span>
                                <div className="p-product-property__row"/>
                            </div>
                            <div className="p-product-property__value">
                                {store.catalogProduct.country?.name}
                            </div>
                        </div>
                        <div className="p-product-property">
                            <div className="p-product-property__name">
                                <span>Бренд</span>
                                <div className="p-product-property__row"/>
                            </div>
                            <div className="p-product-property__value">
                                {store.catalogProduct.brand?.name}
                            </div>
                        </div>
                    </div>
                    <div className="p-product-commerce">
                        <UiCard>
                            {store.catalogProduct.catalogProductOffers.length > 0 && (
                                <>
                                    <div className="p-product-commerce__price">
                                        <UiPrice
                                            prices={store.catalogProduct.prices}
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
                        <CProductStore key={offer.id} catalogProductOffer={offer}/>
                    ))}
                </UiPage.Section>
                <UiPage.Section title={'С этим товаром покупают'}>
                    <CCatalogProductsSlider catalogProducts={store.catalogProduct.recommendations}/>
                </UiPage.Section>
            </UiPage.Wrap>
        </UiPage>
    );
});
