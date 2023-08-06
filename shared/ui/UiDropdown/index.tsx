'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";

import { useObservable, useOnClickOutside } from "shared/hooks";

import { UiControlPropsType } from "../types";

import './index.scss';

type PropsType<T> = UiControlPropsType<number | string, {
    items: T[],
    isLoading: boolean
    itemLabel: (item: T) => string,
    children: React.ReactNode
}>;

export const UiDropdown = observer(<T extends { id: string | number | null }, >(
    {
        className,
        name = 'ui-dropdown',
        value,
        style,
        items,
        isLoading,
        itemLabel,
        children,
        onChange = () => {
        }
    }: PropsType<T>
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
            <div className="ui-dropdown__control">
                {children}
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
                        {itemLabel(item)}
                    </div>
                ))}
            </div>

        </div>
    )
});
