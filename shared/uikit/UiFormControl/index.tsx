import React from "react";
import { observer } from "mobx-react";

import './index.scss';
import classnames from "classnames";

type PropsType = {
    label?: string,
    style?: React.CSSProperties,
    isRequired?: boolean,
    errorMessage?: string,
    hint?: string,
    children?: React.ReactNode
}

export const UiFormControl = observer((
    {
        label,
        style,
        isRequired = false,
        errorMessage,
        hint,
        children,
    }: PropsType
) => {
    const hasError = !!errorMessage;
    const hasHint = !!hint && !errorMessage;
    const classNames = classnames('ui-form-control', {
        'ui-form-control--error': hasError
    })

    return (
        <div className={classNames} style={style}>
            {label && (
                <div className="ui-form-control__label">
                    {label}
                    {isRequired && (
                        <span>*</span>
                    )}
                </div>
            )}
            {children && <div className="ui-form-control__inner">{children}</div>}
            {hasError && <div className="ui-form-control__error">{errorMessage}</div>}
            {hasHint && <div className="ui-form-control__hint">{hint}</div>}
        </div>
    )
})

