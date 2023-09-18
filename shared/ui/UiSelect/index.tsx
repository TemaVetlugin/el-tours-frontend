'use client';

import React, {ReactElement, useMemo, useRef} from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { useOnClickOutside, useStore } from "shared/hooks";
import { COLORS } from "shared/contants";

import { UiIcon } from "../UiIcon";
import { UiControlPropsType } from "../types";

import './index.scss';

type PropsType = UiControlPropsType<number | string, {
    placeholder?: string,
    items: {
        id: number | string | null,
        name: number | string | ReactElement
    }[]
}>

export const UiSelect = observer((
    {
        placeholder = 'Не выбрано',
        value,
        onChange = () => {
        },
        className,
        name = 'ui-select',
        style,
        items = []
    }: PropsType
) => {
    const ref = useRef<HTMLDivElement>(null);

    const store = useStore({
        isOpened: false,
    });

    const classNames = classnames('ui-select', className, {
        'ui-select--opened': store.isOpened
    });

    useOnClickOutside(ref, () => {
        store.set('isOpened', false);
    });

    const handleChange = (value: number | string | null) => {
        store.set("isOpened", false);
        onChange({ name, value });
    }

    const item = useMemo(() => {
        const item = items.find(item => item.id == value);
        if (!item || !item.id) {
            return null;
        }
        return item;
    }, [items, value]);

    return (
        <div ref={ref} className={classNames} style={style}>
            <div className="ui-select-view" onClick={() => store.set("isOpened", !store.isOpened)}>
                {item && <div className="ui-select-view__value">{item.name}</div>}
                {!item && <div className="ui-select-view__placeholder">{placeholder}</div>}
                <div className="ui-select-view__icon">
                    <UiIcon
                        name={store.isOpened ? 'chevronUp' : 'chevronDown'}
                        size={24}
                        color={COLORS.DARK_SECONDARY}
                    />
                </div>
            </div>
            <div className="ui-select__items">
                {items.map(item => (
                    <div key={item.id} className="ui-select__item" onClick={() => handleChange(item.id)}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
});
