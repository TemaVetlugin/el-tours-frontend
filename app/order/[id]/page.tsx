'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import { UiDataBoundary, UiPage } from "shared/ui";
import { useAsyncEffect, useObservable, useUser } from "shared/hooks";
import { ordersGetQuery } from "shared/queries/main";
import { OrderModel } from "shared/models";

import './page.scss';

type PropsType = {
    params: {
        id: string
    }
}
export default observer(function TestPage({ params }: PropsType) {
    const user = useUser();
    const store = useObservable({
        isLoading: true,
        order: new OrderModel()
    });

    useAsyncEffect(async () => {
        if (!user.isInitialized) {
            return;
        }
        const { isSuccess, data } = await ordersGetQuery(params)
        if (isSuccess && data) {
            store.set('order', new OrderModel(data.item))
        }
        store.set("isLoading", false);
    }, [params.id, user]);

    return (
        <UiPage className={'p-order'}>
            <UiPage.Wrap>
                <UiPage.Title value={`Заказ №${params.id} успешно оформлен`}/>
                <UiDataBoundary isLoading={store.isLoading}>
                    <div className="p-order__location">
                        Самовывоз {store.order.store.name} по адресу {store.order.store.address}
                    </div>
                </UiDataBoundary>
            </UiPage.Wrap>
        </UiPage>
    )
})
