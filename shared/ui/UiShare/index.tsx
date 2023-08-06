'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string
}

export const UiShare = observer(({ children, className }: PropsType) => {
    const classNames = classnames('ui-share', className);
    return (
        <div className={classNames}>
            {children}
        </div>
    )
})
