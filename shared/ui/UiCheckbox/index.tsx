'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { COLORS } from "shared/contants";

import { UiIcon } from "../UiIcon";
import { UiControlPropsType } from "../types";

import './index.scss';

type PropsType = UiControlPropsType<number, {
    label?: string | React.ReactNode,
    children?: React.ReactNode | React.ReactNode[],
    isRequired?: boolean,
}>

export const UiCheckbox = observer((
    {
        label,
        children,
        name = 'ui-checkbox',
        className,
        onChange,
        value,
        isRequired = false
    }: PropsType
) => {
    const classNames = classnames('ui-checkbox', className);

    const text = label || children;
    return (
        <label className={classNames}>
            <input
                required={isRequired}
                type="checkbox"
                className="ui-checkbox__control"
                checked={!!value}
                onChange={(e) => {
                    onChange && onChange({
                        name,
                        value: +e.target.checked
                    });
                }}
                value='1'
            />
            <div className="ui-checkbox__icon">
                <UiIcon name='check' size={16} color={COLORS.WHITE}/>
            </div>
            {text && <span className="ui-checkbox__label">{text}</span>}
        </label>
    )
})
