'use client';

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { IMaskInput } from 'react-imask';

import { isMobilePhone } from "shared/validations";
import { MASKS } from "shared/contants";

import { UiControlPropsType } from "../types";

import './index.scss';

type PropsType = UiControlPropsType<string, {
    type?: 'text' | 'password' | 'email',
    placeholder?: string | React.ReactNode,
    mask?: string,
    className?: string,
    onFocus?: () => void,
    onBlur?: () => void,
    autoFocus?: boolean
}>;

export const UiInput = observer((
    {
        autoFocus = false,
        name = 'ui-input',
        type = 'text',
        value,
        mask,
        className,
        onChange,
        placeholder,
        onBlur = () => {},
        onFocus = () => {}
    }: PropsType
) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleChange = (value: string | undefined | null) => {
        onChange && onChange({
            name,
            value: value || ''
        });
    };

    const input = () => {
        if (mask) {
            const options = {
                mask,
                autoFocus,
                placeholder: ' ',
                lazy: !isFocused,
                placeholderChar: '_',
                onFocus: () => {
                    setIsFocused(true)
                    onFocus();
                },
                onBlur: () => {
                    setIsFocused(false);
                    if(mask === MASKS.MOBILE_PHONE && isMobilePhone()(value) !== true){
                        handleChange('');
                    }
                    onBlur();
                }
            };

            return (
                <IMaskInput
                    className={`ui-input__control `}
                    onAccept={(value) => {
                        handleChange((value as string) || '')
                    }}
                    value={value}
                    onChange={() => {}}
                    {...options}
                />
            )
        }

        return (
            <input
                className={'ui-input__control'}
                type={type}
                value={value || ''}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={' '}
                autoFocus={autoFocus}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        );
    };

    return (
        <div className={`ui-input ${className}`}>
            {input()}
            {placeholder && (
                <div className="ui-input__placeholder">
                    {placeholder}
                </div>
            )}
        </div>
    )
})

