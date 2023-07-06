'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiDataBoundary, UiGrid, UiIcon, UiPage } from "shared/ui";
import { useAsyncEffect, useObservable, useUser } from "shared/hooks";
import { ordersGetQuery } from "shared/queries/main";
import { OrderModel } from "shared/models";

import './page.scss';
import { COrderItem, COrderTotal } from "shared/components/order";
import { currency, date } from "shared/utilities";
import { COLORS, ROUTES } from "shared/contants";
import { OrderDeliveryTypeEnum } from "shared/enums";

type PropsType = {
    id: string
}
export const Client = observer(({ id }: PropsType) => {
    const user = useUser();
    const store = useObservable({
        isLoading: true,
        order: new OrderModel()
    });

    useAsyncEffect(async () => {
        if (!user.isInitialized) {
            return;
        }
        const { isSuccess, data } = await ordersGetQuery({ id })
        if (isSuccess && data) {
            store.set('order', new OrderModel(data.item))
        }
        store.set("isLoading", false);
    }, [id, user]);

    return (
        <UiPage className={'p-order'}>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs items={[ROUTES.CHECKOUT()]}/>
                <UiDataBoundary isLoading={store.isLoading}>
                    <UiGrid gap={116} columns={'1fr 310px'}>
                        <UiPage.Section title={`Заказ №${id} успешно оформлен`}>
                            {store.order.deliveryType.is(OrderDeliveryTypeEnum.Selfpickup) && (
                                <div className="p-order-delivery">
                                    <UiIcon color={COLORS.GRAY_PRIMARY} size={24} name={'deliverySelfpickup'}/>
                                    <div className="p-order-delivery__inner">
                                        <span>
                                            Самовывоз <b>{store.order.store.name}</b> по адресу {store.order.store.address}
                                        </span>
                                        <span>
                                            Заказ будет храниться в аптеке до {date(store.order.createdAt).plus({ days: 5 }).toFormat('dd.MM.yyyy')}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {store.order.deliveryType.is(OrderDeliveryTypeEnum.Courier) && (
                                <div className="p-order-delivery">
                                    <UiIcon color={COLORS.GRAY_PRIMARY} size={24} name={'deliveryCourier'}/>
                                    <div className="p-order-delivery__inner">
                                        <span>
                                            Доставим <b>{date(store.order.deliveryDate).setLocale('ru').toFormat('d MMMM')} {store.order.deliveryTime}</b> по адресу {store.order.deliveryAddress}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="p-order__items">
                                {store.order.orderItems.map(orderItem => (
                                    <COrderItem
                                        key={orderItem.id}
                                        orderItem={orderItem}
                                    />
                                ))}
                            </div>
                        </UiPage.Section>
                        <COrderTotal
                            total={[store.order.total]}
                            items={[
                                ['Товаров', store.order.quantity],
                                ['Скидка', currency(store.order.totalLoyaltyDiscount)]
                            ]}
                        />
                    </UiGrid>
                </UiDataBoundary>
            </UiPage.Wrap>
        </UiPage>
    )
});
