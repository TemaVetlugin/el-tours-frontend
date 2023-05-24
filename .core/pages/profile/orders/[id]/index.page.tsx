import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from "next/router";

import { CLinkButton, COrderItem, COrderStatus } from "shared/components";
import { OrderStatusEnum } from "shared/enums";
import { UiBoundary, UiButton, UiCard, UiCardPanel, UiLink } from "shared/uikit";
import { OrderModel } from "shared/models";
import { ROUTES } from "shared/contants";
import { useObservable } from "shared/hooks";
import { ordersCancelRequest, ordersGetRequest, ordersRepeatRequest } from "shared/requests/api";
import { withRequireAuthorize } from "shared/hoc";
import { formatDate, toCurrency } from "shared/utilities";
import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";
import { NotifierModule, OrderModule } from "shared/modules";

import { PProfileLayout } from "../../components/PProfileLayout";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const OrderDetailPage: NextPage = withRequireAuthorize(observer(() => {
    const router = useRouter();
    const store = useObservable({
        isLoading: true,
        isSuccess: true,
        isCancelling: false,
        isRepeating: false,
        order: new OrderModel()
    })

    const load = useCallback(async () => {
        store.set("isLoading", true);
        const { isSuccess, data } = await ordersGetRequest({ id: +(router.query.id as string) })
        if (isSuccess && data) {
            store.set("order", new OrderModel(data.item));
        }
        store.set("isSuccess", isSuccess && !!data);
        store.set("isLoading", false);
    }, [router, store])

    useEffect(() => {
        load()
    }, [load]);

    const handleCancel = async () => {
        const result = await NotifierModule.prompt('Отмена заказа', {
            description: 'Подтвердите отмену заказа',
            successLabel: 'Подтверждаю'
        });
        if (!result) {
            return;
        }
        store.set("isCancelling", true);
        await ordersCancelRequest({ id: store.order.id });
        store.order.update({
            statusId: OrderStatusEnum.CanceledByUser.id
        });
        store.set("isCancelling", true);
        await NotifierModule.alert('Отмена заказа', {
            description: 'Вы отменили ваш заказ',
            successLabel: 'Принять'
        });
    }

    const handleRepeat = async () => {
        const result = await NotifierModule.prompt('Повторение заказа', {
            description: 'Текущие товары в корзине будут заменены на товары из этого заказа',
            successLabel: 'Подтверждаю'
        });
        if (!result) {
            return;
        }

        store.set("isRepeating", true);
        const { isSuccess, data } = await ordersRepeatRequest({ id: store.order.id });
        if (isSuccess && data) {
            OrderModule.mount(data.cartItems, true);
        }
        store.set("isRepeating", true);
        await router.push(ROUTES.CART());
    }

    return (
        <PProfileLayout title={`Заказ № ${store.order.code}`}>
            <UiCard>
                <UiBoundary isLoading={store.isLoading} onAction={load} isError={!store.isSuccess}>
                    <UiCardPanel className="p-profile-order">
                        <div className="p-profile-order__title">
                            Заказ № {store.order.code} от {formatDate(store.order.createdAt)}
                        </div>
                        <div className="p-profile-order__status">
                            <COrderStatus
                                label={store.order.status.name}
                                style={{ background: store.order.status.color }}
                            />
                        </div>
                        <div className="p-profile-order__description">
                            <b>Аптека:</b> <UiLink
                            href={ROUTES.STORE(store.order.store.id)}>{store.order.store.address}</UiLink>
                        </div>
                        {store.order.status.is(OrderStatusEnum.New) && (
                            <div className="p-profile-order__description">
                                Наши операторы обрабатывают ваш заказ.
                            </div>
                        )}
                        {store.order.status.is(OrderStatusEnum.Assembled) && (
                            <div className="p-profile-order__description">
                                Ваш заказ собран.
                            </div>
                        )}
                        <div className="p-profile-order__items">
                            {store.order.orderItems.map((orderItem) => {
                                return (
                                    <COrderItem
                                        key={orderItem.id}
                                        name={orderItem.name}
                                        href={orderItem.catalogProduct ? ROUTES.PRODUCT(orderItem.catalogProduct.slug) : ''}
                                        image={orderItem.catalogProduct?.previewImageThumbnail}
                                        price={orderItem.total}
                                        description={(
                                            <>{orderItem.quantity} X {toCurrency(orderItem.price)}</>
                                        )}
                                    />
                                )
                            })}
                        </div>
                        <div className="p-profile-order__footer">
                            <div className="p-profile-order__quantity">
                                Товаров в заказе: <b>{store.order.quantity}</b>
                            </div>
                            <div className="p-profile-order-amount">
                                <div className="p-profile-order-amount__item">
                                    Итого: <span>{toCurrency(store.order.total)}
                                </span>
                                </div>
                            </div>
                        </div>
                    </UiCardPanel>
                    <div className="p-profile-order__actions">
                        <CLinkButton href={ROUTES.PROFILE_ORDERS()} label={'Ко всем заказам'}/>
                        <div className="p-profile-order__buttons">
                            {store.order.status.in([OrderStatusEnum.New, OrderStatusEnum.Assembled, OrderStatusEnum.InDelivery]) && (
                                <UiButton label='ОТМЕНИТЬ ЗАКАЗ' onClick={handleCancel} isLoading={store.isCancelling}/>
                            )}
                            <UiButton label='ПОВТОРИТЬ ЗАКАЗ' onClick={handleRepeat} isLoading={store.isRepeating}/>
                        </div>
                    </div>
                </UiBoundary>
            </UiCard>
        </PProfileLayout>
    )
}));

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    return {
        props: {
            application: await getApplicationData(),
        }
    }
}

export default OrderDetailPage;
