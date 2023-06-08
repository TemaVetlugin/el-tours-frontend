'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { UiControlPropsType } from "shared/ui/types";
import { useDebouncedCallback, useObservable } from "shared/hooks";
import { UiIcon } from "shared/ui";

import './index.scss';

type PropsType = UiControlPropsType<number>;

export const UiQuantity = observer((
    { name = 'quantity', value, onChange }: PropsType) => {
    const store = useObservable({
        value: value || 1,
    });
    useEffect(() => {
        store.set("value", value || 1);
    }, [store, value]);

    const handleChange = useDebouncedCallback((value: number) => {
        onChange && onChange({
            name,
            value: value,
        })
    }, 1000);

    const update = (value: number) => {
        store.set('value', value);
        handleChange(value);
    }

    return (
        <div className={'ui-quantity'}>
            <div className="ui-quantity__action" onClick={() => update(store.value - 1)}>
                <UiIcon size={18} name={'minus'}/>
            </div>
            <div className="ui-quantity__value">{store.value}</div>
            <div className="ui-quantity__action" onClick={() => update(store.value + 1)}>
                <UiIcon size={18} name={'plus'}/>
            </div>
        </div>
    )
});

