import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { COLORS } from "shared/contants";
import { UiControlPropsType } from "shared/types";
import { useObservable } from "shared/hooks";

import { UiIcon } from "../UiIcon";

import './index.scss';

type PropsType = UiControlPropsType<number, {
    max?: number
}>;

export const UiQuantity = observer((
    {
        name = 'quantity',
        value = 0,
        onChange = () => {
        },
        max = 999
    }: PropsType
) => {
    const store = useObservable({
        value: value as string | number,
    });

    useEffect(() => {
        store.set("value", value || 0);
    }, [value]);

    const handleChange = (value: number) => {
        let newValue = value;
        if (newValue < 1) {
            newValue = 1;
        }
        if (newValue > max) {
            newValue = max;
        }
        onChange({
            name,
            value: newValue
        });
    }

    return (
        <div className="ui-quantity">
            <div className="ui-quantity__button" onClick={() => {
                handleChange(+store.value - 1)
            }}>
                <UiIcon size={18} name={'minus'} color={COLORS.GRAY_DARK}/>
            </div>
            <input
                type="number"
                className="ui-quantity__control"
                value={store.value}
                onChange={e => {
                    store.set("value", e.target.value || '');
                }}
                onBlur={(e) => {
                    let newValue = store.value ? `${store.value}` : '1';
                    handleChange(+newValue.replace(/[^0-9.]/g, '') || 1);
                }}
            />
            <div className="ui-quantity__button" onClick={() => {
                handleChange(+store.value + 1)
            }}>
                <UiIcon size={18} name={'plus'} color={COLORS.GRAY_DARK}/>
            </div>
        </div>
    )
});
