import React, { useCallback } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

export { UiFormFooter } from './components/UiFormFooter';

import './index.scss';

type PropsType = {
    className?: string,
    style?: React.CSSProperties,
    onSubmit?: () => void,
    onReset?: () => void,
    children?: React.ReactNode
}

export const UiForm = observer((
    {
        className = '',
        onSubmit,
        onReset,
        children
    }: PropsType
) => {
    const handleSubmit = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit && onSubmit();
    }, [onSubmit]);

    const handleReset = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        onReset && onReset();
    }, [onSubmit]);

    const classNames = classnames('ui-form', className);
    return (
        <form className={classNames} onSubmit={handleSubmit} onReset={handleReset}>
            {children}
        </form>
    )
})

