'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { Control } from "./components/Control";

import './index.scss';

type PropsType = {
    className?: string,
    style?: React.CSSProperties,
    onSubmit?: () => void,
    onReset?: () => void,
    children?: React.ReactNode
}

const Form = observer((
    {
        className = '',
        onSubmit,
        onReset,
        children
    }: PropsType
) => {
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit && onSubmit();
    };

    const handleReset = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onReset && onReset();
    };

    const classNames = classnames('ui-form', className);
    return (
        <form className={classNames} onSubmit={handleSubmit} onReset={handleReset}>
            {children}
        </form>
    )
})

export const UiForm = Object.assign(Form, {
    Control,
})
