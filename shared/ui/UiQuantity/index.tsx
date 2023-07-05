'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { UiControlPropsType } from "shared/ui/types";
import { useDebouncedCallback, useObservable } from "shared/hooks";
import { UiIcon } from "shared/ui";

import './index.scss';

type PropsType = UiControlPropsType<number> & {
    onChanging?: () => void
};

export const UiQuantity = observer((
    { name = 'quantity', value, onChange, onChanging }: PropsType) => {
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
    }, 1400);

    const update = (value: number) => {
        if (value < 1) {
            return;
        }
        store.set('value', value);
        onChanging && onChanging();
        handleChange(value);
    }

    return (
        <div className={'ui-quantity'}>
            <div className="ui-quantity__action" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault()
                update(store.value - 1)
            }}>
                <UiIcon size={18} name={'minus'}/>
            </div>
            <div className="ui-quantity__value">{store.value}</div>
            <div className="ui-quantity__action" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault()
                update(store.value + 1)
            }}>
                <UiIcon size={18} name={'plus'}/>
            </div>
        </div>
    )
});

