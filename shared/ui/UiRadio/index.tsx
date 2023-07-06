'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { UiControlPropsType } from "../types";

import './index.scss';

type PropsType = UiControlPropsType<number | string, {
    isFlat?: boolean,
    items: {
        id: number | string,
        name: string
    }[],
}>;

export const UiRadio = observer((
    {
        value,
        items = [],
        name = 'ui-radio',
        isFlat,
        className,
        style,
        onChange = () => {
        }
    }: PropsType
) => {
    const classNames = classnames('ui-radio', {
        'ui-radio--flat': isFlat
    });
    return (
        <div className={classNames}>
            <div className="ui-radio__inner">
                {items.map(item => {
                    return (
                        <div onClick={() => {
                            onChange({
                                name,
                                value: item.id
                            });
                        }} key={item.id} className='ui-radio-item'>
                            <input
                                className='ui-radio-item__control'
                                name={name}
                                type="radio"
                                checked={item.id === value}
                                onChange={() => {}}
                            />
                            <div className="ui-radio-item__icon">
                                <span/>
                            </div>
                            <div className="ui-radio-item__label">
                                {item.name}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
});
