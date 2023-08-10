'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useStore } from "shared/hooks";
import { UiButton, UiCheckbox, UiDataBoundary, UiIcon, UiPage, UiScroll, UiWrap } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { StoreModel } from "shared/models";
import { storesQuery } from "shared/queries/main";
import { UiMap } from "shared/ui/UiMap";

import './page.scss';
import { PStoreMarker } from "./components/PStoresMarker";

export const Client = observer(() => {
    const city = useCity();
    const store = useStore({
        isLoading: true,
        stores: [] as StoreModel[],
        location: [50, 50] as [number, number],
        zoom: 14
    });

    useEffect(() => {
        store.set("location", city.location)
        store.set("zoom", city.zoom)
    }, [store, city])

    useAsyncEffect(async () => {
        store.set("isLoading", true);

        const { isSuccess, data } = await storesQuery({
            cityId: city.id
        });

        if (isSuccess && data) {
            store.set("stores", data.items.map(item => new StoreModel(item)));
        }

        store.set("isLoading", false);
    }, [city.id]);

    return (
        <UiPage className={'p-stores'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.STORES()
                    ]}
                />
                <UiPage.Header title={'Аптеки'}/>
                <UiDataBoundary isLoading={store.isLoading}>
                    <div className="p-stores__header">
                        <div className="p-stores__filters">
                            <UiCheckbox
                                label={'Работает сейчас'}
                            />
                            <UiCheckbox
                                label={'С доставкой на дом'}
                            />
                        </div>
                        <div className="p-stores__count">
                            Найдено: {store.stores.length}
                        </div>
                    </div>
                    <div className="p-stores__inner">
                        <div className="p-stores-aside">
                            <UiScroll>
                                <div className="p-stores-aside__inner">
                                    {store.stores.map(item => (
                                        <div key={item.id} className="p-stores-item">
                                            {!!item.hasDelivery && (
                                                <div className="p-stores-item__badge">
                                                    <UiIcon size={16} name={'deliveryCourier'} color={COLORS.WHITE}/>
                                                    <span>Доставим на дом</span>
                                                </div>
                                            )}
                                            <div className="p-stores-item__name">{item.name}</div>
                                            {item.storeBrand && (
                                                <div className="p-stores-item__brand">{item.storeBrand.name}</div>
                                            )}
                                            <div
                                                className="p-stores-item__address"
                                                onClick={() => {
                                                    store.set("location", item.location);
                                                    store.set("zoom", 18);
                                                }}
                                            >
                                                {item.address}
                                            </div>
                                            <div className="p-stores-item__delimiter"/>
                                            <div className="p-stores-item__phone">{item.phone}</div>
                                            <div className="p-stores-item__schedule">

                                            </div>
                                            <div className="p-stores-item__footer">
                                                <UiButton
                                                    template={'small'}
                                                    label={'Выбрать эту аптеку'}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </UiScroll>
                        </div>
                        <UiMap
                            className="p-stores__map"
                            location={store.location}
                            zoom={store.zoom}
                            render={(map) => store.stores.map(item => (
                                <UiMap.Marker
                                    key={item.id}
                                    map={map}
                                    location={item.location}
                                    render={() => <PStoreMarker store={item}/>}
                                />
                            ))}
                        />
                    </div>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    );
});
