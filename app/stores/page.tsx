'use client';

import React from "react";

import { useAsyncEffect, useCity, useObservable, useObserve } from "shared/hooks";
import { UiButton, UiCheckbox, UiDataBoundary, UiIcon, UiPage, UiScroll, UiWrap } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { StoreModel } from "shared/models";
import { storesQuery } from "shared/queries/main";

import './page.scss';

type PropsType = {
    params: {
        slug?: string[]
    }
}

export default function StorePage({ params }: PropsType) {
    const city = useCity();
    const store = useObservable({
        isLoading: true,
        stores: [] as StoreModel[]
    });

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

    return useObserve(() => (
        <UiPage className={'p-stores'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.STORES()
                    ]}
                />
                <UiPage.Title value={'Аптеки'}/>
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
                                    {[...store.stores,...store.stores,...store.stores,...store.stores].map(store => (
                                        <div key={store.id} className="p-stores-item">
                                            <div className="p-stores-item__badge">
                                                <UiIcon size={16} name={'delivery'} color={COLORS.WHITE}/>
                                                <span>Доставим на дом</span>
                                            </div>
                                            <div className="p-stores-item__name">{store.name}</div>
                                            {store.storeBrand && (
                                                <div className="p-stores-item__brand">{store.storeBrand.name}</div>
                                            )}
                                            <div className="p-stores-item__address">{store.address}</div>
                                            <div className="p-stores-item__delimiter"/>
                                            <div className="p-stores-item__phone">{store.phone}</div>
                                            <div className="p-stores-item__schedule">

                                            </div>
                                            <div className="p-stores-item__footer">
                                                <UiButton
                                                    size={'small'}
                                                    label={'Выбрать эту аптеку'}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </UiScroll>
                        </div>
                        <div className="p-stores__map">

                        </div>
                    </div>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    ))
}
