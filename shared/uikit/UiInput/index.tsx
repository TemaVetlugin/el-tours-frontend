import React, { useState } from "react";
import { observer } from "mobx-react";
import { IMaskInput } from 'react-imask';

import { UiControlPropsType } from "shared/types";
import { isMobilePhone } from "shared/validations";
import { MASKS } from "shared/contants";

import './index.scss';

type PropsType = UiControlPropsType<string, {
    type?: 'text' | 'password' | 'email',
    placeholder?: string,
    mask?: string,
    autoFocus?: boolean
}>;

export const UiInput = observer((
    {
        autoFocus = false,
        name = 'ui-input',
        type = 'text',
        value,
        mask,
        onChange,
        placeholder,
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
                onFocus: () => setIsFocused(true),
                onBlur: () => {
                    setIsFocused(false);
                    if(mask === MASKS.MOBILE_PHONE && isMobilePhone()(value) !== true){
                        handleChange('');
                    }
                }
            };

            return (
                <IMaskInput
                    onAccept={(value) => {
                        handleChange((value as string) || '')
                    }}
                    value={value}
                    {...options}
                />
            )
        }

        return (
            <input
                type={type}
                value={value || ''}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={' '}
                autoFocus={autoFocus}
            />
        );
    };

    return (
        <div className="ui-input">
            {input()}
            {placeholder && (
                <div className="ui-input__placeholder">{placeholder}</div>
            )}
        </div>
    )
})

