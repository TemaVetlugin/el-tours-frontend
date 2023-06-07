'use client';

import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { useOnClickOutside, useObservable } from "shared/hooks";
import { COLORS } from "shared/contants";

import { UiControlItemType, UiControlPropsType } from "../types";
import { UiIcon } from '../UiIcon';

import './index.scss';

type PropsType = UiControlPropsType<number | string, {
    label?: string,
    control?: (item: UiControlItemType | null, isOpened: boolean) => React.ReactNode,
    items: UiControlItemType[]
}>;

export const UiDropdown = observer((
    {
        label,
        className,
        name = 'ui-dropdown',
        value,
        style,
        items,
        control,
        onChange = () => {
        }
    }: PropsType
) => {
    const ref = useRef<HTMLDivElement>(null);

    const store = useObservable({
        isOpened: false,
    });

    const classNames = classnames('ui-dropdown', className, {
        'ui-dropdown--opened': store.isOpened
    });

    useOnClickOutside(ref, () => {
        store.set('isOpened', false);
    });

    const item = items.find(item => item.id == value);

    return (
        <div className={classNames} style={style} ref={ref}>
            {label && (
                <div className="ui-dropdown__label">
                    {label}
                </div>
            )}
            <div className="ui-dropdown-control">
                <div className="ui-dropdown-control__inner" onClick={() => {
                    store.set("isOpened", !store.isOpened);
                }}>
                    {!control && (
                        <div className="ui-dropdown-control__view">
                            <div className="ui-dropdown-control__value">
                                {item?.name || 'Не выбрано'}
                            </div>
                            <div className="ui-dropdown-control__icon">
                                <UiIcon
                                    size={16}
                                    color={COLORS.GRAY_PRIMARY}
                                    name={store.isOpened ? 'chevronUp' : 'chevronDown'}
                                />
                            </div>
                        </div>
                    )}
                    {control && control(item || null, store.isOpened)}
                </div>
                <div className="ui-dropdown__items">
                    {items.map(item => (
                        <div key={item.id} className="ui-dropdown__item" onClick={() => {
                            onChange({
                                name,
                                value: item.id
                            });
                            store.set("isOpened", false);
                        }}>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
});
