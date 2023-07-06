'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import { OrderModel } from "shared/models";

import classnames from "classnames";

import { currency, date } from "shared/utilities";
import { UiButton, UiIcon } from "shared/ui";
import { useObservable } from "shared/hooks";
import { COLORS } from "shared/contants";
import { COrderItem } from "shared/components/order";

import './index.scss';

type PropsType = {
    order: OrderModel
}

export const COrder = observer(({ order }: PropsType) => {
    const store = useObservable({
        isOpened: false
    });

    const property = (name: string, value: string | number | null | undefined) => {
        if (!value) {
            return null;
        }
        return (
            <div className="c-order-property">
                <div className="c-order-property__inner">
                    <div className="c-order-property__name">{name}</div>
                    <div className="c-order-property__row"></div>
                </div>
                <div className="c-order-property__value">{value}</div>
            </div>
        )
    }

    return (
        <div className={classnames("c-order", {
            "c-order--opened": store.isOpened
        })}>
            <div className="c-order-preview">
                <div className="c-order-preview__cell">№ {order.code}</div>
                <div className="c-order-preview__cell">{order.quantity}</div>
                <div className="c-order-preview__cell">{currency(order.total)}</div>
                <div className="c-order-preview__cell">
                    <div
                        className="c-order-preview__status"
                        style={{
                            backgroundColor: order.status.color[0],
                            color: order.status.color[1],
                        }}
                    >
                        {order.status.name}
                    </div>
                </div>
                <div className="c-order-preview__cell">{date(order.createdAt).toFormat('dd.MM.yyyy')}</div>
                <div className="c-order-preview__cell">
                    <div className="c-order-preview__toggle" onClick={() => store.set("isOpened", !store.isOpened)}>
                        <span>Подробнее</span>
                        <UiIcon size={16} name={store.isOpened ? 'chevronUp' : 'chevronDown'}/>
                    </div>
                </div>
            </div>
            {store.isOpened && (
                <div className="c-order-content">
                    <div className="c-order-content__section">
                        <div className="c-order-content__title">Общая информация</div>
                        {property('Тип доставки', order.deliveryType.name)}
                        {property('Тип оплаты', order.paymentType.name)}
                    </div>
                    <div className="c-order-content__section">
                        <div className="c-order-content__title">Товары в заказе</div>
                        {order.orderItems.map(orderItem => (
                            <COrderItem key={orderItem.id} orderItem={orderItem}/>
                        ))}
                    </div>
                    <div className="c-order-content__footer">
                        <div className="c-order-content__section">
                            <div className="c-order-content__title">Примененные скидки и акции</div>
                        </div>
                        <div className="c-order-content-total">
                            <div className="c-order-content-total__name">Итого</div>
                            <div className="c-order-content-total__value">{currency(order.total)}</div>
                        </div>
                    </div>
                    <div className="c-order-content__actions">
                        <UiButton colors={{
                            button: [COLORS.TRANSPARENT, COLORS.GREEN_PRIMARY],
                            border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
                            icon: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                            label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                        }}>
                            <span>Повторить заказ</span>
                            <UiIcon size={24} name={"repeat"}/>
                        </UiButton>
                        <UiButton colors={{
                            button: [COLORS.TRANSPARENT, COLORS.GREEN_PRIMARY],
                            border: [COLORS.TRANSPARENT, COLORS.GREEN_PRIMARY],
                            icon: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                            label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                        }}>
                            <span>Отменить заказ</span>
                        </UiButton>
                    </div>
                </div>
            )}
        </div>
    );
})
