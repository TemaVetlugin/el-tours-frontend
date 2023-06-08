'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string
}

export const Wrap = observer(({ children, className }: PropsType) => {
    const classNames = classnames('ui-page-wrap', className);
    return (
        <div className={classNames}>
            {children}
        </div>
    )
})
