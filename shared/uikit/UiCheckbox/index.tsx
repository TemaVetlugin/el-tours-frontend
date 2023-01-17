import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { UiControlPropsType } from "shared/types";
import { COLORS } from "shared/contants";

import { UiIcon } from "../UiIcon";

import './index.scss';

type PropsType = UiControlPropsType<number, {
    label?: string | React.ReactNode,
    isRequired?: boolean,
}>

export const UiCheckbox = observer(({ label, name = 'ui-checkbox', className, onChange, value, isRequired = false }: PropsType) => {
    const classNames = classnames('ui-checkbox');
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
                <UiIcon name='check14' size={14} color={COLORS.WHITE}/>
            </div>
            {label && <span className="ui-checkbox__label">{label}</span>}
        </label>
    )
})
