import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutSection, LayoutTitle } from "shared/layout";
import {
    UiBoundary,
    UiBreadcrumbs,
    UiButton,
    UiCheckbox,
    UiEmpty,
    UiGrid,
    UiIcon,
    UiSeo,
    UiStickerCard,
    UiStickerCircle,
    UiTooltip,
    UiWrap
} from "shared/uikit";
import { COLORS, MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
import { BootstrapModule, OrderModule } from "shared/modules";
import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";
import { useCatalogProductOffers, useIsInitialized, useObservable } from "shared/hooks";
import { cartRecommendationsRequest } from "shared/requests/frontend";
import { CatalogProductModel } from "shared/models";
import { CCatalogProductsSlider, CCatalogProductsViewed, CCheckoutSummary } from "shared/components";
import { cartItemsClearRequest, cartItemsToggleBulkUpdate } from "shared/requests/api";

import { PCartItem } from "./components/PCartItem";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const CartPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const store = useObservable({
        isLoading: true,
        recommendations: [] as CatalogProductModel[]
    });

    const isInitialized = useIsInitialized();
    useCatalogProductOffers({
        getCatalogProductId: () => OrderModule.cartItems.map(item => item.catalogProductId)
    }, (offers) => {
        OrderModule.cartItems.forEach(cartItem => {
            cartItem.catalogProduct.update({
                catalogProductOffers: offers[cartItem.catalogProductId] ?? []
            });
        });
        store.set("isLoading", false);
    }, [OrderModule.cartItems]);

    useEffect(() => {
        if (!isInitialized) {
            return;
        }
        (async () => {
            const { isSuccess, data } = await cartRecommendationsRequest();
            if (isSuccess && data) {
                store.set("recommendations", data.items.map(item => new CatalogProductModel(item)))
            }
        })();
    }, [isInitialized, store]);

    const handleClear = async () => {
        OrderModule.mount([]);
        await cartItemsClearRequest();
    }

    if (OrderModule.cartItems.length === 0) {
        return (
            <Layout>
                <UiSeo title='Корзина'/>
                <UiWrap>
                    <UiBreadcrumbs items={[BREADCRUMBS.CART()]}/>
                    <LayoutTitle value='Корзина'/>
                    <UiBoundary isLoading={!isInitialized && store.isLoading}>
                        <LayoutSection>
                            <UiEmpty
                                title={'Корзина пуста'}
                                description={`Воспользуйтесь поиском, \nчтобы найти всё что нужно.`}
                                link={null}
                            />
                        </LayoutSection>
                        {store.recommendations.length > 0 && (
                            <LayoutSection title='Рекомендуем'>
                                <CCatalogProductsSlider catalogProducts={store.recommendations}/>
                            </LayoutSection>
                        )}
                        <CCatalogProductsViewed/>
                    </UiBoundary>
                </UiWrap>
            </Layout>
        )
    }

    const withPrescription = OrderModule.cartItems.filter((cartItem) => {
        return cartItem.catalogProduct.prescriptionType.is('with');
    });

    const withoutPrescription = OrderModule.cartItems.filter((cartItem) => {
        return cartItem.catalogProduct.prescriptionType.is('without');
    });

    console.log(OrderModule.cartItems.filter(cartItem => cartItem.isActive).length)

    return (
        <Layout>
            <UiSeo title='Корзина'/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.CART()]}/>
                <LayoutTitle value='Корзина'/>
                <UiBoundary isLoading={!isInitialized && store.isLoading}>
                    <div className="p-cart">
                        <UiGrid media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
                            [MEDIA_POINTS.IS_768]: { columns: 1, gap: 30 },
                            [MEDIA_POINTS.IS_1024]: { columns: '1fr 310px', gap: 30 },
                            [MEDIA_POINTS.IS_1440]: { columns: '1fr 310px', gap: 30 }
                        }}>
                            <div>
                                {withPrescription.length > 0 && (
                                    <div className="p-cart-group">
                                        <div className="p-cart-group__header">
                                            <div className="p-cart-group__checkbox">
                                                <UiCheckbox
                                                    value={+withoutPrescription.every(cartItem => cartItem.isActive)}
                                                    onChange={(data) => {
                                                        withoutPrescription.forEach(cartItem => {
                                                            cartItem.update({ isActive: data.value })
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="p-cart-group__name">
                                                Рецептурные препараты
                                            </div>
                                            <UiTooltip label={'Выдача только при наличии рецепта'}>
                                                <UiIcon size={24} name={'warning'} color={COLORS.SECONDARY}/>
                                            </UiTooltip>
                                        </div>
                                        <div className="p-cart-group__items">
                                            {withPrescription.map(cartItem => (
                                                <PCartItem key={cartItem.id} cartItem={cartItem}/>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {withoutPrescription.length > 0 && (
                                    <div className="p-cart-group">
                                        <div className="p-cart-group__header">
                                            <div className="p-cart-group__checkbox">
                                                <UiCheckbox
                                                    value={+withoutPrescription.every(cartItem => cartItem.isActive)}
                                                    onChange={(data) => {
                                                        withoutPrescription.forEach(cartItem => {
                                                            cartItem.update({ isActive: data.value })
                                                        });
                                                        cartItemsToggleBulkUpdate({
                                                            cartItems: withoutPrescription.map(cartItem => ({
                                                                catalogProductId: cartItem.catalogProductId,
                                                                isActive: cartItem.isActive,
                                                            }))
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className="p-cart-group__name">Безрецептурные препараты</div>
                                        </div>
                                        <div className="p-cart-group__items">
                                            {withoutPrescription.map(cartItem => (
                                                <PCartItem key={cartItem.id} cartItem={cartItem}/>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="p-cart-footer">
                                    <div className="p-cart-footer__buttons">
                                        <UiButton
                                            label="ВЕРНУТЬСЯ К ПОКУПКАМ"
                                            href={ROUTES.CATALOG()}
                                            colors={{
                                                button: [COLORS.WHITE, COLORS.WHITE],
                                                border: [COLORS.BLACK, COLORS.PRIMARY],
                                                label: [COLORS.BLACK, COLORS.PRIMARY]
                                            }}
                                        />
                                        <UiButton
                                            label="ОЧИСТИТЬ КОРЗИНУ"
                                            onClick={handleClear}
                                            colors={{
                                                button: [COLORS.WHITE, COLORS.WHITE],
                                                border: [COLORS.BLACK, COLORS.PRIMARY],
                                                label: [COLORS.BLACK, COLORS.PRIMARY]
                                            }}
                                        />
                                    </div>
                                    <div className="p-cart-footer__warning">
                                        <UiStickerCard
                                            sticker={
                                                <UiStickerCircle
                                                    name={'pointUp'}
                                                    size={60}
                                                    stickerSize={30}
                                                    color={COLORS.YELLOW_LIGHT}
                                                />
                                            }
                                            description={`Внимание! Для покупки рецептурных препаратов, вам понадобится предоставить рецепт.`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <UiGrid gap={16} columns={1}>
                                    <UiStickerCard
                                        sticker={
                                            <UiStickerCircle
                                                name={'star'}
                                                size={60}
                                                stickerSize={30}
                                                color={COLORS.ORANGE2}
                                            />
                                        }
                                        title={'Обратите внимание!'}
                                        description={`Окончательная цена зависит от выбранной аптеки`}
                                    />
                                    <CCheckoutSummary withQuantityCheck={false}>
                                        <UiButton
                                            label="ПЕРЕЙТИ К ОФОРМЛЕНИЮ"
                                            href={ROUTES.CHECKOUT()}
                                            hasBorder={false}
                                            isDisabled={
                                                OrderModule.cartItems.filter(cartItem => cartItem.isActive).length === 0
                                            }
                                            colors={{
                                                button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                                                label: [COLORS.WHITE, COLORS.WHITE]
                                            }}
                                        />
                                    </CCheckoutSummary>
                                </UiGrid>
                            </div>
                        </UiGrid>
                    </div>
                    {store.recommendations.length > 0 && (
                        <LayoutSection title='Рекомендуем'>
                            <CCatalogProductsSlider catalogProducts={store.recommendations}/>
                        </LayoutSection>
                    )}
                    <CCatalogProductsViewed/>
                </UiBoundary>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    return {
        props: {
            application: await getApplicationData(),
        }
    }
}

export default CartPage;
