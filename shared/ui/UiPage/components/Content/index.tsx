'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string,
}

export const Content = observer(({ children, className }: PropsType) => {
    return (
        <div className={classnames('ui-page-content', className)}>
            {children}
        </div>
    )
});
