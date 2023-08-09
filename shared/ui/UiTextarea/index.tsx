'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { UiControlPropsType } from "../types";

import './index.scss';

type PropsType = UiControlPropsType<string, {
    placeholder?: string | React.ReactNode,
}>;

export const UiTextarea = observer((
    {
        name = 'ui-textarea',
        value,
        onChange,
        placeholder,
    }: PropsType
) => {
    const handleChange = (value: string | undefined | null) => {
        onChange && onChange({
            name,
            value: value || ''
        });
    };

    return (
        <div className="ui-textarea">
            <textarea
                className={'ui-textarea__control'}
                value={value || ''}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={' '}
            />
            {(placeholder && !value) && (
                <div className="ui-textarea__placeholder">
                    {placeholder}
                </div>
            )}
        </div>
    )
})

