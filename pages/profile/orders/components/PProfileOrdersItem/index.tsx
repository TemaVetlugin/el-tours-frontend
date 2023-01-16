import React from "react";
import { observer } from "mobx-react";

import { UiLink } from "shared/uikit";
import { OrderModel } from "shared/models";
import { formatDate, toCurrency } from "shared/utilities";
import { ROUTES } from "shared/contants";
import { CLinkButton, COrderStatus } from "shared/components";

import "./index.scss";
import { useMedia } from "shared/hooks";
import { useRouter } from "next/router";

type PropsType = {
    order: OrderModel
}

export const PProfileOrdersItem = observer(({ order }: PropsType) => {
    const router = useRouter();
    const { is360 } = useMedia();
    return (
        <div className="p-profile-orders-item" onClick={() => {
            if (is360) {
                router.push(ROUTES.PROFILE_ORDER(order.id));
            }
        }}>
            <div className="p-profile-orders-item__info">
                <div className="p-profile-orders-item__properties">
                    <div className="p-profile-orders-item__property">
                        Номер: <b>{order.code}</b></div>
                    <div className="p-profile-orders-item__property">
                        Стоимость: <b>{toCurrency(order.total)}</b></div>
                    <div className="p-profile-orders-item__property">
                        Кол-во товаров: <b>{order.quantity}
                    </b>
                    </div>
                    <div className="p-profile-orders-item__property">
                        Дата создания: <b>{formatDate(order.createdAt, 'dd.MM.yyyy', 'iso')}</b>
                    </div>
                </div>
                <div className="p-profile-orders-item__status">
                    <COrderStatus label={order.status.name} style={{ background: order.status.color }}/>
                </div>
            </div>
            <div className="p-profile-orders-item__aside">
                <div className="p-profile-orders-item__header">
                    <div className="p-profile-orders-item__title">Товары в заказе</div>
                    <div className="p-profile-orders-item__link">
                        <CLinkButton href={ROUTES.PROFILE_ORDER(order.id)} label={'Подробнее'} isForward/>
                    </div>
                </div>
                <div className="p-profile-orders-item-items">
                    <div className="p-profile-orders-item-items__inner">
                        {order.orderItems.map((orderItem) => {
                            if (!orderItem.catalogProduct) {
                                return null;
                            }
                            return (
                                <UiLink
                                    href={ROUTES.PRODUCT(orderItem.catalogProduct.slug)}
                                    className="p-profile-orders-item-item" key={orderItem.id}
                                >
                                    <div
                                        className="p-profile-orders-item-item__image"
                                        style={{ backgroundImage: `url(${orderItem.catalogProduct.previewImageThumbnail})` }}
                                    />
                                </UiLink>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
});
