'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiDataBoundary, UiGrid, UiPage, UiPanel, UiWrap } from "shared/ui";
import { MASKS, ROUTES } from "shared/contants";
import { useAsyncEffect, useObservable, usePrivatePage, useUser } from "shared/hooks";
import { mask } from "shared/utilities";
import { CProfileMenu } from "shared/components/profile";
import { ordersQuery } from "shared/queries/main";
import { OrderModel } from "shared/models";
import { COrder } from "shared/components/order";

import './page.scss';

export const Client = observer(() => {
    const isGranted = usePrivatePage();
    const user = useUser();
    const store = useObservable({
        orders: [] as OrderModel[]
    });

    useAsyncEffect(async () => {
        if (!isGranted) {
            return;
        }
        const { data, isSuccess } = await ordersQuery();
        if (isSuccess && data) {
            store.set("orders", data.items.map(item => new OrderModel(item)));
        }
    }, [isGranted, store]);

    return (
        <UiPage>
            <UiWrap>
                <UiDataBoundary isLoading={!isGranted}>
                    <UiPage.Breadcrumbs items={[ROUTES.PROFILE()]}/>
                    <UiPage.Header title={mask(MASKS.MOBILE_PHONE, user.phone)}/>
                    <UiGrid columns={'280px 1fr'} gap={50}>
                        <div>
                            <CProfileMenu/>
                        </div>
                        <div>
                            <UiPanel>
                                <UiPanel.Header>
                                    <UiPanel.Title>Мои заказы</UiPanel.Title>
                                </UiPanel.Header>
                                <div className="p-profile-orders-head">
                                    <span>Номер заказа</span>
                                    <span>Кол-во</span>
                                    <span>Сумма</span>
                                    <span>Статус</span>
                                    <span>Дата оформления</span>
                                    <span></span>
                                </div>
                                {store.orders.map(order => (
                                    <COrder key={order.id} order={order}/>
                                ))}
                            </UiPanel>
                        </div>
                    </UiGrid>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    )
});
