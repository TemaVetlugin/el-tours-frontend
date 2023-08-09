'use client';

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import { useAsyncEffect, useDebouncedCallback, useStore } from "shared/hooks";
import { userAddressesSearchQuery } from "shared/queries/main";
import { UiDropdown, UiInput } from "shared/ui";
import { UiControlPropsType } from "shared/ui/types";

import './index.scss';

type PropsType = UiControlPropsType<string | null, {
    placeholder?: string | React.ReactNode
}>;

export const UiAddressInput = observer((
    {
        value,
        placeholder = 'Укажите адрес для доставки',
        name = 'ui-address-input',
        onChange
    }: PropsType
) => {
    const store = useStore({
        value: '',
        items: [] as { id: string }[],
        isLoading: false
    });

    useEffect(() => {
        store.set("value", value || '');
    }, [store, value]);

    useAsyncEffect(async () => {
        if (store.value.length < 3) {
            return;
        }
        store.set("isLoading", true);
        userAddressesSearchDebounced();
    }, [store.value]);

    const userAddressesSearchDebounced = useDebouncedCallback(async () => {
        const { isSuccess, data } = await userAddressesSearchQuery({
            query: store.value
        });

        if (isSuccess && data) {
            store.set("items", data.items.map(item => ({
                id: item,
            })))
        }

        store.set("isLoading", false);
    }, 1000);

    const handleChange = (value: string | null) => {
        onChange && onChange({
            name,
            value
        });
    }

    return (
        <UiDropdown
            className={'ui-address-input'}
            items={store.items}
            isLoading={store.isLoading}
            onChange={(data) => {
                handleChange(data.value as string)
            }}
        >
            <UiInput
                placeholder={placeholder}
                value={store.value}
                onChange={(data) => {
                    handleChange(data.value)
                }}
            />
        </UiDropdown>
    )
})
