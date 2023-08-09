'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";

import { useStore, useOnClickOutside } from "shared/hooks";
import { UiLoading } from "shared/ui";

import { UiControlPropsType } from "../types";

import './index.scss';

type PropsType<T> = UiControlPropsType<number | string, {
    items: T[],
    isLoading?: boolean,
    isOpened?: boolean,
    itemLabel?: (item: T) => string | React.ReactNode,
    children: React.ReactNode
}>;

export const UiDropdown = observer(<T extends { id: string | number | null }, >(
    {
        className,
        name = 'ui-dropdown',
        value,
        style,
        items,
        isLoading = false,
        itemLabel = (item) => `${item.id}`,
        children,
        onChange = () => {
        },
        isOpened = false,
    }: PropsType<T>
) => {
    const ref = useRef<HTMLDivElement>(null);

    const store = useStore({
        isOpened: false,
    });

    useEffect(() => {
        store.set("isOpened", isOpened);
    }, [store, isOpened]);

    const classNames = classnames('ui-dropdown', className, {
        'ui-dropdown--opened': store.isOpened
    });

    useOnClickOutside(ref, () => {
        store.set('isOpened', false);
    });

    return (
        <div className={classNames} style={style} ref={ref}>
            <div className="ui-dropdown__control" onClick={() => store.set("isOpened", !store.isOpened)}>
                {children}
            </div>
            <div className={classnames('ui-dropdown__items', {
                'ui-dropdown__items--loading': isLoading
            })}>
                {isLoading && <UiLoading size={36}/>}
                {!isLoading && items.map(item => (
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
