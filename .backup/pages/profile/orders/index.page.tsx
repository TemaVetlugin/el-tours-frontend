import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { UiBoundary, UiCard, UiCardPanel, UiCardSection, UiGrid } from "shared/uikit";
import { useObservable } from "shared/hooks";
import { OrderModel } from "shared/models";
import { ordersRequest } from "shared/requests/api";
import { withRequireAuthorize } from "shared/hoc";
import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";

import { PProfileOrdersItem } from "./components/PProfileOrdersItem";
import { PProfileLayout } from "../components/PProfileLayout";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const ProfileOrdersPage: NextPage<PropsType> = withRequireAuthorize(observer(() => {
    const store = useObservable({
        isLoading: true,
        isError: true,
        orders: [] as OrderModel[]
    });

    const fetchData = useCallback(async () => {
        store.set('isLoading', true)
        store.set('isError', false)
        const { isSuccess, data } = await ordersRequest();
        if (isSuccess && data) {
            store.set('orders', data.items.map(item => new OrderModel(item)));
        } else {
            store.set('isError', false)
        }
        store.set('isLoading', false)
    }, [store]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <PProfileLayout title='Мои заказы'>
            <UiBoundary isLoading={store.isLoading} isError={store.isError} onAction={fetchData}>
                <UiCard className="p-profile-orders__container">
                    <UiCardPanel>
                        <div className="p-profile-orders__items">
                            {store.orders.map(order => (
                                <PProfileOrdersItem key={order.code} order={order}/>
                            ))}
                        </div>
                    </UiCardPanel>
                </UiCard>
            </UiBoundary>
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

export default ProfileOrdersPage;
