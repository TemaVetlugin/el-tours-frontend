'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useNavigate, useObservable, usePrivatePage, useUser } from "shared/hooks";
import { UiButton, UiCheckbox, UiDataBoundary, UiForm, UiLink, UiPage, UiRadio, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { currency } from "shared/utilities";
import { CheckoutItemModel } from "shared/models";
import { checkoutQuery, ordersCreateQuery } from "shared/queries/main";
import { COrderItem, COrderTotal } from "shared/components/order";
import { PCheckoutStores } from "./components/PCheckoutStores";
import { CCheckoutWarning } from "shared/components/checkout";

import './page.scss';
import { OrderDeliveryTypeEnum, OrderPaymentTypeEnum } from "shared/enums";
import { UserAddressModel } from "shared/models/UserAddress.model";


const DELIVERY_TIMES = [
    { id: '10:00 - 12:00', name: '10:00 - 12:00' },
    { id: '12:00 - 14:00', name: '12:00 - 14:00' },
    { id: '14:00 - 16:00', name: '14:00 - 16:00' },
    { id: '16:00 - 18:00', name: '16:00 - 18:00' },
    { id: '18:00 - 20:00', name: '18:00 - 20:00' },
]

type PropsType = {
    deliveryTypeId?: string
};

export const Client = observer(({ deliveryTypeId }: PropsType) => {
    const isDeliveryCourier = deliveryTypeId === OrderDeliveryTypeEnum.Courier.id;

    const navigate = useNavigate();
    const city = useCity();
    const user = useUser();
    const store = useObservable({
        isLoading: true,
        isSubmitting: false,
        checkoutItems: [] as CheckoutItemModel[],
    })
    const form = useObservable({
        isAccepted: 1,
        storeId: null as number | null,
        paymentTypeId: OrderPaymentTypeEnum.Online.id,
        deliveryTypeId: deliveryTypeId === OrderDeliveryTypeEnum.Courier.id ? OrderDeliveryTypeEnum.Courier.id : OrderDeliveryTypeEnum.Selfpickup.id,
        userAddress: new UserAddressModel(),
        deliveryDate: null,
        deliveryTime: DELIVERY_TIMES[0].id,
        userPhone: UserService.user.phone
    });

    const isGranted = usePrivatePage(ROUTES.CART().url);

    useAsyncEffect(async () => {
        if (!isGranted) {
            return;
        }
        store.set("isLoading", true);
        const { isSuccess, data } = await checkoutQuery({
            cityId: city.id,
            deliveryTypeId: deliveryTypeId,
        });
        if (isSuccess && data) {
            if (data.items.length === 0) {
                alert('В выбранном городе данный тип доставки недоступен');
                navigate(ROUTES.CART());
                return;
            }
            store.set("checkoutItems", data.items.map(item => new CheckoutItemModel(item)));
            if (data.items.length === 1) {
                form.set("storeId", data.items[0].store?.id || null);
            }
        }
        store.set("isLoading", false);
    }, [store, city, isGranted]);

    useEffect(() => {
        console.log('full render')
    }, []);

    const handleSubmit = async () => {
        if (!UserService.isAuthorized() || !form.storeId) {
            return;
        }
        store.set("isSubmitting", true);
        const { isSuccess, data } = await ordersCreateQuery({
            storeId: form.storeId
        });

        if (data) {
            navigate(ROUTES.ORDER(data.item.id).url)
        } else {
            store.set("isSubmitting", false);
        }
    }

    const cartItems = CartService.cartItems.filter(cartItem => {
        if (!form.storeId) {
            return true;
        }
        return cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === form.storeId);
    });

    const checkoutItem = form.storeId
        ? (store.checkoutItems.find(checkoutItem => checkoutItem.store.id === form.storeId) || null)
        : null;

    return (
        <UiPage className={'p-checkout'}>
            <UiForm onSubmit={handleSubmit}>
                <UiWrap>
                    <UiPage.Breadcrumbs items={[ROUTES.CHECKOUT()]}/>
                    <UiPage.Title value={'Оформление заказа'}/>
                    <UiDataBoundary isLoading={store.isLoading}>
                        <div className="p-checkout__inner">
                            <div className="p-checkout__main">
                                <PCheckoutStores
                                    checkoutItems={store.checkoutItems}
                                    city={city}
                                    onChange={form.handleChange}
                                    value={form.storeId}
                                />
                                {isDeliveryCourier && (
                                    <div className="p-checkout-section">
                                        <div className="p-checkout-section__header">
                                            <div className="p-checkout-section__counter"/>
                                            <div className="p-checkout-section__title">Дата и время доставки</div>
                                        </div>
                                        <div className="p-checkout-section__inner">
                                        </div>
                                    </div>
                                )}
                                <div className="p-checkout-section">
                                    <div className="p-checkout-section__header">
                                        <div className="p-checkout-section__counter"/>
                                        <div className="p-checkout-section__title">Способ оплаты</div>
                                    </div>
                                    <div className="p-checkout-section__inner">
                                        <UiRadio
                                            isFlat
                                            items={OrderPaymentTypeEnum.items}
                                            value={form.paymentTypeId}
                                            name={'paymentTypeId'}
                                            onChange={form.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="p-checkout-section">
                                    <div className="p-checkout-section__header">
                                        <div className="p-checkout-section__counter"/>
                                        <div className="p-checkout-section__title">
                                            Контактные данные
                                        </div>
                                    </div>
                                    <div className="p-checkout-section__inner">
                                        <UiRadio
                                            isFlat
                                            items={OrderPaymentTypeEnum.items}
                                            value={form.paymentTypeId}
                                            name={'paymentTypeId'}
                                            onChange={form.handleChange}
                                        />
                                    </div>
                                </div>
                                {checkoutItem && (
                                    <div className="p-checkout-section">
                                        <div className="p-checkout-section__header">
                                            <div className="p-checkout-section__counter"/>
                                            <div className="p-checkout-section__title">
                                                Состав заказа ({checkoutItem.quantity} из {CartService.quantity})
                                            </div>
                                        </div>
                                        <div className="p-checkout-section__inner">
                                            {checkoutItem?.cartItems.map((cartItem) => (
                                                <COrderItem key={cartItem.id} orderItem={cartItem.orderItem}/>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-checkout__aside">
                                <COrderTotal
                                    total={!checkoutItem
                                        ? store.checkoutItems.map(checkoutItem => checkoutItem.order.total)
                                        : [checkoutItem.order.total]
                                    }
                                    items={!checkoutItem ? [] : [
                                        ['Кол-во товаров', checkoutItem.quantity],
                                        ['Стоимость товаров', currency(checkoutItem.order.totalOffer)],
                                        ['Доставка', isDeliveryCourier ? currency(checkoutItem.order.totalDelivery) : null],
                                        ['Скидка', checkoutItem.order.totalLoyaltyDiscount > 0 ? currency(-checkoutItem.order.totalLoyaltyDiscount) : null],
                                        ['Промокод', checkoutItem.order.totalLoyaltyPromocode > 0 ? currency(-checkoutItem.order.totalLoyaltyPromocode) : null],
                                        ['Подарки', checkoutItem.order.totalLoyaltyGift > 0 ? currency(-checkoutItem.order.totalLoyaltyGift) : null],
                                    ]}
                                >
                                    <UiButton
                                        type={'submit'}
                                        isDisabled={!form.storeId}
                                        label={'Оформить заказ'}
                                        isLoading={store.isSubmitting}
                                    />
                                    <UiCheckbox
                                        isRequired
                                        style={{ marginTop: 24 }}
                                        name={'isAccepted'}
                                        value={form.isAccepted}
                                        onChange={form.handleChange}
                                    >
                                        Ознакомлен и согласен с условиями <UiLink href={'#'}>Пользовательского
                                        соглашения</UiLink> и <UiLink href={'#'}>Политики конфиденциальности</UiLink>
                                    </UiCheckbox>
                                </COrderTotal>
                                <CCheckoutWarning/>
                            </div>
                        </div>
                    </UiDataBoundary>
                </UiWrap>
            </UiForm>
        </UiPage>
    )
});
