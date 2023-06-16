'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { StoreModel } from "shared/models";
import { userStoresToggleQuery } from "shared/queries/main";
import { UiButton, UiIcon } from "shared/ui";

import './index.scss';

type PropsType = {
    store: StoreModel,
}

export const PStoreMarker = observer(({ store }: PropsType) => {
    return (
        <div className="p-stores-marker">
            <div className="p-stores-marker__name">{store.name}</div>
            <div className="p-stores-marker__brand">{store.storeBrand.name}</div>
            <div className="p-stores-marker__address">{store.address}</div>
            <div className="p-stores-marker__phone">
                <UiIcon size={24} name={'phone'}/>
                <span>{store.phone}</span>
            </div>
            <div className="p-stores-marker__footer">
                <UiButton
                    label={'Выбрать'}
                    onClick={async () => {
                        await userStoresToggleQuery({
                            storeId: store.id
                        });
                    }}
                />
            </div>
        </div>
    )
})
