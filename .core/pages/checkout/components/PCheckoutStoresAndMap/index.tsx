import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { UiCheckbox, UiMap, UiScroll } from "shared/uikit";
import { useObservable } from "shared/hooks";
import { OrderModule, UserModule } from "shared/modules";
import { StoreModel } from "shared/models";
import { UiControlPropsType } from "shared/types";

import { PCheckoutStore } from "../PCheckoutStore";

import "./index.scss";

type PropTypes = UiControlPropsType<number, {
    stores: StoreModel[]
}>

export const PCheckoutStoresAndMap = observer((
    { onChange, value, stores }: PropTypes
) => {
    const store = useObservable({
        onlyIsAvailable: 0,
    });

    const storesSorted = useMemo(() => stores.slice().sort((a, b) => {
        return OrderModule.getCatalogProductOffersPrice(a.id) - OrderModule.getCatalogProductOffersPrice(b.id);
    }), [stores]);

    const storesFullCover = useMemo(() => storesSorted.filter(store => {
        return OrderModule.getAvailability(store.id).isCover;
    }), [storesSorted]);

    const storesPartCover = useMemo(() => storesSorted.filter(store => {
        const availability = OrderModule.getAvailability(store.id);
        return !availability.isCover && availability.items.length > 0;
    }), [storesSorted]);

    const storesMap = useMemo(
        () => store.onlyIsAvailable ? storesFullCover : [...storesFullCover, ...storesPartCover],
        [store.onlyIsAvailable, storesFullCover, storesPartCover]
    );

    return (
        <>
            <div className="p-checkout-stores">
                <div className="p-checkout-stores__header">
                    <UiCheckbox
                        value={store.onlyIsAvailable}
                        onChange={store.handleChange}
                        name={'onlyIsAvailable'}
                        label='Показать аптеки, где все товары заказа в наличии'
                    />
                </div>
                <div className="p-checkout-stores__inner">
                    <UiScroll maxHeight={400}>
                        {!!storesFullCover && (
                            <div className="p-checkout-stores-section">
                                <div className="p-checkout-stores-section__title">
                                    Все товары в наличии
                                </div>
                                <div className="p-checkout-stores-section__inner">
                                    {storesFullCover.map(store => (
                                        <PCheckoutStore
                                            key={store.id}
                                            store={store}
                                            value={value}
                                            onChange={onChange}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {(!store.onlyIsAvailable && !!storesPartCover.length) && (
                            <div className="p-checkout-stores-section">
                                <div className="p-checkout-stores-section__title">
                                    Часть товаров в наличии
                                </div>
                                <div className="p-checkout-stores-section__inner">
                                    {storesPartCover.map(store => (
                                        <PCheckoutStore
                                            key={store.id}
                                            store={store}
                                            value={value}
                                            onChange={onChange}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </UiScroll>
                </div>
            </div>
            <div className="p-checkout-map">
                <UiMap
                    stores={{
                        items: storesMap,
                        onChange,
                        value,
                        content: (storeId: number) => {
                            const data = OrderModule.getAvailability(storeId);
                            return `${data.items.length} из ${OrderModule.activeCartItems.length}`
                        }
                    }}
                    location={UserModule.user.city.location}
                    zoom={UserModule.user.city.zoom}
                />
            </div>
        </>
    )
});
