'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useNavigate, useObservable, usePrivatePage, useUser } from "shared/hooks";
import {
    UiButton,
    UiCheckbox,
    UiDataBoundary,
    UiDatepicker,
    UiForm,
    UiFormControl,
    UiGrid,
    UiInput,
    UiLink,
    UiPage,
    UiRadio,
    UiSelect,
    UiWrap
} from "shared/ui";
import { MASKS, ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { currency, date } from "shared/utilities";
import { CheckoutItemModel } from "shared/models";
import { checkoutQuery, ordersCreateQuery } from "shared/queries/main";
import { COrderItem, COrderTotal } from "shared/components/order";
import { PCheckoutStores } from "./components/PCheckoutStores";
import { CCheckoutWarning } from "shared/components/checkout";

import './page.scss';
import { OrderDeliveryTypeEnum, OrderPaymentTypeEnum } from "shared/enums";
import { UserAddressModel } from "shared/models/UserAddress.model";
import { useValidation } from "shared/hooks/useValidation";
import { isMobilePhone, isRequired } from "shared/validations";


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
        deliveryDate: date().plus({ day: 1 }).toFormat('yyyy-MM-dd'),
        deliveryTime: DELIVERY_TIMES[0].id,
        userPhone: UserService.user.phone
    });

    const isGranted = usePrivatePage(ROUTES.CART().url);

    useAsyncEffect(async () => {
        if (!isGranted) {
            return;
        }
        store.set("isLoading", true);
        form.set("userPhone", UserService.user.phone);
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

    const validation = useValidation(form, {
        userPhone: [isRequired(), isMobilePhone()],
    });

    const validationUserAddress = useValidation(form.userAddress, {
        address: [isRequired()],
        apartment: [isRequired()],
    });

    const handleSubmit = async () => {
        validation.submit();
        validationUserAddress.submit();
        if (!UserService.isAuthorized() || !form.storeId) {
            return;
        }
        if (!validation.isValid || (isDeliveryCourier && !validationUserAddress.isValid)) {
            return;
        }
        store.set("isSubmitting", true);
        const { isSuccess, data } = await ordersCreateQuery({
            ...form,
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
                                {!isDeliveryCourier && (
                                    <PCheckoutStores
                                        checkoutItems={store.checkoutItems}
                                        city={city}
                                        onChange={form.handleChange}
                                        value={form.storeId}
                                    />
                                )}
                                {isDeliveryCourier && (
                                    <div className="p-checkout-section">
                                        <div className="p-checkout-section__header">
                                            <div className="p-checkout-section__counter"/>
                                            <div className="p-checkout-section__title">Адрес доставки</div>
                                        </div>
                                        <div className="p-checkout-section__inner" style={{ maxWidth: 720 }}>
                                            <UiGrid columns={1} gap={16}>
                                                <UiFormControl
                                                    errorMessage={validationUserAddress.address.errorMessage}>
                                                    <UiInput
                                                        placeholder={'Укажите адрес доставки'}
                                                        value={form.userAddress.address}
                                                        name={'address'}
                                                        onChange={form.userAddress.handleChange}
                                                    />
                                                </UiFormControl>
                                                <UiGrid columns={4} gap={16}>
                                                    <UiFormControl
                                                        errorMessage={validationUserAddress.apartment.errorMessage}>
                                                        <UiInput
                                                            placeholder={'Квартира/офис'}
                                                            value={form.userAddress.apartment}
                                                            name={'apartment'}
                                                            onChange={form.userAddress.handleChange}
                                                        />
                                                    </UiFormControl>
                                                    <UiInput
                                                        placeholder={'Этаж'}
                                                        value={form.userAddress.floor}
                                                        name={'floor'}
                                                        onChange={form.userAddress.handleChange}
                                                    />
                                                    <UiInput
                                                        placeholder={'Подъезд'}
                                                        value={form.userAddress.entrance}
                                                        name={'entrance'}
                                                        onChange={form.userAddress.handleChange}
                                                    />
                                                    <UiInput
                                                        placeholder={'Домофон'}
                                                        value={form.userAddress.intercom}
                                                        name={'intercom'}
                                                        onChange={form.userAddress.handleChange}
                                                    />
                                                </UiGrid>
                                                <UiInput
                                                    placeholder={'Комментарий курьеру'}
                                                    value={form.userAddress.comment}
                                                    name={'comment'}
                                                    onChange={form.userAddress.handleChange}
                                                />
                                            </UiGrid>
                                        </div>
                                    </div>
                                )}
                                {isDeliveryCourier && (
                                    <div className="p-checkout-section">
                                        <div className="p-checkout-section__header">
                                            <div className="p-checkout-section__counter"/>
                                            <div className="p-checkout-section__title">Дата и время доставки</div>
                                        </div>
                                        <div className="p-checkout-section__inner p-checkout-section__inner--row">
                                            <UiFormControl label={'Дата доставки'} style={{ width: 170 }}>
                                                <UiDatepicker
                                                    min={date().plus({ day: 1 }).toISO() as string}
                                                    value={form.deliveryDate}
                                                    name={'deliveryDate'}
                                                    onChange={form.handleChange}
                                                />
                                            </UiFormControl>
                                            <UiFormControl label={'Время доставки'} style={{ width: 170 }}>
                                                <UiSelect
                                                    items={DELIVERY_TIMES}
                                                    value={form.deliveryTime}
                                                    name={'deliveryTime'}
                                                    onChange={form.handleChange}
                                                />
                                            </UiFormControl>
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
                                    <div className="p-checkout-section__inner" style={{ maxWidth: 340 }}>
                                        <UiFormControl
                                            label={'Номер телефона'}
                                            errorMessage={validation.userPhone.errorMessage}
                                        >
                                            <UiInput
                                                mask={MASKS.MOBILE_PHONE}
                                                value={form.userPhone}
                                                name={'userPhone'}
                                                onChange={form.handleChange}
                                            />
                                        </UiFormControl>
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
