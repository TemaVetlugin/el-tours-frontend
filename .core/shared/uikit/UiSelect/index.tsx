import React, { useRef } from "react";
import { observer } from "mobx-react";

import { UiControlPropsType } from "shared/types";

import './index.scss';
import classnames from "classnames";
import { useOnClickOutside, useObservable } from "shared/hooks";
import { UiIcon } from "shared/uikit";
import { COLORS } from "shared/contants";

type PropsType = UiControlPropsType<number | string, {
    placeholder?: string,
    items: {
        id: number | string | null,
        name: number | string
    }[]
}>

export const UiSelect = observer((
    {
        placeholder = 'Не выбрано',
        value,
        onChange = () => {},
        className,
        name = 'ui-select',
        style,
        items = []
    }: PropsType
) => {
    const ref = useRef<HTMLDivElement>(null);

    const store = useObservable({
        isOpened: false,
    });

    const classNames = classnames('ui-select', className, {
        'ui-select--opened': store.isOpened
    });

    useOnClickOutside(ref, () => {
        store.set('isOpened', false);
    });

    const item = items.find(item => item.id == value);

    const handleChange = (value: number | string | null) => {
        store.set("isOpened", false);
        onChange({ name, value });
    }

    return (
        <div ref={ref} className={classNames} style={style}>
            <div className="ui-select-view" onClick={() => store.set("isOpened", !store.isOpened)}>
                {item && <div className="ui-select-view__value">{item.name}</div>}
                {!item && <div className="ui-select-view__placeholder">{placeholder}</div>}
                <div className="ui-select-view__icon">
                    <UiIcon
                        key={store.isOpened ? 'chevronUp' : 'chevronDown'} //disable animation
                        name={store.isOpened ? 'chevronUp' : 'chevronDown'}
                        size={24}
                        color={COLORS.GRAY_DARK}
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
