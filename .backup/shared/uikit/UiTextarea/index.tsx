import React from "react";
import { observer } from "mobx-react";

import { UiControlPropsType } from "shared/types";

import './index.scss';

type PropsType = UiControlPropsType<string, {
    type?: 'text' | 'password' | 'email',
    placeholder?: string,
    mask?: string,
    rows: number,
}>;

export const UiTextarea = observer((
    {
        name = 'ui-textarea',
        value,
        onChange,
        placeholder,
        rows = 3
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
                rows={rows}
                className='ui-textarea__control'
                value={value || ''}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={' '}
            />
            {placeholder && (
                <div className="ui-textarea__placeholder">{placeholder}</div>
            )}
        </div>
    )
})

